import AchievementsClient from '@/components/AchievementsClient';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return [{ locale: 'uk' }, { locale: 'en' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'uk'
      ? 'Досягнення | Адвокат Пройдак Сергій'
      : 'Achievements | Attorney Serhii Proidak',
    description: locale === 'uk'
      ? 'Успішні справи та досягнення адвоката Пройдака Сергія Миколайовича. Професійний захист та результати роботи.'
      : 'Successful cases and achievements of attorney Serhii Proidak. Professional protection and work results.',
  };
}

// Інтерфейс для досягнень
interface Achievement {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

// Функція для завантаження даних на сервері
async function getAchievements() {
  try {
    // Використовуємо абсолютний URL для fetch на сервері
    const apiUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://advokat-proidak.com';
    const response = await fetch(`${apiUrl}/api/achievements`, {
      cache: 'no-store', // Гарантуємо, що дані завжди свіжі
    });

    if (!response.ok) {
      console.error('Failed to fetch achievements:', response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getAchievements:', error);
    return [];
  }
}

export default async function AchievementsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const initialAchievements: Achievement[] = await getAchievements();

  return <AchievementsClient initialAchievements={initialAchievements} locale={locale} />;
}
