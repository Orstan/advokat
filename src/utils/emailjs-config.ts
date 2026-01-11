// Утилітарні функції для роботи з EmailJS
import { init, send } from '@emailjs/browser';

// Константи для EmailJS
export const EMAILJS_PUBLIC_KEY = '886XgBgir1aeXVhA_';
export const EMAILJS_SERVICE_ID = 'service_fzjt5ro';
export const EMAILJS_CONTACT_TEMPLATE_ID = 'template_voaqh5j';
export const EMAILJS_CALLBACK_TEMPLATE_ID = 'template_voaqh5j'; // Використовуємо той самий шаблон для зворотного дзвінка
export const EMAILJS_RECEIVER_EMAIL = 'info@advokat-proidak.com';

// Змінна для відслідковування стану ініціалізації
let isInitialized = false;

// Перевірка чи всі константи встановлені
console.log('Константи EmailJS:', {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_CONTACT_TEMPLATE_ID,
  EMAILJS_CALLBACK_TEMPLATE_ID,
  EMAILJS_RECEIVER_EMAIL
});

export const initEmailJS = () => {
  // Якщо вже ініціалізовано, не ініціалізуємо повторно
  if (isInitialized) {
    console.log('EmailJS вже ініціалізовано');
    return;
  }
  
  try {
    // Використовуємо ініціалізацію для EmailJS v4.x
    init(EMAILJS_PUBLIC_KEY);
    
    isInitialized = true;
    console.log('EmailJS успішно ініціалізовано');
    console.log('Публічний ключ:', EMAILJS_PUBLIC_KEY);
    console.log('Service ID:', EMAILJS_SERVICE_ID);
    console.log('Шаблон контактів:', EMAILJS_CONTACT_TEMPLATE_ID);
    console.log('Шаблон зворотного дзвінка:', EMAILJS_CALLBACK_TEMPLATE_ID);
  } catch (error) {
    console.error('Помилка при ініціалізації EmailJS:', error);
    console.error('Деталі помилки:', JSON.stringify(error));
  }
};

// Функція для відправки повідомлення з форми контактів
export const sendContactForm = async (
  templateId: string,
  {
    name,
    email,
    phone,
    message,
  }: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }
) => {
  try {
    console.log('Спроба відправки контактної форми:', { templateId, name, email, phone });
    
    // Додаємо поточну дату до даних форми
    const currentDate = new Date().toLocaleString('uk-UA');
    
    // Підготовка даних для відправки
    const templateParams = {
      name,
      email,
      phone,
      message,
      date: currentDate,
      to_email: EMAILJS_RECEIVER_EMAIL,
      from_name: name,
      reply_to: email
    };
    
    console.log('Параметри шаблону:', templateParams);
    console.log('Service ID:', EMAILJS_SERVICE_ID);
    console.log('Template ID:', templateId);
    
    // Використовуємо API EmailJS v4.x
    const response = await send(
      EMAILJS_SERVICE_ID,
      templateId,
      templateParams
    );
    
    console.log('Успішна відправка форми:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Помилка при відправці форми:', error);
    console.error('Деталі помилки:', JSON.stringify(error));
    return { success: false, error };
  }
};

// Функція для відправки запиту на зворотний дзвінок
export const sendCallbackRequest = async (
  templateId: string,
  {
    name,
    phone,
  }: {
    name: string;
    phone: string;
  }
) => {
  try {
    console.log('Спроба відправки запиту на зворотний дзвінок:', { templateId, name, phone });
    
    // Додаємо поточну дату до даних форми
    const currentDate = new Date().toLocaleString('uk-UA');
    
    // Створюємо повідомлення для шаблону
    const callbackMessage = `Запит на зворотний дзвінок від ${name}. Телефон: ${phone}`;
    
    // Підготовка даних для відправки
    const templateParams = {
      name,
      phone,
      date: currentDate,
      to_email: EMAILJS_RECEIVER_EMAIL,
      from_name: name,
      message: callbackMessage,
      email: 'callback@advokat-proidak.com', // Фіктивний email для запитів на зворотний дзвінок
      reply_to: EMAILJS_RECEIVER_EMAIL // Відповідати на адресу адвоката
    };
    
    console.log('Параметри шаблону для зворотного дзвінка:', templateParams);
    console.log('Service ID:', EMAILJS_SERVICE_ID);
    console.log('Template ID:', templateId);
    
    // Використовуємо API EmailJS v4.x
    const response = await send(
      EMAILJS_SERVICE_ID,
      templateId,
      templateParams
    );
    
    console.log('Успішна відправка запиту на зворотний дзвінок:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Помилка при відправці запиту на зворотний дзвінок:', error);
    console.error('Деталі помилки:', JSON.stringify(error));
    return { success: false, error };
  }
};
