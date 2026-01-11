// Новий файл конфігурації EmailJS для версії 4.x
import emailjs from '@emailjs/browser';

// Константи для EmailJS
const EMAILJS_PUBLIC_KEY = '886XgBgir1aeXVhA_';
const EMAILJS_SERVICE_ID = 'service_fzjt5ro';
const EMAILJS_CONTACT_TEMPLATE_ID = 'template_voaqh5j';
const EMAILJS_CALLBACK_TEMPLATE_ID = 'template_voaqh5j';
const EMAILJS_RECEIVER_EMAIL = 'info@advokat-proidak.com';

// Змінна для відслідковування стану ініціалізації
let isInitialized = false;

/**
 * Ініціалізація EmailJS
 */
export const initEmailJS = () => {
  if (isInitialized) {
    console.log('EmailJS вже ініціалізовано');
    return;
  }

  try {
    // Ініціалізація для EmailJS v4.x
    emailjs.init(EMAILJS_PUBLIC_KEY);
    isInitialized = true;
    console.log('EmailJS успішно ініціалізовано');
  } catch (error) {
    console.error('Помилка при ініціалізації EmailJS:', error);
  }
};

/**
 * Відправка контактної форми
 */
export const sendContactForm = async (formData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) => {
  try {
    // Перевірка ініціалізації
    if (!isInitialized) {
      initEmailJS();
    }

    // Додаємо поточну дату
    const currentDate = new Date().toLocaleString('uk-UA');

    // Підготовка параметрів для шаблону
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'Не вказано',
      message: formData.message,
      date: currentDate,
      to_email: EMAILJS_RECEIVER_EMAIL,
      from_name: formData.name,
      reply_to: formData.email
    };

    console.log('Відправка контактної форми з параметрами:', templateParams);

    // Відправка форми
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_CONTACT_TEMPLATE_ID,
      templateParams
    );

    console.log('Успішна відправка форми:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Помилка при відправці форми:', error);
    return { success: false, error };
  }
};

/**
 * Відправка запиту на зворотний дзвінок
 */
export const sendCallbackRequest = async (formData: {
  name: string;
  phone: string;
}) => {
  try {
    // Перевірка ініціалізації
    if (!isInitialized) {
      initEmailJS();
    }

    // Додаємо поточну дату
    const currentDate = new Date().toLocaleString('uk-UA');

    // Створюємо повідомлення для шаблону
    const callbackMessage = `Запит на зворотний дзвінок від ${formData.name}. Телефон: ${formData.phone}`;

    // Підготовка параметрів для шаблону
    const templateParams = {
      name: formData.name,
      phone: formData.phone,
      date: currentDate,
      to_email: EMAILJS_RECEIVER_EMAIL,
      from_name: formData.name,
      message: callbackMessage,
      email: 'callback@advokat-proidak.com', // Фіктивний email для запитів на зворотний дзвінок
      reply_to: EMAILJS_RECEIVER_EMAIL
    };

    console.log('Відправка запиту на зворотний дзвінок з параметрами:', templateParams);

    // Відправка форми
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_CALLBACK_TEMPLATE_ID,
      templateParams
    );

    console.log('Успішна відправка запиту на зворотний дзвінок:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Помилка при відправці запиту на зворотний дзвінок:', error);
    return { success: false, error };
  }
};

// Експортуємо константи для використання в компонентах
export {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_CONTACT_TEMPLATE_ID,
  EMAILJS_CALLBACK_TEMPLATE_ID,
  EMAILJS_RECEIVER_EMAIL
};
