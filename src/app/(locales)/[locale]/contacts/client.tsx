"use client";

import { useTranslations, useLocale } from 'next-intl';
import Layout from '@/components/Layout';
import ContactForm from '@/components/ContactForm';

export default function ContactsPageClient() {
  const locale = useLocale();
  const t = useTranslations('contacts');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Адвокатське бюро Пройдака Сергія Миколайовича',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'проспект Науки, 27-А, офіс 29',
      addressLocality: 'Харків',
      postalCode: '61000',
      addressCountry: 'UA',
    },
    telephone: ['+380960708624', '+380993816652'],
    email: 'info@advokat-proidak.com',
    url: 'https://advokat-proidak.com',
    image: 'https://advokat-proidak.com/logo.png',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '15:00',
      },
    ],
  };

  return (
    <Layout locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-gray-900 min-h-screen pt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{t('title')}</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {t('title')}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{t('address')}</h3>
                    <p className="text-gray-300 text-lg">{t('addressValue')}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{t('phone')}</h3>
                    <p className="text-gray-300 text-lg">
                      <a href="tel:+380960708624" className="hover:text-blue-500">+380960708624</a>
                    </p>
                    <p className="text-gray-300 text-lg">
                      <a href="tel:+380993816652" className="hover:text-blue-500">+380993816652</a>
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{t('email')}</h3>
                    <p className="text-gray-300 text-lg">
                      <a href="mailto:info@advokat.com" className="hover:text-blue-500">{t('emailValue')}</a>
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {t('workingHours')}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-300 flex justify-between">
                      <span>{t('weekdays')}</span>
                      <span>9:00 - 18:00</span>
                    </p>
                    <p className="text-gray-300 flex justify-between">
                      <span>{t('saturday')}</span>
                      <span>10:00 - 15:00</span>
                    </p>
                    <p className="text-gray-300 flex justify-between">
                      <span>{t('sunday')}</span>
                      <span>{t('closed')}</span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {t('findUs')}
                </h2>
                <div className="bg-gray-700 p-0 rounded-lg overflow-hidden">
                  {/* Google Maps iframe */}
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2563.7025992507!2d36.23242687677729!3d50.02292791942392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a0f8c0c9a1a1%3A0x7bc3dddd13c12c0f!2z0LLRg9C70LjRhtGPIDIzINCh0LXRgNC_0L3RjywgMjnQkCwg0KXQsNGA0LrRltCyLCDQpdCw0YDQutGW0LLRgdGM0LrQsCDQvtCx0LvQsNGB0YLRjCwgNjEwMDA!5e0!3m2!1suk!2sua!4v1723151768133!5m2!1suk!2sua" 
                    width="100%" 
                    height="300" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Офіс адвоката Пройдака Сергія Миколайовича"
                  ></iframe>
                </div>
                <div className="mt-4 text-gray-300">
                  <p>
                    {t('officeLocation')}
                  </p>
                </div>
              </div>
            </div>
            
            <div id="contact-form">
              <ContactForm locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
