"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation({ locale }: { locale: string }) {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getPathWithLocale = (path: string) => {
    return `/${locale}${path}`;
  };

  const isActive = (path: string) => {
    return pathname === getPathWithLocale(path);
  };

  const navItems = [
    { href: '', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/achievements', label: t('achievements') },
    { href: '/contacts', label: t('contacts') },
  ];

  const switchLocale = (newLocale: string) => {
    // Отримуємо поточний шлях без локалі (видаляємо /uk або /en з початку)
    const pathParts = pathname.split('/').filter(Boolean);
    // Видаляємо першу частину (локаль) якщо вона є
    if (pathParts.length > 0 && (pathParts[0] === 'uk' || pathParts[0] === 'en')) {
      pathParts.shift();
    }
    // Формуємо новий шлях з новою локаллю
    const newPath = pathParts.length > 0 ? `/${pathParts.join('/')}` : '';
    return `/${newLocale}${newPath}`;
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href={getPathWithLocale('')} className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="Логотип адвоката" 
                width={50} 
                height={50} 
                className="rounded-full"
              />
              <div className="flex flex-col items-start">
                <span className="text-2xl font-bold text-white">
                  {t('lawyer')}
                </span>
                <span className="text-sm text-gray-300">
                  {t('lawyerName')}
                </span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={getPathWithLocale(item.href)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(item.href)
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={switchLocale(locale === 'uk' ? 'en' : 'uk')}
                className="ml-20 px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                {locale === 'uk' ? 'EN' : 'UK'}
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <Link
              href={switchLocale(locale === 'uk' ? 'en' : 'uk')}
              className="mr-2 px-3 py-1 border border-gray-600 rounded-md text-xs font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              {locale === 'uk' ? 'EN' : 'UK'}
            </Link>
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">{locale === 'uk' ? 'Відкрити головне меню' : 'Open main menu'}</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={getPathWithLocale(item.href)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
