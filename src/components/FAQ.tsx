"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem = ({ question, answer, index }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`mb-4 bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-blue-500/20' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <button
        className="flex justify-between items-center w-full py-5 px-6 text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-100 group-hover:text-blue-400 transition-colors duration-200">
          {question}
        </span>
        <span className={`ml-6 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="p-6 pt-0 prose prose-sm max-w-none text-gray-300 border-t border-gray-700">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default function FAQ() {
  const t = useTranslations('FAQ');
  
  // Отримуємо всі питання та відповіді з перекладів
  const faqItems = Array.from({ length: 5 }, (_, i) => ({
    question: t(`item${i + 1}.question`),
    answer: t(`item${i + 1}.answer`),
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-100 relative inline-block">
            <span className="relative z-10">{t('title')}</span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500 rounded-full"></span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            {t('subtitle') || 'Відповіді на найпоширеніші запитання наших клієнтів'}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <FAQItem 
              key={index} 
              question={item.question} 
              answer={item.answer} 
              index={index} 
            />
          ))}
        </div>
      </div>

      {/* Декоративні елементи */}
      <div className="absolute left-0 top-1/4 w-24 h-24 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
      <div className="absolute right-0 bottom-1/4 w-32 h-32 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
    </section>
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

#faq > div > div:nth-child(2) > div {
  animation: fadeInUp 0.6s ease-out forwards;
}
`;

// Додаємо стилі до документа
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}
