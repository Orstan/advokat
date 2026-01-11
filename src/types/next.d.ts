import type { ReactNode } from 'react';

declare module 'next' {
  export interface LayoutProps {
    children: ReactNode;
    params: any; // Дозволяємо будь-який тип для params
  }
}
