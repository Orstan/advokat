/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://advokat-proidak.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*'],
  
  // Додаємо всі сторінки вручну
  additionalPaths: async (config) => {
    const result = [];
    
    // Локалізації
    const locales = ['uk', 'en'];
    
    // Послуги (точні ID з services.ts)
    const services = [
      'criminal', 'civil', 'corporate', 
      'military', 'administrative', 'consultation'
    ];
    
    // Головні сторінки для кожної локалі
    locales.forEach(locale => {
      // Головна сторінка локалі
      result.push({
        loc: `/${locale}`,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      });
      
      // Про адвоката
      result.push({
        loc: `/${locale}/about`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      });
      
      // Послуги
      result.push({
        loc: `/${locale}/services`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      });
      
      // Кожна послуга окремо
      services.forEach(service => {
        result.push({
          loc: `/${locale}/services/${service}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        });
      });
      
      // Досягнення
      result.push({
        loc: `/${locale}/achievements`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
      
      // Контакти
      result.push({
        loc: `/${locale}/contacts`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      });
      
      // Політика конфіденційності
      result.push({
        loc: `/${locale}/privacy-policy`,
        changefreq: 'monthly',
        priority: 0.3,
        lastmod: new Date().toISOString(),
      });
    });
    
    return result;
  },
  
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      'https://advokat-proidak.com/sitemap.xml',
    ],
  },
}
