import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  // При використанні App Router з next-intl не потрібно вказувати i18n конфігурацію тут
};

export default withNextIntl(nextConfig);
