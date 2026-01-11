import { getRequestConfig } from 'next-intl/server';
 
export default getRequestConfig(async ({ locale }) => {
  // Перевірка на undefined і використання значення за замовчуванням
  const safeLocale = locale || 'uk';
  
  try {
    return {
      locale: safeLocale,
      messages: (await import(`./messages/${safeLocale}/index.json`)).default,
      timeZone: 'Europe/Kiev'
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${safeLocale}`, error);
    // Повертаємо український переклад як запасний варіант
    return {
      locale: 'uk',
      messages: (await import('./messages/uk/index.json')).default,
      timeZone: 'Europe/Kiev'
    };
  }
});
