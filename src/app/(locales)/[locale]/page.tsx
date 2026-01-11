import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Contacts from '@/components/Contacts';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    uk: 'Адвокат Харків - Пройдак Сергій | Кримінальний, Цивільний, Адміністративний захист',
    en: 'Lawyer Kharkiv - Serhii Proidak | Criminal, Civil, Administrative Defense'
  };
  
  const descriptions = {
    uk: 'Досвідчений адвокат у Харкові ⚖️ Кримінальне право, Цивільне право, Адміністративний захист, Військове право. Захист у суді всіх інстанцій. Безкоштовна консультація ☎️ Працюємо 24/7',
    en: 'Experienced lawyer in Kharkiv ⚖️ Criminal law, Civil law, Administrative defense, Military law. Court defense at all levels. Free consultation ☎️ Available 24/7'
  };

  const keywords = {
    uk: 'адвокат Харків, адвокат у Харкові, кримінальний адвокат, цивільний адвокат, захист у суді, юрист Харків, правова допомога, адвокат з кримінальних справ, адвокат з цивільних справ, адвокат Пройдак, військовий адвокат, адміністративний захист, юридична консультація Харків',
    en: 'lawyer Kharkiv, attorney Kharkiv, criminal lawyer, civil lawyer, court defense, legal assistance Ukraine, criminal defense attorney, civil attorney, lawyer Proidak, military lawyer, administrative defense, legal consultation Kharkiv'
  };
  
  return {
    title: titles[locale as 'uk' | 'en'],
    description: descriptions[locale as 'uk' | 'en'],
    keywords: keywords[locale as 'uk' | 'en'],
    authors: [{ name: locale === 'uk' ? 'Пройдак Сергій Миколайович' : 'Serhii Proidak' }],
    openGraph: {
      type: 'website',
      locale: locale === 'uk' ? 'uk_UA' : 'en_US',
      url: `https://advokat-proidak.com/${locale}`,
      siteName: locale === 'uk' ? 'Адвокат Пройдак' : 'Lawyer Proidak',
      title: titles[locale as 'uk' | 'en'],
      description: descriptions[locale as 'uk' | 'en'],
      images: [
        {
          url: 'https://advokat-proidak.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: locale === 'uk' ? 'Адвокат Пройдак Сергій' : 'Lawyer Serhii Proidak',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as 'uk' | 'en'],
      description: descriptions[locale as 'uk' | 'en'],
      images: ['https://advokat-proidak.com/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://advokat-proidak.com/${locale}`,
      languages: {
        'uk': 'https://advokat-proidak.com/uk',
        'en': 'https://advokat-proidak.com/en',
      },
    },
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
