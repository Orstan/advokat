import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Вимикаємо статичну оптимізацію для всього проекту
  experimental: {
    // Змушуємо Next.js використовувати серверний рендеринг для всіх сторінок
    serverActions: true,
  }
};

export default withNextIntl(nextConfig);
