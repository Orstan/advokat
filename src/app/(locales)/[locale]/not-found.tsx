"use client";

import Link from 'next/link';
import Layout from '@/components/Layout';

export default function NotFound() {
  // Використовуємо статичні значення для локалізації
  // Це допоможе уникнути помилок з параметрами
  const locale = typeof window !== 'undefined' ? 
    window.location.pathname.startsWith('/en') ? 'en' : 'uk' : 'uk';
  
  return (
    <Layout locale={locale}>
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl font-bold mb-4 text-gray-100">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">
          {locale === 'uk' ? 'Сторінку не знайдено' : 'Page not found'}
        </h2>
        
        <p className="text-lg mb-8 text-gray-300">
          {locale === 'uk' ? 'Сторінка, яку ви шукаєте, не існує або була переміщена.' : 'The page you are looking for does not exist or has been moved.'}
        </p>
        
        <div>
          <Link href={`/${locale}`}>
            <span className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors">
              {locale === 'uk' ? 'Повернутися на головну' : 'Back to Home'}
            </span>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
