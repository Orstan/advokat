"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { initEmailJS, sendContactForm } from '../utils/emailjs-service';

interface ContactFormProps {
  locale: string;
}

export default function ContactForm({ locale }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const t = useTranslations('contacts');
  
  // Ініціалізація EmailJS при завантаженні компонента
  useEffect(() => {
    initEmailJS();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);
    setFormError(null);
    
    try {
      // Валідація форми
      if (!name || !email || !message) {
        setFormError(locale === 'uk' 
          ? 'Будь ласка, заповніть всі обов\'язкові поля' 
          : 'Please fill in all required fields');
        setIsLoading(false);
        return;
      }
      
      // Перевірка формату email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setFormError(locale === 'uk' 
          ? 'Будь ласка, введіть коректну електронну адресу' 
          : 'Please enter a valid email address');
        setIsLoading(false);
        return;
      }
      
      console.log('Відправка форми з даними:', { name, email, phone, message });
      
      // Відправка форми
      const result = await sendContactForm({
        name,
        email,
        phone,
        message
      });
      
      if (result.success) {
        console.log('Форма успішно відправлена');
        
        // Очищення форми
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        
        // Показуємо повідомлення про успішну відправку
        setFormSubmitted(true);
        
        // Повернення до початкового стану через 5 секунд
        setTimeout(() => {
          setFormSubmitted(false);
        }, 5000);
      } else {
        console.error('Помилка відправки форми:', result.error);
        setFormError(locale === 'uk' 
          ? 'Помилка при відправці форми. Спробуйте пізніше.' 
          : 'Error sending form. Please try again later.');
      }
    } catch (error) {
      console.error('Помилка відправки форми:', error);
      setFormError(locale === 'uk' 
        ? 'Помилка при відправці форми. Спробуйте пізніше.' 
        : 'Error sending form. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">
        {t('contactFormTitle')}
      </h2>
      
      {formSubmitted ? (
        <div className="bg-green-700 text-white p-4 rounded-lg mb-4 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p>{t('formSubmittedMessage')}</p>
        </div>
      ) : (
        <>
          {formError && (
            <div className="bg-red-700 text-white p-4 rounded-lg mb-4">
              {formError}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                {t('nameLabel')} *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('namePlaceholder')}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                {t('emailLabel')} *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('emailPlaceholder')}
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                {t('phoneLabel')}
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('phonePlaceholder')}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                {t('messageLabel')} *
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('messagePlaceholder')}
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-white font-medium py-2 px-4 rounded-md transition-colors ${
                isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('loading')}
                </div>
              ) : (
                t('submitButton')
              )}
            </button>
            
            <p className="text-sm text-gray-400 mt-2">
              * {t('requiredFieldsNote')}
            </p>
          </form>
        </>
      )}
    </div>
  );
}
