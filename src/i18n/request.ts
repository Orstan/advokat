import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => {
  // Завжди використовуємо українську мову
  locale = 'uk';
  
  // Завантажуємо переклади
  let messages;
  try {
    messages = (await import(`../messages/uk/index.json`)).default;
  } catch (error) {
    console.error('Failed to load Ukrainian messages:', error);
    throw new Error('Failed to load Ukrainian messages');
  }
  
  return {
    locale: 'uk',
    messages
  };
});
