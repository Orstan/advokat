"use client";

import { useTranslations, useLocale } from 'next-intl';
import Layout from '@/components/Layout';

export default function PrivacyPolicy() {
  const t = useTranslations('PrivacyPolicy');
  const locale = useLocale();

  return (
    <Layout locale={locale}>
      <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-100">
        {t('title')}
      </h1>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-200">
          {t('section1.title')}
        </h2>
        <p className="mb-6 text-gray-300">
          {t('section1.content')}
        </p>
        
        <h2 className="text-xl font-semibold mb-3 mt-6 text-gray-200">
          {t('section2.title')}
        </h2>
        <p className="mb-6 text-gray-300">
          {t('section2.content')}
        </p>
        
        <h2 className="text-xl font-semibold mb-3 mt-6 text-gray-200">
          {t('section3.title')}
        </h2>
        <p className="mb-6 text-gray-300">
          {t('section3.content')}
        </p>
        
        <h2 className="text-xl font-semibold mb-3 mt-6 text-gray-200">
          {t('section4.title')}
        </h2>
        <p className="mb-6 text-gray-300">
          {t('section4.content')}
        </p>
        
        <h2 className="text-xl font-semibold mb-3 mt-6 text-gray-200">
          {t('section5.title')}
        </h2>
        <p className="mb-6 text-gray-300">
          {t('section5.content')}
        </p>
        
        <p className="mt-8 text-sm italic text-gray-400">
          {t('lastUpdated')} {t('date')}
        </p>
      </div>
    </div>
    </Layout>
  );
}
