"use client";

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import QuickContact from '@/components/QuickContact';
import CallbackPopup from '@/components/CallbackPopup';

export default function Layout({ 
  children, 
  locale 
}: { 
  children: React.ReactNode; 
  locale: string 
}) {
  return (
    <>
      <Navigation locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
      <CookieConsent locale={locale} />
      <QuickContact />
      <CallbackPopup />
    </>
  );
}
