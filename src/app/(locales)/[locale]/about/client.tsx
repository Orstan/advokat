"use client";

import { useTranslations, useLocale } from 'next-intl';
import Layout from '@/components/Layout';
import Image from 'next/image';

export default function AboutPageClient() {
  const locale = useLocale();
  const t = useTranslations('about');

  return (
    <Layout locale={locale}>
      <div className="bg-gray-900 min-h-screen pt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{t('title')}</h1>
          </div>
          
          <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gray-700 relative">
                <Image 
                  src="/advokat.jpg" 
                  alt="Адвокат Пройдак Сергій Миколайович" 
                  width={500}
                  height={600}
                  priority
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  style={{ objectPosition: 'center top' }}
                />
              </div>
              <div className="md:w-2/3 p-8">
                <h2 className="text-3xl font-bold text-white mb-4">{t('subtitle')}</h2>
                <div className="text-gray-300 text-lg leading-relaxed space-y-4 mb-6">
                  <p>{t('description')}</p>
                  <p>{t('descriptionPart2')}</p>
                  <p>{t('descriptionPart3')}</p>
                </div>
                
                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {t('education')}
                  </h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>
                      • {t('educationText')}
                    </li>
                    <li>
                      • {t('qualificationText')}
                    </li>
                  </ul>
                </div>
                
                <div className="border-t border-gray-700 pt-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <span className="text-blue-400 text-2xl mr-2">💼</span>
                        <h4 className="text-lg font-semibold text-white">{t('criminalLaw')}</h4>
                      </div>
                      <p className="text-gray-300">{t('criminalLawText')}</p>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <span className="text-blue-400 text-2xl mr-2">⚖️</span>
                        <h4 className="text-lg font-semibold text-white">{t('civilLaw')}</h4>
                      </div>
                      <p className="text-gray-300">{t('civilLawText')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md transform transition-transform hover:scale-105">
              <div className="flex items-center mb-4">
                <span className="text-blue-400 text-2xl mr-3">🚀</span>
                <h3 className="text-xl font-semibold text-white">
                  {t('professionalism')}
                </h3>
              </div>
              <p className="text-gray-300">
                {t('professionalismText')}
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md transform transition-transform hover:scale-105">
              <div className="flex items-center mb-4">
                <span className="text-blue-400 text-2xl mr-3">🔒</span>
                <h3 className="text-xl font-semibold text-white">
                  {t('confidentiality')}
                </h3>
              </div>
              <p className="text-gray-300">
                {t('confidentialityText')}
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md transform transition-transform hover:scale-105">
              <div className="flex items-center mb-4">
                <span className="text-blue-400 text-2xl mr-3">💡</span>
                <h3 className="text-xl font-semibold text-white">
                  {t('individualApproach')}
                </h3>
              </div>
              <p className="text-gray-300">
                {t('individualApproachText')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
