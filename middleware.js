import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Тільки українська мова
  locales: ['uk'],

  // Українська мова за замовчуванням
  defaultLocale: 'uk',
  
  // Не використовувати префікс локалі, оскільки є лише одна мова
  localePrefix: 'never'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
