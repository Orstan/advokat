"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Layout from '@/components/Layout';

// Інтерфейс для досягнень
interface Achievement {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

interface AchievementsClientProps {
  initialAchievements: Achievement[];
  locale: string;
}

export default function AchievementsClient({ initialAchievements, locale }: AchievementsClientProps) {
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

  const t = (key: string) => translations[locale as 'uk' | 'en'][key as keyof typeof translations['uk']] || key;

  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewImageUrl, setViewImageUrl] = useState<string | null>(null);
  const [viewImageTitle, setViewImageTitle] = useState<string>('');

  // Функція перезавантаження досягнень з сервера
  const fetchAchievements = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/achievements');
      if (response.ok) {
        const data = await response.json();
        setAchievements(data);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openAdminModal = () => {
    setIsAdminModalOpen(true);
    setAdminError('');
  };

  const closeAdminModal = () => {
    setIsAdminModalOpen(false);
    setAdminPassword('');
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword }),
      });
      if (response.ok) {
        setIsAdminAuthenticated(true);
        setAdminError('');
        closeAdminModal();
      } else {
        setAdminError(t('wrongPassword'));
      }
    } catch (error) {
      setAdminError('Server error');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
  };

  const openAddForm = () => {
    setFormMode('add');
    setCurrentAchievement(null);
    setTitle('');
    setDescription('');
    setImageFile(null);
    setImagePreview(null);
    setIsFormOpen(true);
  };

  const openEditForm = (achievement: Achievement) => {
    setFormMode('edit');
    setCurrentAchievement(achievement);
    setTitle(achievement.title);
    setDescription(achievement.description);
    setImageFile(null);
    setImagePreview(achievement.image_url);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || (formMode === 'add' && !imageFile)) {
      alert('Будь ласка, заповніть всі поля та додайте зображення');
      return;
    }
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    try {
      if (formMode === 'add' && imageFile) {
        formData.append('image', imageFile);
        const response = await fetch('/api/achievements', {
          method: 'POST',
          body: formData,
        });
        const newAchievement = await response.json();
        if (!response.ok) throw new Error(newAchievement.error || 'Failed to add achievement');
        // Перезавантажуємо всі досягнення з сервера
        await fetchAchievements();
      } else if (formMode === 'edit' && currentAchievement) {
        formData.append('id', String(currentAchievement.id));
        formData.append('oldImageUrl', currentAchievement.image_url);
        if (imageFile) {
          formData.append('image', imageFile);
        }
        const response = await fetch('/api/achievements', {
          method: 'PUT',
          body: formData,
        });
        const updatedData = await response.json();
        if (!response.ok) throw new Error(updatedData.error || 'Failed to update achievement');
        
        // Перезавантажуємо всі досягнення з сервера
        await fetchAchievements();
      }
      
      closeForm();
      alert('Досягнення успішно збережено!');
    } catch (error: any) {
      console.error("Error saving achievement:", error);
      setError(error.message || 'Помилка при збереженні досягнення.');
      alert(error.message || 'Помилка при збереженні досягнення.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openImageViewer = (imageUrl: string, title: string) => {
    setViewImageUrl(imageUrl);
    setViewImageTitle(title);
  };

  const closeImageViewer = () => {
    setViewImageUrl(null);
    setViewImageTitle('');
  };

  const handleDeleteAchievement = async (id: number, imageUrl: string) => {
    if (!confirm(t('confirmDelete'))) {
      return;
    }
    
    try {
      const response = await fetch('/api/achievements', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, imageUrl }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to delete achievement');
      }

      // Перезавантажуємо всі досягнення з сервера
      await fetchAchievements();
      alert('Досягнення успішно видалено!');
      
    } catch (error: any) {
      console.error("Error deleting achievement:", error);
      alert(error.message || 'Помилка при видаленні досягнення.');
    }
  };

  return (
    <Layout locale={locale}>
      <div className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-80px)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              {locale === 'uk' ? (
                <>
                  Досяг<span 
                    className="relative cursor-pointer" 
                    onClick={openAdminModal}
                    title=""
                  >н</span>ення
                </>
              ) : (
                <>
                  Achie<span 
                    className="relative cursor-pointer" 
                    onClick={openAdminModal}
                    title=""
                  >v</span>ements
                </>
              )}
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-4">
              {t('subtitle')}
            </p>
          </div>
        
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full text-center text-gray-300 py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mr-2"></div>
                <span>{t('loading')}</span>
              </div>
            ) : error ? (
              <div className="col-span-full text-center text-red-400 py-12">
                <p className="mb-2">{error}</p>
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
                  className="group bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-700 hover:border-amber-500/50"
                >
                  {achievement.image_url && (
                    <div 
                      className="relative w-full h-80 overflow-hidden bg-gray-900 cursor-pointer"
                      onClick={() => openImageViewer(achievement.image_url, achievement.title)}
                      title="Клікніть для перегляду в повному розмірі"
                    >
                      <Image
                        src={achievement.image_url}
                        alt={achievement.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-60"></div>
                      <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
                        🔍 Переглянути
                      </div>
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">{achievement.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{achievement.description}</p>
                    {isAdminAuthenticated && (
                      <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-700">
                        <button
                          onClick={() => openEditForm(achievement)}
                          className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                        >
                          {t('edit')}
                        </button>
                        <button
                          onClick={() => handleDeleteAchievement(achievement.id, achievement.image_url)}
                          className="px-4 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
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
          
          {isFormOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
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
                      <div className="mt-2 relative w-full" style={{ height: '200px' }}>
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          style={{ objectFit: 'contain' }}
                          className="rounded-lg border border-gray-600"
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

          {viewImageUrl && (
            <div 
              className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4"
              onClick={closeImageViewer}
            >
              <button
                onClick={closeImageViewer}
                className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold transition-colors z-10 shadow-lg"
                aria-label="Закрити"
              >
                ×
              </button>
              <div className="absolute top-4 left-4 text-white bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                <h3 className="text-lg font-semibold">{viewImageTitle}</h3>
              </div>
              <div 
                className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={viewImageUrl}
                  alt={viewImageTitle}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="rounded-lg"
                  unoptimized
                />
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                Клікніть поза зображенням або на × для закриття
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
