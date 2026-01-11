"use client";

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';

export default function About() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{t('title')}</h2>
        </div>
        <div className="relative flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Ліва частина з фоновим зображенням */}
          <div className="w-full md:w-2/5 relative">
            <div className="relative w-full h-[400px] overflow-hidden rounded-2xl">
              <Image 
                src="/advokat.jpg" 
                alt="Адвокат Пройдак Сергій Миколайович" 
                fill 
                style={{ objectFit: 'cover', objectPosition: 'center' }} 
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="z-0"
              />
            </div>
          </div>
          
          {/* Права частина з текстом */}
          <div className="w-full md:w-3/5 mt-8 md:mt-0 z-10">
            <h3 className="text-2xl font-bold text-white mb-4">{t('subtitle')}</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {t('description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-2">
                  {useTranslations('services')('criminal')}
                </h4>
                <p className="text-gray-300">
                  {locale === 'uk' 
                    ? 'Захист у кримінальних справах на всіх стадіях процесу' 
                    : 'Defense in criminal cases at all stages of the process'}
                </p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-2">
                  {useTranslations('services')('civil')}
                </h4>
                <p className="text-gray-300">
                  {locale === 'uk' 
                    ? 'Представництво інтересів у цивільних спорах' 
                    : 'Representation of interests in civil disputes'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
