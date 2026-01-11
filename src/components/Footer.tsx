"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer');
  const contactsT = useTranslations('contacts');

  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image 
                src="/logo.png" 
                alt="Логотип адвоката" 
                width={50} 
                height={50} 
                className="rounded-full"
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-white">
                  {t('lawOffice')}
                </h3>
                <p className="text-sm text-gray-300">
                  {t('ofSerhiiProidak')}
                </p>
              </div>
            </div>
            <p className="text-gray-400 mt-2">
              {useTranslations('hero')('subtitle')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{contactsT('title')}</h3>
            <p className="text-gray-400 mb-2">
              <span className="block text-gray-300">{contactsT('address')}:</span>
              {contactsT('addressValue')}
            </p>
            <p className="text-gray-400 mb-2">
              <span className="block text-gray-300">{contactsT('phone')}:</span>
              <a href="tel:+380960708624" className="hover:text-white">+380960708624</a><br />
              <a href="tel:+380993816652" className="hover:text-white">+380993816652</a>
            </p>
            <p className="text-gray-400">
              <span className="block text-gray-300">{contactsT('email')}:</span>
              <a href="mailto:info@advokat-proidak.com" className="hover:text-white">{contactsT('emailValue')}</a>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}`} className="text-gray-400 hover:text-white">
                  {useTranslations('navigation')('home')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-gray-400 hover:text-white">
                  {useTranslations('navigation')('about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="text-gray-400 hover:text-white">
                  {useTranslations('navigation')('services')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contacts`} className="text-gray-400 hover:text-white">
                  {useTranslations('navigation')('contacts')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy-policy`} className="text-gray-400 hover:text-white">
                  {t('privacyPolicy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <div className="flex flex-col md:flex-row md:justify-center md:items-center md:gap-4">
            <p className="text-gray-400">{t('rights')}</p>
            <p className="text-gray-400 mt-2 md:mt-0">
              <a href="https://webvy.online/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">{t('studio')}</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
