import { useLocale } from 'next-intl';
import Layout from '@/components/Layout';
import { servicesData } from '@/data/services';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { serviceId: string; locale: string } }) {
  const service = servicesData[params.locale]?.find(s => s.id === params.serviceId);

  if (!service) {
    return {
      title: 'Послуга не знайдена',
    };
  }

  const keywordsMap: { [key: string]: { uk: string; en: string } } = {
    criminal: {
      uk: 'кримінальний адвокат Харків, захист у кримінальній справі, адвокат з кримінальних справ, захист підозрюваного, захист обвинуваченого, адвокат на досудовому розслідуванні',
      en: 'criminal lawyer Kharkiv, criminal defense attorney, criminal case defense, suspect defense, accused defense, pre-trial investigation lawyer'
    },
    civil: {
      uk: 'цивільний адвокат Харків, цивільні спори, позовна заява, адвокат у цивільній справі, захист майнових прав, спадкові спори',
      en: 'civil lawyer Kharkiv, civil disputes, statement of claim, civil case attorney, property rights defense, inheritance disputes'
    },
    corporate: {
      uk: 'господарський адвокат, корпоративний юрист Харків, реєстрація ТОВ, господарські спори, юридичний супровід бізнесу',
      en: 'corporate lawyer, business attorney Kharkiv, LLC registration, commercial disputes, legal business support'
    },
    military: {
      uk: 'військовий адвокат, юрист з військових питань, оскарження ВЛК, бронювання, мобілізація адвокат Харків',
      en: 'military lawyer, military law attorney, military medical commission appeal, reservation, mobilization lawyer Kharkiv'
    },
    administrative: {
      uk: 'адміністративний адвокат, оскарження штрафів, адміністративні правопорушення, захист від поліції, адмінпротокол',
      en: 'administrative lawyer, fine appeal, administrative offenses, police defense, administrative protocol'
    },
    consultation: {
      uk: 'юридична консультація Харків, консультація адвоката, правова допомога, юрист онлайн, безкоштовна консультація юриста',
      en: 'legal consultation Kharkiv, lawyer consultation, legal assistance, online lawyer, free legal consultation'
    }
  };

  const keywords = keywordsMap[params.serviceId]?.[params.locale as 'uk' | 'en'] || '';

  return {
    title: `${service.title} Харків | Адвокат Пройдак Сергій ⚖️`,
    description: service.description.substring(0, 155) + '...',
    keywords: keywords,
    openGraph: {
      type: 'article',
      locale: params.locale === 'uk' ? 'uk_UA' : 'en_US',
      url: `https://advokat-proidak.com/${params.locale}/services/${params.serviceId}`,
      siteName: params.locale === 'uk' ? 'Адвокат Пройдак' : 'Lawyer Proidak',
      title: `${service.title} | Адвокат Харків`,
      description: service.description,
      images: [
        {
          url: 'https://advokat-proidak.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | Адвокат Харків`,
      description: service.description.substring(0, 160),
      images: ['https://advokat-proidak.com/og-image.jpg'],
    },
    alternates: {
      canonical: `https://advokat-proidak.com/${params.locale}/services/${params.serviceId}`,
    },
  };
}

export function generateStaticParams() {
  const params = [];
  for (const locale in servicesData) {
    for (const service of servicesData[locale]) {
      params.push({ locale, serviceId: service.id });
    }
  }
  return params;
}

export default function ServiceDetailPage({ params }: { params: { serviceId: string; locale: string } }) {
  const locale = useLocale();
  const service = servicesData[locale]?.find(s => s.id === params.serviceId);

  if (!service) {
    notFound();
  }

  return (
    <Layout locale={locale}>
      <div className="bg-gray-900 min-h-screen pt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gray-800 rounded-lg p-8 md:p-12 shadow-lg border border-gray-700">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-6">{service.title}</h1>
            <p className="text-gray-300 text-lg text-center mb-10">{service.description}</p>
            
            <div className="border-t border-gray-700 pt-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">{locale === 'uk' ? 'Що входить до послуги:' : 'What the service includes:'}</h2>
              <ul className="space-y-4">
                {service.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="flex-shrink-0 h-6 w-6 text-blue-500 mr-3 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300 text-lg">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center mt-12">
              <Link href={`/${locale}/contacts`} className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg">
                {locale === 'uk' ? 'Зв\'язатися з нами' : 'Contact Us'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
