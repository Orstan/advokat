import Link from 'next/link';

// Статична сторінка перенаправлення
export default function Home() {
  // Для статичного експорту використовуємо мета-тег з перенаправленням
  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Адвокат Пройдак Сергій Миколайович</h1>
      <p>Перенаправлення на <Link href="/uk">українську версію</Link>...</p>
      <meta httpEquiv="refresh" content="0;url=/uk" />
    </div>
  );
}
