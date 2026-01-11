// Цей файл залишено для сумісності. Всі функції перенесено в emailjs-config.ts

// Імпортуємо функції з нового файлу конфігурації
import {
  initEmailJS,
  sendContactForm,
  sendCallbackRequest,
  EMAILJS_SERVICE_ID,
  EMAILJS_CONTACT_TEMPLATE_ID,
  EMAILJS_CALLBACK_TEMPLATE_ID
} from './emailjs-config';

// Експортуємо всі функції та константи для збереження сумісності
export {
  initEmailJS,
  sendContactForm,
  sendCallbackRequest,
  EMAILJS_SERVICE_ID,
  EMAILJS_CONTACT_TEMPLATE_ID,
  EMAILJS_CALLBACK_TEMPLATE_ID
};
