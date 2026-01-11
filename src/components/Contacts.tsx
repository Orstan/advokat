"use client";

import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import { initEmailJS, sendContactForm, EMAILJS_CONTACT_TEMPLATE_ID } from '../utils/emailjs-config';

export default function Contacts() {
  const t = useTranslations('contacts');
  const locale = useLocale();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Ініціалізація EmailJS при завантаженні компонента
  useEffect(() => {
    initEmailJS();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Зупиняємо стандартну поведінку форми
    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);
    setFormError(null);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;
    
    console.log('Спроба відправки форми зі сторінки контактів:', { name, email, phone, message });
    
    try {
      // Перевірка чи введені обов'язкові поля
      if (!name || !email || !message) {
        setFormError(locale === 'uk' ? 'Будь ласка, заповніть всі обов\'язкові поля' : 'Please fill in all required fields');
        setIsLoading(false);
        return;
      }
      
      // Перевірка формату email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setFormError(locale === 'uk' ? 'Будь ласка, введіть коректну електронну адресу' : 'Please enter a valid email address');
        setIsLoading(false);
        return;
      }
      
      // Перевіряємо чи ініціалізовано EmailJS
      initEmailJS();
      
      // Відправка форми через EmailJS
      const result = await sendContactForm(
        EMAILJS_CONTACT_TEMPLATE_ID, // ID шаблону в EmailJS
        { name, email, phone, message }
      );
      
      console.log('Результат відправки форми:', result);
      
      if (result.success) {
        console.log('Форма успішно відправлена');
        
        // Очищення форми
        (e.target as HTMLFormElement).reset();
        
        // Показуємо повідомлення про успішну відправку
        setFormSubmitted(true);
        
        // Повернення до початкового стану через 5 секунд
        setTimeout(() => {
          setFormSubmitted(false);
        }, 5000);
      } else {
        console.error('Помилка відправки форми:', result.error);
        setFormError(locale === 'uk' ? 'Помилка при відправці форми. Спробуйте пізніше.' : 'Error sending form. Please try again later.');
      }
    } catch (error) {
      console.error('Помилка відправки форми:', error);
      console.error('Деталі помилки:', JSON.stringify(error));
      setFormError(locale === 'uk' ? 'Помилка при відправці форми. Спробуйте пізніше.' : 'Error sending form. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{t('title')}</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">{t('address')}</h3>
              <p className="text-gray-300 mb-6">{t('addressValue')}</p>
              
              <h3 className="text-xl font-bold text-white mb-4">{t('phone')}</h3>
              <p className="text-gray-300 mb-2">
                <a href="tel:+380960708624" className="hover:text-blue-500">+380960708624</a>
              </p>
              <p className="text-gray-300 mb-6">
                <a href="tel:+380993816652" className="hover:text-blue-500">+380993816652</a>
              </p>
              
              <h3 className="text-xl font-bold text-white mb-4">{t('email')}</h3>
              <p className="text-gray-300">
                <a href="mailto:info@advokat-proidak.com" className="hover:text-blue-500">{t('emailValue')}</a>
              </p>
            </div>
            
            <div className="mt-8">
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">
                  {locale === 'uk' ? 'Графік роботи' : 'Working Hours'}
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-300 flex justify-between">
                    <span>{locale === 'uk' ? 'Понеділок - П\'ятниця' : 'Monday - Friday'}</span>
                    <span>9:00 - 18:00</span>
                  </p>
                  <p className="text-gray-300 flex justify-between">
                    <span>{locale === 'uk' ? 'Субота' : 'Saturday'}</span>
                    <span>10:00 - 15:00</span>
                  </p>
                  <p className="text-gray-300 flex justify-between">
                    <span>{locale === 'uk' ? 'Неділя' : 'Sunday'}</span>
                    <span>{locale === 'uk' ? 'Вихідний' : 'Closed'}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">
              {locale === 'uk' ? 'Зв\'яжіться з нами' : 'Contact Us'}
            </h3>
            {formError && (
              <div className="bg-red-800 text-white p-4 rounded-lg mb-4">
                {formError}
              </div>
            )}
            
            {formSubmitted ? (
              <div className="bg-green-800 text-white p-6 rounded-lg text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="text-xl font-bold text-white mb-2">
                  {locale === 'uk' ? 'Дякуємо!' : 'Thank you!'}
                </h3>
                <p className="text-lg">
                  {locale === 'uk' 
                    ? 'Ваше повідомлення успішно відправлено. Ми зв\'яжемося з вами найближчим часом.' 
                    : 'Your message has been successfully sent. We will contact you soon.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" method="post">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    {locale === 'uk' ? 'Ім\'я' : 'Name'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    {locale === 'uk' ? 'Електронна пошта' : 'Email'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                    {locale === 'uk' ? 'Телефон' : 'Phone'}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                    {locale === 'uk' ? 'Повідомлення' : 'Message'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {locale === 'uk' ? 'Відправка...' : 'Sending...'}
                      </>
                    ) : (
                      locale === 'uk' ? 'Відправити' : 'Send'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
