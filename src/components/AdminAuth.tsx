"use client";

import { useState, useEffect } from 'react';

interface AdminAuthProps {
  children: React.ReactNode;
}

export default function AdminAuth({ children }: AdminAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Перевіряємо, чи користувач вже авторизований
  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Простий пароль для демонстрації (в реальному проекті використовуйте більш надійну авторизацію)
    if (password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Невірний пароль');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6">Вхід в адмін-панель</h1>
          
          <form onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-600 text-white p-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-300 mb-2">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Увійти
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Адмін-панель</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700 transition-colors"
        >
          Вийти
        </button>
      </div>
      {children}
    </div>
  );
}
