'use client';

import Script from 'next/script';

interface StructuredDataProps {
  locale: string;
}

export default function StructuredData({ locale }: StructuredDataProps) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": locale === 'uk' ? "Адвокат Пройдак Сергій Миколайович" : "Lawyer Serhii Proidak",
    "description": locale === 'uk' 
      ? "Професійний адвокат у Києві. Кримінальне, цивільне, адміністративне право. Захист у суді, юридичні консультації."
      : "Professional lawyer in Kyiv. Criminal, civil, administrative law. Court defense, legal consultations.",
    "url": "https://advokat-proidak.com",
    "logo": "https://advokat-proidak.com/logo.png",
    "image": "https://advokat-proidak.com/og-image.jpg",
    "telephone": "+380 (XX) XXX-XX-XX",
    "email": "info@advokat-proidak.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": locale === 'uk' ? "Київ" : "Kyiv",
      "addressCountry": "UA",
      "streetAddress": ""
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "50.4501",
      "longitude": "30.5234"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$",
    "areaServed": {
      "@type": "Country",
      "name": locale === 'uk' ? "Україна" : "Ukraine"
    },
    "serviceType": [
      locale === 'uk' ? "Кримінальне право" : "Criminal Law",
      locale === 'uk' ? "Цивільне право" : "Civil Law",
      locale === 'uk' ? "Господарське право" : "Corporate Law",
      locale === 'uk' ? "Адміністративне право" : "Administrative Law",
      locale === 'uk' ? "Військове право" : "Military Law"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "50",
      "bestRating": "5"
    }
  };

  const attorneyData = {
    "@context": "https://schema.org",
    "@type": "Attorney",
    "name": locale === 'uk' ? "Пройдак Сергій Миколайович" : "Serhii Proidak",
    "jobTitle": locale === 'uk' ? "Адвокат" : "Attorney",
    "worksFor": {
      "@type": "LegalService",
      "name": locale === 'uk' ? "Адвокат Пройдак Сергій Миколайович" : "Lawyer Serhii Proidak"
    },
    "url": "https://advokat-proidak.com",
    "image": "https://advokat-proidak.com/og-image.jpg",
    "knowsAbout": [
      locale === 'uk' ? "Кримінальне право" : "Criminal Law",
      locale === 'uk' ? "Цивільне право" : "Civil Law",
      locale === 'uk' ? "Господарське право" : "Corporate Law",
      locale === 'uk' ? "Адміністративне право" : "Administrative Law",
      locale === 'uk' ? "Військове право України" : "Military Law"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "UA"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === 'uk' ? "Головна" : "Home",
        "item": `https://advokat-proidak.com/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": locale === 'uk' ? "Послуги" : "Services",
        "item": `https://advokat-proidak.com/${locale}/services`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": locale === 'uk' ? "Контакти" : "Contacts",
        "item": `https://advokat-proidak.com/${locale}/contacts`
      }
    ]
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <Script
        id="attorney-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(attorneyData) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}
