"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Hero({ locale }: { locale: string }) {
  const t = useTranslations('hero');

  return (
    <div className="relative bg-gray-900 pt-16">
      <div className="absolute inset-0">
        <Image 
          src="/home.webp" 
          alt="Фонове зображення" 
          fill 
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }} 
          className="opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent opacity-90" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col justify-start min-h-[85vh]">
        <div className="text-center md:text-left pt-8">
          <div className="max-w-lg">
            <div className="mb-12">
              <p className="text-white text-2xl">
                {t('protection')}
              </p>
              <p className="text-white text-2xl">
                {t('withProfessionalism')}
              </p>
            </div>
            
            <div className="flex flex-col space-y-4">
              <div className="text-4xl md:text-5xl font-bold text-white uppercase md:whitespace-nowrap">
                {t('legalAssistance')}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white uppercase">
                {t('inCriminal')}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white uppercase">
                {t('civil')}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white uppercase mb-8 md:whitespace-nowrap">
                {t('andAdministrative')}
              </div>
            </div>
          </div>
          <div className="mt-10 max-w-sm mx-auto md:mx-0">
            <div className="inline-block border border-white rounded">
              <Link
                href={`/${locale}/contacts#contact-form`}
                className="px-8 py-3 text-base font-medium text-white hover:bg-white hover:text-gray-900 inline-block transition-colors duration-300"
              >
                {t('requestConsultation')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
