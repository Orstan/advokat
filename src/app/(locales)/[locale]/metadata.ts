import { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const { locale } = params;
  const isUkrainian = locale === 'uk';
  
  return {
    metadataBase: new URL('https://advokat-proidak.com'),
    title: isUkrainian ? 'Адвокат Пройдак Сергій Миколайович | Харків' : 'Attorney Serhii Proidak | Kharkiv',
    description: isUkrainian 
      ? 'Професійні юридичні послуги адвоката Пройдака Сергія Миколайовича в Харкові. Кримінальне та цивільне право, захист у суді, консультації.' 
      : 'Professional legal services by attorney Serhii Proidak in Kharkiv. Criminal and civil law, court representation, legal consultations.',
    keywords: isUkrainian 
      ? 'адвокат, юрист, Харків, правова допомога, кримінальне право, цивільне право, Пройдак Сергій' 
      : 'attorney, lawyer, Kharkiv, legal assistance, criminal law, civil law, Serhii Proidak',
    openGraph: {
      title: isUkrainian ? 'Адвокат Пройдак Сергій Миколайович | Харків' : 'Attorney Serhii Proidak | Kharkiv',
      description: isUkrainian 
        ? 'Професійні юридичні послуги адвоката Пройдака Сергія Миколайовича в Харкові.' 
        : 'Professional legal services by attorney Serhii Proidak in Kharkiv.',
      locale: locale,
      type: 'website',
    },
  };
}
