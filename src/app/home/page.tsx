"use client";

import React from 'react';
import Hero from '@/components/Hero/Hero';
import Features from '@/components/Features';
import TemplateShowcase from '@/components/TemplateShowcase/TemplateShowcase';
import Testimonials from '@/components/Testimonials/Testimonials';
import FAQ from '@/components/FAQ/FAQ';
import CTA from '@/components/CTA/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <TemplateShowcase />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
