"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

// Типи для відгуків
interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
  email?: string;
  created_at: string;
}

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Стан для адмін-панелі
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminError, setAdminError] = useState('');

  // Завантаження відгуків з MySQL через API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials([]);
      }
    };
    
    fetchTestimonials();
  }, []);

  const handlePrevSlide = () => {
    if (testimonials.length > 1) {
      setActiveSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    }
  };

  const handleNextSlide = () => {
    if (testimonials.length > 1) {
      setActiveSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  // Функція для рендерингу зірок рейтингу
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-400"}>
        ★
      </span>
    ));
  };
  
  // Функція для відкриття модального вікна адміністратора
  const openAdminModal = () => {
    setIsAdminModalOpen(true);
    setAdminError('');
  };

  // Функція для закриття модального вікна адміністратора
  const closeAdminModal = () => {
    setIsAdminModalOpen(false);
    setAdminPassword('');
    setAdminError('');
  };

  // Функція для перевірки паролю адміністратора
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Перевірка паролю
    if (adminPassword === 'Forosa90@') {
      setIsAdminAuthenticated(true);
      setAdminError('');
      closeAdminModal();
    } else {
      setAdminError('Невірний пароль');
    }
  };
  
  // Функція для виходу з режиму адміністратора
  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
  };
  
  // Функція для приховування відгуку через API
  const hideTestimonial = async (id: number) => {
    if (window.confirm('Ви впевнені, що хочете приховати цей відгук?')) {
      try {
        const response = await fetch('/api/testimonials', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, is_visible: false })
        });
        
        if (response.ok) {
          // Оновлюємо локальний стан
          setTestimonials((prevTestimonials: Testimonial[]) => 
            prevTestimonials.filter((testimonial: Testimonial) => testimonial.id !== id)
          );
        }
      } catch (error) {
        console.error('Error hiding testimonial:', error);
        alert('Помилка при приховуванні відгуку. Спробуйте ще раз.');
      }
    }
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-2">
          {t('title').substring(0, 3)}<span className="relative inline-block">{t('title').charAt(3)}<span className="absolute inset-0 cursor-pointer" onClick={openAdminModal}></span></span>{t('title').substring(4)}
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>

        
        <h3 className="text-xl text-center text-gray-400 mb-12">{t('subtitle')}</h3>
        
        <div className="relative max-w-4xl mx-auto">
          {testimonials.length > 0 ? (
            <div className="overflow-hidden">
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 text-xl mr-2">
                    {Array.from({ length: testimonials[activeSlide]?.rating || 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                    {Array.from({ length: 5 - (testimonials[activeSlide]?.rating || 5) }).map((_, i) => (
                      <span key={i} className="text-gray-600">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 italic mb-4">"{testimonials[activeSlide]?.text || ''}"</p>
                <div className="flex justify-between items-center">
                  <p className="text-blue-400 font-medium">{testimonials[activeSlide]?.name || ''}</p>
                  <p className="text-gray-500 text-sm">
                    {testimonials[activeSlide]?.created_at ? 
                      new Intl.DateTimeFormat('uk-UA', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }).format(new Date(testimonials[activeSlide].created_at)) : ''}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg text-center">
              <p className="text-gray-300">{t('no_testimonials')}</p>
            </div>
          )}
          
          {testimonials.length > 1 && (
            <>
              <div className="flex justify-center items-center mt-8 space-x-4">
                <button 
                  onClick={handlePrevSlide}
                  className="w-10 h-10 rounded-full bg-gray-800 text-blue-500 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <span>&lt;</span>
                </button>
                
                {/* Розумне відображення точок-індикаторів */}
                {testimonials.length <= 5 ? (
                  // Якщо відгуків 5 або менше - показуємо всі точки
                  testimonials.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${activeSlide === index ? 'bg-blue-500' : 'bg-gray-600'}`}
                    />
                  ))
                ) : (
                  // Якщо більше 5 - показуємо максимум 5 точок з ...
                  <>
                    {activeSlide > 1 && <span className="text-gray-500">...</span>}
                    
                    {[...Array(testimonials.length)].map((_, index) => {
                      const isNearActive = Math.abs(index - activeSlide) <= 2;
                      const isFirstOrLast = index === 0 || index === testimonials.length - 1;
                      
                      if (isNearActive || isFirstOrLast) {
                        return (
                          <button 
                            key={index}
                            onClick={() => setActiveSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${activeSlide === index ? 'bg-blue-500' : 'bg-gray-600'}`}
                          />
                        );
                      }
                      return null;
                    })}
                    
                    {activeSlide < testimonials.length - 2 && <span className="text-gray-500">...</span>}
                  </>
                )}
                
                <button 
                  onClick={handleNextSlide}
                  className="w-10 h-10 rounded-full bg-gray-800 text-blue-500 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <span>&gt;</span>
                </button>
              </div>
              
              {/* Лічильник відгуків */}
              <div className="text-center mt-4 text-gray-400 text-sm">
                {activeSlide + 1} / {testimonials.length}
              </div>
            </>
          )}
        </div>
        
        <div className="text-center mt-12">
          <button 
            onClick={openForm}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors"
          >
            {t('leave_review')}
          </button>
        </div>
      </div>
      
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-8">
              {submitSuccess ? (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('thank_you')}</h2>
                  <p className="text-gray-300 mb-6">{t('review_published')}</p>
                  <button
                    onClick={closeForm}
                    className="px-6 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition-colors"
                  >
                    {t('close')}
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white mb-6">{t('form_title')}</h2>
                  
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    if (isSubmitting) return;
                    
                    try {
                      setIsSubmitting(true);
                      
                      if (!name || !text || !rating) {
                        alert(t('form_error'));
                        return;
                      }
                      
                      // Додаємо новий відгук через API
                      const response = await fetch('/api/testimonials', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, email, text, rating })
                      });
                      
                      if (!response.ok) throw new Error('Failed to submit');
                      
                      // Скидання форми
                      setName('');
                      setEmail('');
                      setText('');
                      setRating(5);
                      
                      // Показ повідомлення про успіх
                      setSubmitSuccess(true);
                      
                      // Закриття форми через 3 секунди
                      setTimeout(() => {
                        closeForm();
                        // Скидання статусу успіху для наступного відкриття
                        setTimeout(() => setSubmitSuccess(false), 300);
                      }, 3000);
                    } catch (error) {
                      console.error("Error adding testimonial:", error);
                      alert("Помилка при відправці відгуку. Спробуйте пізніше.");
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-white mb-2">
                        {t('form_name')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-white mb-2">
                        {t('form_email')} <span className="text-gray-400">{t('form_email_note')}</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white"
                        placeholder="example@mail.com"
                      />
                      <p className="text-sm text-gray-400 mt-1">
                        {t('form_email_privacy')}
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-white mb-2">
                        {t('form_rating')} <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center">
                        <div className="flex text-3xl">
                          {[1, 2, 3, 4, 5].map((value) => {
                            const isActive = value <= (hoveredRating || rating);
                            return (
                              <span
                                key={value}
                                className={`cursor-pointer ${isActive ? 'text-yellow-400' : 'text-gray-600'}`}
                                onClick={() => setRating(value)}
                                onMouseEnter={() => setHoveredRating(value)}
                                onMouseLeave={() => setHoveredRating(0)}
                              >
                                ★
                              </span>
                            );
                          })}
                        </div>
                        <span className="ml-3 text-white">
                          {rating === 1 && t('rating_terrible')}
                          {rating === 2 && t('rating_bad')}
                          {rating === 3 && t('rating_ok')}
                          {rating === 4 && t('rating_good')}
                          {rating === 5 && t('rating_excellent')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="text" className="block text-white mb-2">
                        {t('form_review')} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white h-32"
                        required
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={closeForm}
                        className="px-6 py-2 border border-gray-600 rounded text-white hover:bg-gray-800 transition-colors"
                        disabled={isSubmitting}
                      >
                        {t('form_cancel')}
                      </button>
                      <button
                        type="submit"
                        className={`px-6 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition-colors flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Відправляємо...
                          </>
                        ) : t('form_submit')}
                      </button>
                    </div>
                  </form>
                </>)
              }
            </div>
          </div>
        </div>
      )}
      
      {/* Модальне вікно для входу адміністратора */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Вхід для адміністратора</h3>
            
            <form onSubmit={handleAdminLogin}>
              {adminError && (
                <div className="bg-red-600 text-white p-3 rounded mb-4">
                  {adminError}
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="adminPassword" className="block text-gray-300 mb-2">
                  Пароль
                </label>
                <input
                  type="password"
                  id="adminPassword"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeAdminModal}
                  className="px-4 py-2 border border-gray-600 rounded text-white hover:bg-gray-700 transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition-colors"
                >
                  Увійти
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Адмін-панель для керування відгуками */}
      {isAdminAuthenticated && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4 z-40">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Режим адміністратора</h3>
              <button
                onClick={handleAdminLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Вийти
              </button>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-3">Керування відгуками</h4>
              
              {testimonials.length === 0 ? (
                <p className="text-gray-400">Відгуків поки немає</p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-1">
                          <span className="font-semibold text-white mr-2">{testimonial.name}</span>
                          <div className="text-sm">{renderStars(testimonial.rating)}</div>
                        </div>
                        <p className="text-gray-300 text-sm mb-1">{testimonial.text}</p>
                        {testimonial.email && (
                          <p className="text-gray-500 text-xs">{testimonial.email}</p>
                        )}
                      </div>
                      <button
                        onClick={() => hideTestimonial(testimonial.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                      >
                        Приховати
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
