import { NextIntlClientProvider } from 'next-intl';
import '@/app/globals.css';
import { notFound } from 'next/navigation';
import React from 'react';
import StructuredData from '@/components/StructuredData';

export const dynamic = 'force-dynamic';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Отримуємо мову з параметрів
  const { locale } = await params;
  let messages;
  
  // Завантажуємо переклади
  try {
    messages = await import(`../../../messages/${locale}.json`).then(m => m.default);
  } catch (error) {
    console.error(`Failed to load ${locale} messages:`, error);
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <StructuredData locale={locale} />
      {children}
    </NextIntlClientProvider>
  );
}