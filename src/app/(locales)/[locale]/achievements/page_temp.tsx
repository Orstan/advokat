"use client";

import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { signInAnonymously } from "firebase/auth";
import { db, storage, auth } from "@/firebase/config";
import Image from "next/image";
import Layout from '@/components/Layout';

// Тип для досягнень
interface Achievement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: any;
}

export default function Achievements() {
  const locale = useLocale();
  
  // Об'єкт з перекладами для різних мов
  const translations = {
    uk: {
      title: "Досягнення",
      subtitle: "Успішні справи та результати нашої роботи",
      adminTitle: "Адміністрування досягнень",
      addNew: "Додати нове досягнення",
      delete: "Видалити",
      edit: "Редагувати",
      caseTitle: "Назва справи",
      caseDescription: "Опис справи",
      caseImage: "Зображення",
      uploadImage: "Завантажити зображення",
      save: "Зберегти",
      cancel: "Скасувати",
      adminLogin: "Вхід для адміністратора",
      password: "Пароль",
      login: "Увійти",
      logout: "Вийти",
      wrongPassword: "Невірний пароль",
      confirmDelete: "Ви впевнені, що хочете видалити це досягнення?",
      noAchievements: "Поки що немає доданих досягнень",
      tryAgain: "Спробувати знову",
      loading: "Завантаження..."
    },
    en: {
      title: "Achievements",
      subtitle: "Successful cases and results of our work",
      adminTitle: "Achievements Administration",
      addNew: "Add New Achievement",
      delete: "Delete",
      edit: "Edit",
      caseTitle: "Case Title",
      caseDescription: "Case Description",
      caseImage: "Image",
      uploadImage: "Upload Image",
      save: "Save",
      cancel: "Cancel",
      adminLogin: "Admin Login",
      password: "Password",
      login: "Login",
      logout: "Logout",
      wrongPassword: "Wrong password",
      confirmDelete: "Are you sure you want to delete this achievement?",
      noAchievements: "No achievements added yet",
      tryAgain: "Try again",
      loading: "Loading..."
    }
  };
  
  // Функція для отримання перекладів
  const t = (key: string) => translations[locale as 'uk' | 'en'][key as keyof typeof translations['uk']] || key;
  
  // Стан для списку досягнень
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  
  // Стан для адмін-панелі
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminError, setAdminError] = useState('');
  
  // Стан для форми додавання/редагування досягнення
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Стан для помилок та завантаження
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Завантаження досягнень з Firebase
  useEffect(() => {
    const fetchAchievements = async () => {
      setIsLoading(true);
      setFirebaseError(null);
      
      try {
        // Спочатку анонімно автентифікуємося для доступу до Firestore
        try {
          // Спробуємо автентифікуватися, але якщо не вийде - продовжимо без автентифікації
          await signInAnonymously(auth);
          console.log('Anonymous authentication successful');
        } catch (authError: any) {
          console.error('Authentication error:', authError);
          // Продовжуємо без автентифікації, але логуємо помилку
          console.log('Continuing without authentication');
          // Не виходимо з функції, спробуємо отримати дані без автентифікації
        }
        
        try {
          const q = collection(db, "achievements");
          const querySnapshot = await getDocs(q);
          const fetchedAchievements: Achievement[] = [];
          
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            fetchedAchievements.push({
              id: doc.id,
              title: data.title,
              description: data.description,
              imageUrl: data.imageUrl,
              createdAt: data.createdAt
            });
          });
          
          // Сортуємо за датою створення (від найновіших до найстаріших)
          fetchedAchievements.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
          
          setAchievements(fetchedAchievements);
        } catch (firestoreError: any) {
          console.error('Firestore error:', firestoreError);
          if (firestoreError.code === 'permission-denied') {
            setFirebaseError(`Access denied. Please check Firebase security rules. Error: ${firestoreError.message}`);
          } else {
            setFirebaseError(`Error loading achievements: ${firestoreError.code || 'unknown'} - ${firestoreError.message}`);
          }
        }
      } catch (error) {
        console.error("Error in fetchAchievements:", error);
        setFirebaseError('An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAchievements();
  }, []);
  
  // Функція для відкриття модального вікна адміністратора
  const openAdminModal = () => {
    setIsAdminModalOpen(true);
    setAdminError('');
  };
  
  // Функція для закриття модального вікна адміністратора
  const closeAdminModal = () => {
    setIsAdminModalOpen(false);
    setAdminPassword('');
  };
  
  // Функція для входу адміністратора
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'Forosa90@') {
      setIsAdminAuthenticated(true);
      setAdminError('');
      closeAdminModal();
    } else {
      setAdminError(t('wrongPassword'));
    }
  };
  
  // Функція для виходу адміністратора
  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
  };
  
  // Функція для відкриття форми додавання нового досягнення
  const openAddForm = () => {
    setFormMode('add');
    setCurrentAchievement(null);
    setTitle('');
    setDescription('');
    setImageFile(null);
    setImagePreview(null);
    setIsFormOpen(true);
  };
  
  // Функція для відкриття форми редагування досягнення
  const openEditForm = (achievement: Achievement) => {
    setFormMode('edit');
    setCurrentAchievement(achievement);
    setTitle(achievement.title);
    setDescription(achievement.description);
    setImageFile(null);
    setImagePreview(achievement.imageUrl);
    setIsFormOpen(true);
  };
  
  // Функція для закриття форми
  const closeForm = () => {
    setIsFormOpen(false);
  };
  
  // Функція для обробки зміни файлу зображення
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Створюємо попередній перегляд зображення
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Функція для збереження досягнення
  const handleSaveAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || (formMode === 'add' && !imageFile)) {
      alert('Будь ласка, заповніть всі поля та додайте зображення');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let imageUrl = currentAchievement?.imageUrl || '';
      
      // Якщо є новий файл зображення, завантажуємо його
      if (imageFile) {
        const storageRef = ref(storage, `achievements/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
        
        // Якщо редагуємо і є старе зображення, видаляємо його
        if (formMode === 'edit' && currentAchievement?.imageUrl) {
          try {
            const oldImageRef = ref(storage, currentAchievement.imageUrl);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.error("Error deleting old image:", error);
          }
        }
      }
      
      if (formMode === 'add') {
        // Додаємо нове досягнення
        const docRef = await addDoc(collection(db, "achievements"), {
          title,
          description,
          imageUrl,
          createdAt: serverTimestamp()
        });
        
        // Додаємо нове досягнення до локального стану
        const newAchievement: Achievement = {
          id: docRef.id,
          title,
          description,
          imageUrl,
          createdAt: { seconds: Date.now() / 1000 }
        };
        
        setAchievements([newAchievement, ...achievements]);
      } else if (formMode === 'edit' && currentAchievement) {
        // Оновлюємо існуюче досягнення
        const achievementRef = doc(db, "achievements", currentAchievement.id);
        await updateDoc(achievementRef, {
          title,
          description,
          imageUrl,
          updatedAt: serverTimestamp()
        });
        
        // Оновлюємо досягнення в локальному стані
        setAchievements(achievements.map(a => 
          a.id === currentAchievement.id 
            ? { ...a, title, description, imageUrl } 
            : a
        ));
      }
      
      // Закриваємо форму
      closeForm();
    } catch (error) {
      console.error("Error saving achievement:", error);
      alert('Помилка при збереженні досягнення. Спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Функція для видалення досягнення
  const deleteAchievement = async (id: string) => {
    if (window.confirm(t('confirmDelete'))) {
      try {
        // Знаходимо досягнення для видалення
        const achievementToDelete = achievements.find(a => a.id === id);
        
        if (achievementToDelete?.imageUrl) {
          // Видаляємо зображення з Firebase Storage
          try {
            const imageRef = ref(storage, achievementToDelete.imageUrl);
            await deleteObject(imageRef);
          } catch (error) {
            console.error("Error deleting image:", error);
          }
        }
        
        // Видаляємо документ з Firestore
        const achievementRef = doc(db, "achievements", id);
        await deleteDoc(achievementRef);
        
        // Оновлюємо локальний стан
        setAchievements(achievements.filter(a => a.id !== id));
      } catch (error) {
        console.error("Error deleting achievement:", error);
        alert('Помилка при видаленні досягнення. Спробуйте ще раз.');
      }
    }
  };
  
  // Прихована кнопка для відкриття адмін-панелі
  const AdminTrigger = () => (
    <div className="relative inline-block">
      <span className="relative">
        {t('title')}
        <button
          className="absolute inset-0 opacity-0 cursor-pointer"
          onClick={openAdminModal}
          aria-label="Admin login"
        />
      </span>
    </div>
  );
  
  return (
    <Layout locale={locale}>
      <div className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-80px)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <AdminTrigger />
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-4">
              {t('subtitle')}
            </p>
          </div>
        
          {/* Список досягнень */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full text-center text-gray-300 py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mr-2"></div>
                <span>{t('loading')}</span>
              </div>
            ) : firebaseError ? (
              <div className="col-span-full text-center text-red-400 py-12">
                <p className="mb-2">{firebaseError}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  {t('tryAgain')}
                </button>
              </div>
            ) : achievements.length > 0 ? (
              achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
                >
                  {achievement.imageUrl && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={achievement.imageUrl}
                        alt={achievement.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-white mb-2">{achievement.title}</h3>
                    <p className="text-gray-300">{achievement.description}</p>
                    {isAdminAuthenticated && (
                      <div className="flex justify-end space-x-2 mt-4">
                        <button
                          onClick={() => openEditForm(achievement)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                        >
                          {t('edit')}
                        </button>
                        <button
                          onClick={() => deleteAchievement(achievement.id)}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                        >
                          {t('delete')}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-300 py-12">
                {t('noAchievements')}
              </div>
            )}
          </div>
          
          {/* Адмін-панель */}
          {isAdminAuthenticated && (
            <div className="mt-12 bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">{t('adminTitle')}</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={openAddForm}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    {t('addNew')}
                  </button>
                  <button
                    onClick={handleAdminLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    {t('logout')}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Модальне вікно для входу адміністратора */}
          {isAdminModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-bold text-white mb-4">{t('adminLogin')}</h3>
                <form onSubmit={handleAdminLogin}>
                  <div className="mb-4">
                    <label htmlFor="adminPassword" className="block text-gray-300 mb-2">
                      {t('password')}
                    </label>
                    <input
                      type="password"
                      id="adminPassword"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    {adminError && <p className="text-red-400 mt-2">{adminError}</p>}
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={closeAdminModal}
                      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                      {t('cancel')}
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      {t('login')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* Форма для додавання/редагування досягнення */}
          {isFormOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg">
                <h3 className="text-xl font-bold text-white mb-4">
                  {formMode === 'add' ? t('addNew') : t('edit')}
                </h3>
                <form onSubmit={handleSaveAchievement}>
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-300 mb-2">
                      {t('caseTitle')}
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-300 mb-2">
                      {t('caseDescription')}
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-300 mb-2">
                      {t('uploadImage')}
                    </label>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={formMode === 'add'}
                    />
                    {imagePreview && (
                      <div className="mt-2 relative h-40 w-full">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={closeForm}
                      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                      disabled={isSubmitting}
                    >
                      {t('cancel')}
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? '...' : t('save')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
