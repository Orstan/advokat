"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function CookieConsent({ locale }: { locale: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('cookieConsent');

  useEffect(() => {
    // Перевіряємо, чи користувач вже прийняв умови
    const consentAccepted = localStorage.getItem('cookie-consent-accepted');
    if (!consentAccepted) {
      // Показуємо спливаюче вікно через невелику затримку
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptConsent = () => {
    localStorage.setItem('cookie-consent-accepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex-1 mb-4 md:mb-0 md:mr-8">
            <p className="text-gray-300 text-sm">
              {t('message')}
              <Link href={`/${locale}/privacy-policy`} className="text-blue-400 hover:text-blue-300 ml-1">
                {t('privacyPolicy')}
              </Link>
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={acceptConsent}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
            >
              {t('accept')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
