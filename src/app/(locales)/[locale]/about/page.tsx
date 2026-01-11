import AboutPageClient from './client';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'uk' 
      ? 'Про адвоката | Пройдак Сергій Миколайович'
      : 'About the Attorney | Serhii Proidak',
    description: locale === 'uk'
      ? 'Дізнайтеся більше про досвід та принципи роботи адвоката Пройдака Сергія Миколайовича. Професійний захист ваших прав та інтересів.'
      : 'Learn more about the experience and work principles of attorney Serhii Proidak. Professional protection of your rights and interests.',
  };
}

export default function AboutPage() {
  return <AboutPageClient />;
}
