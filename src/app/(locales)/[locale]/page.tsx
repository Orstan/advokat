import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Contacts from '@/components/Contacts';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'uk'
      ? 'Адвокат Пройдак Сергій Миколайович | Професійні юридичні послуги'
      : 'Attorney Serhii Proidak | Professional Legal Services',
    description: locale === 'uk'
      ? 'Надійний юридичний захист та консультації від досвідченого адвоката. Спеціалізація: кримінальне, цивільне, корпоративне, військове та адміністративне право.'
      : 'Reliable legal protection and consultations from an experienced attorney. Specialization: criminal, civil, corporate, military and administrative law.',
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <Layout locale={locale}>
      <Hero locale={locale} />
      <About />
      <Services />
      <Testimonials />
      <FAQ />
      <Contacts />
    </Layout>
  );
}
