"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import CallbackForm from './CallbackForm';

export default function CallbackPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPopupClosed, setIsPopupClosed] = useState(false);
  const t = useTranslations('callbackPopup');
  
  // Перевірка, чи вже закривали спливаюче вікно раніше
  useEffect(() => {
    const popupClosed = localStorage.getItem('callbackPopupClosed');
    if (popupClosed) {
      setIsPopupClosed(true);
    } else {
      // Показати спливаюче вікно через 30 секунд
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 30000); // 30 секунд
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Запам'ятовуємо, що користувач закрив вікно
    localStorage.setItem('callbackPopupClosed', 'true');
    setIsPopupClosed(true);
  };

  // Якщо вікно не повинно бути видимим, не рендеримо його
  if (!isVisible || isPopupClosed) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 rounded-lg shadow-xl p-6 max-w-md w-full mx-4 animate-fade-in-up">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <CallbackForm 
          locale="uk" 
          onClose={() => {
            setTimeout(() => {
              setIsVisible(false);
              localStorage.setItem('callbackPopupClosed', 'true');
              setIsPopupClosed(true);
            }, 5000);
          }} 
        />
      </div>
    </div>
  );
}

// Додаємо CSS анімацію
const styles = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out forwards;
}
`;

// Додаємо стилі до документа
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}
