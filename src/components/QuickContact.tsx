"use client";

import { useState } from 'react';

export default function QuickContact() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumbers = ['+380960708624', '+380993816652'];

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed left-6 bottom-6 z-50">
      <div className="relative">
        {/* Спливаюча підказка з номерами телефонів */}
        {isOpen && (
          <div className="absolute bottom-16 left-0 bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out">
            <div className="flex flex-col space-y-2">
              {phoneNumbers.map((number, index) => (
                <a 
                  key={index} 
                  href={`tel:${number}`} 
                  className="text-white font-medium flex items-center hover:text-blue-200 transition-colors"
                >
                  {number}
                </a>
              ))}
            </div>
          </div>
        )}
        
        {/* Кнопка з іконкою телефону */}
        <button 
          onClick={toggleOpen}
          className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Зателефонувати"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
