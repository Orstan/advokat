"use client";

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Layout from '@/components/Layout';
import { servicesData } from '@/data/services';
import Link from 'next/link';

export default function ServicesPageClient() {
  const locale = useLocale();
  const t = useTranslations('services');
  const services = servicesData[locale] || [];

  const icons: { [key: string]: React.ReactNode } = {
    criminal: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    civil: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    corporate: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    military: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    administrative: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
      </svg>
    ),
    consultation: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    )
  };

  return (
    <Layout locale={locale}>
      <div className="bg-gray-900 min-h-screen pt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{t('title')}</h1>
            <p className="mt-4 text-xl text-gray-300">
              {locale === 'uk' 
                ? 'Адвокатське бюро "Пройдака Сергія Миколайовича" надає широкий спектр юридичних послуг'
                : 'Law Office of Serhii Proidak provides a wide range of legal services'}
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link href={`/${locale}/services/${service.id}`} key={service.id} className="block bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-700 hover:border-blue-700 transition-colors duration-300">
                <div className="text-blue-700 mb-6 flex justify-center">{icons[service.id]}</div>
                <h2 className="text-2xl font-bold text-white text-center mb-4">{service.title}</h2>
                <p className="text-gray-300 text-center">{service.description}</p>
              </Link>
            ))}
          </div>
          
          <div className="mt-16 bg-gray-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              {locale === 'uk' ? 'Чому обирають нас' : 'Why Choose Us'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {locale === 'uk' ? 'Досвід' : 'Experience'}
                </h3>
                <p className="text-gray-300">
                  {locale === 'uk' 
                    ? 'Багаторічний досвід успішного вирішення складних юридичних справ різних категорій.'
                    : 'Many years of experience in successfully resolving complex legal cases of various categories.'}
                </p>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {locale === 'uk' ? 'Результативність' : 'Effectiveness'}
                </h3>
                <p className="text-gray-300">
                  {locale === 'uk' 
                    ? 'Високий відсоток успішно вирішених справ та задоволених клієнтів.'
                    : 'High percentage of successfully resolved cases and satisfied clients.'}
                </p>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {locale === 'uk' ? 'Доступність' : 'Accessibility'}
                </h3>
                <p className="text-gray-300">
                  {locale === 'uk' 
                    ? 'Прозора цінова політика та індивідуальний підхід до кожного клієнта.'
                    : 'Transparent pricing policy and individual approach to each client.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
