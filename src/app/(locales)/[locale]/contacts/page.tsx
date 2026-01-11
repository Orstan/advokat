import ContactsPageClient from './client';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'uk'
      ? 'Контакти | Адвокат Пройдак Сергій'
      : 'Contacts | Attorney Serhii Proidak',
    description: locale === 'uk'
      ? 'Зв\'\u044fжіться з нами для отримання юридичної консультації. Адреса, телефон, email та форма для зворотного зв\'\u044fзку.'
      : 'Contact us for legal consultation. Address, phone, email and contact form.',
  };
}

export default function ContactsPage() {
  return <ContactsPageClient />;
}
