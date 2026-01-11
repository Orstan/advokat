import ServicesPageClient from './client';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'uk'
      ? 'Юридичні послуги | Адвокат Пройдак Сергій'
      : 'Legal Services | Attorney Serhii Proidak',
    description: locale === 'uk'
      ? 'Широкий спектр юридичних послуг: кримінальне, цивільне, корпоративне, військове та адміністративне право. Професійні консультації та захист ваших інтересів.'
      : 'Wide range of legal services: criminal, civil, corporate, military and administrative law. Professional consultations and protection of your interests.',
  };
}

export default function ServicesPage() {
  return <ServicesPageClient />;
}
