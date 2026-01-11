"use client";

import { useState, useEffect } from 'react';
import { db } from '@/firebase/config';
import { collection, getDocs, query, orderBy, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';

// Типи для відгуків
interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  email?: string;
  approved: boolean;
  createdAt: Timestamp;
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Завантаження всіх відгуків з Firebase
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "testimonials"), 
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const fetchedTestimonials: Testimonial[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedTestimonials.push({
            id: doc.id,
            name: data.name,
            rating: data.rating,
            text: data.text,
            email: data.email,
            approved: data.approved || false,
            createdAt: data.createdAt
          });
        });
        
        setTestimonials(fetchedTestimonials);
        setError(null);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setError("Помилка завантаження відгуків. Спробуйте оновити сторінку.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchTestimonials();
  }, []);

  // Функція для схвалення відгуку
  const approveTestimonial = async (id: string) => {
    try {
      const testimonialRef = doc(db, "testimonials", id);
      await updateDoc(testimonialRef, {
        approved: true
      });
      
      // Оновлюємо локальний стан
      setTestimonials(prevTestimonials => 
        prevTestimonials.map(testimonial => 
          testimonial.id === id ? { ...testimonial, approved: true } : testimonial
        )
      );
    } catch (error) {
      console.error("Error approving testimonial:", error);
      setError("Помилка при схваленні відгуку. Спробуйте ще раз.");
    }
  };

  // Функція для видалення відгуку
  const deleteTestimonial = async (id: string) => {
    if (window.confirm("Ви впевнені, що хочете видалити цей відгук?")) {
      try {
        const testimonialRef = doc(db, "testimonials", id);
        await deleteDoc(testimonialRef);
        
        // Оновлюємо локальний стан
        setTestimonials(prevTestimonials => 
          prevTestimonials.filter(testimonial => testimonial.id !== id)
        );
      } catch (error) {
        console.error("Error deleting testimonial:", error);
        setError("Помилка при видаленні відгуку. Спробуйте ще раз.");
      }
    }
  };

  // Функція для рендерингу зірок рейтингу
  const renderStars = (rating: number) => {
    return (
      <div className="flex text-yellow-400">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i}>★</span>
        ))}
        {Array.from({ length: 5 - rating }).map((_, i) => (
          <span key={i} className="text-gray-600">★</span>
        ))}
      </div>
    );
  };

  // Функція для форматування дати
  const formatDate = (timestamp: Timestamp) => {
    if (timestamp && typeof timestamp.toDate === 'function') {
      return new Intl.DateTimeFormat('uk-UA', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(timestamp.toDate());
    }
    return '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-8">Адміністрування відгуків</h1>
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-8">Адміністрування відгуків</h1>
        <div className="bg-red-600 text-white p-4 rounded-md">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-white text-red-600 rounded-md hover:bg-gray-100"
          >
            Оновити сторінку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Адміністрування відгуків</h1>
      
      {testimonials.length === 0 ? (
        <p className="text-gray-400 text-center py-8">Відгуків поки немає</p>
      ) : (
        <div className="grid gap-6">
          <div className="bg-gray-800 p-4 rounded-md mb-4">
            <div className="grid grid-cols-12 gap-4 font-bold text-blue-400">
              <div className="col-span-2">Дата</div>
              <div className="col-span-2">Ім'я</div>
              <div className="col-span-1">Рейтинг</div>
              <div className="col-span-4">Текст</div>
              <div className="col-span-1">Статус</div>
              <div className="col-span-2">Дії</div>
            </div>
          </div>
          
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-800 p-4 rounded-md">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2 text-sm text-gray-400">
                  {formatDate(testimonial.createdAt)}
                </div>
                <div className="col-span-2">
                  <p>{testimonial.name}</p>
                  {testimonial.email && (
                    <p className="text-sm text-gray-400">{testimonial.email}</p>
                  )}
                </div>
                <div className="col-span-1">
                  {renderStars(testimonial.rating)}
                </div>
                <div className="col-span-4">
                  <p className="text-gray-300">{testimonial.text}</p>
                </div>
                <div className="col-span-1">
                  {testimonial.approved ? (
                    <span className="inline-block px-2 py-1 bg-green-800 text-green-200 text-xs rounded-full">
                      Схвалено
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 bg-yellow-800 text-yellow-200 text-xs rounded-full">
                      Очікує
                    </span>
                  )}
                </div>
                <div className="col-span-2 flex space-x-2">
                  {!testimonial.approved && (
                    <button
                      onClick={() => approveTestimonial(testimonial.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Схвалити
                    </button>
                  )}
                  <button
                    onClick={() => deleteTestimonial(testimonial.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Видалити
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
