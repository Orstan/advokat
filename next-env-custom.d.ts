// Розширення типів для Next.js
import 'next';

// Перевизначення типів для Layout компонентів
declare module 'next' {
  export interface LayoutProps {
    children: React.ReactNode;
    params: any; // Дозволяємо будь-який тип для params
  }
}
