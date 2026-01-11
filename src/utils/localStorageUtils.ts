// Утиліти для роботи з localStorage для зберігання досягнень

// Тип для досягнень
export interface Achievement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: { seconds: number };
}

// Ключ для зберігання досягнень у localStorage
const ACHIEVEMENTS_STORAGE_KEY = 'lawyer_achievements';
const ADMIN_PASSWORD_KEY = 'lawyer_admin_password';

// Функція для отримання всіх досягнень
export const getAchievements = (): Achievement[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    const achievementsJson = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
    return achievementsJson ? JSON.parse(achievementsJson) : [];
  } catch (error) {
    console.error('Error getting achievements from localStorage:', error);
    return [];
  }
};

// Функція для додавання нового досягнення
export const addAchievement = (achievement: Omit<Achievement, 'id' | 'createdAt'>, imageBase64: string): Achievement => {
  const achievements = getAchievements();
  
  const newAchievement: Achievement = {
    id: `achievement_${Date.now()}`,
    title: achievement.title,
    description: achievement.description,
    imageUrl: imageBase64,
    createdAt: { seconds: Date.now() / 1000 }
  };
  
  achievements.unshift(newAchievement); // Додаємо на початок масиву
  
  localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(achievements));
  
  return newAchievement;
};

// Функція для оновлення існуючого досягнення
export const updateAchievement = (id: string, updatedData: Partial<Achievement>, imageBase64?: string): Achievement | null => {
  const achievements = getAchievements();
  const index = achievements.findIndex(a => a.id === id);
  
  if (index === -1) {
    return null;
  }
  
  const updatedAchievement = {
    ...achievements[index],
    ...updatedData,
    ...(imageBase64 ? { imageUrl: imageBase64 } : {})
  };
  
  achievements[index] = updatedAchievement;
  localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(achievements));
  
  return updatedAchievement;
};

// Функція для видалення досягнення
export const deleteAchievement = (id: string): boolean => {
  const achievements = getAchievements();
  const filteredAchievements = achievements.filter(a => a.id !== id);
  
  if (filteredAchievements.length === achievements.length) {
    return false; // Нічого не видалено
  }
  
  localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(filteredAchievements));
  return true;
};

// Функція для перевірки пароля адміністратора
export const checkAdminPassword = (password: string): boolean => {
  return password === 'Forosa90@';
};

// Функція для конвертації файлу зображення в base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};
