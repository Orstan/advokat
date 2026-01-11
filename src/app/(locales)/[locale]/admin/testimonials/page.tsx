"use client";

import AdminTestimonials from '@/components/AdminTestimonials';
import AdminAuth from '@/components/AdminAuth';

export default function AdminTestimonialsPage() {
  return (
    <AdminAuth>
      <AdminTestimonials />
    </AdminAuth>
  );
}
