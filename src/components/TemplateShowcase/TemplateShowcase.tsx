"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, CheckCircle } from 'lucide-react';

// Template data
const templates = [
  {
    id: 'toronto',
    name: 'Toronto',
    users: '2,900,000+',
    image: '/images/templates/toronto.jpg',
    category: 'professional'
  },
  {
    id: 'stockholm',
    name: 'Stockholm',
    users: '10,000,000+',
    image: '/images/templates/stockholm.jpg',
    category: 'simple'
  },
  {
    id: 'new-york',
    name: 'New York',
    users: '4,700,000+',
    image: '/images/templates/new-york.jpg',
    category: 'modern'
  },
  {
    id: 'vienna',
    name: 'Vienna',
    users: '2,700,000+',
    image: '/images/templates/vienna.jpg',
    category: 'creative'
  },
  {
    id: 'sydney',
    name: 'Sydney',
    users: '2,300,000+',
    image: '/images/templates/sydney.jpg',
    category: 'ats'
  },
  {
    id: 'london',
    name: 'London',
    users: '5,000,000+',
    image: '/images/templates/london.jpg',
    category: 'professional'
  },
  {
    id: 'dublin',
    name: 'Dublin',
    users: '5,300,000+',
    image: '/images/templates/dublin.jpg',
    category: 'simple'
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    users: '2,100,000+',
    image: '/images/templates/amsterdam.jpg',
    category: 'modern'
  },
  {
    id: 'madrid',
    name: 'Madrid',
    users: '1,800,000+',
    image: '/images/templates/madrid.jpg',
    category: 'creative'
  },
  {
    id: 'berlin',
    name: 'Berlin',
    users: '1,800,000+',
    image: '/images/templates/berlin.jpg',
    category: 'ats'
  },
  {
    id: 'paris',
    name: 'Paris',
    users: '680,000+',
    image: '/images/templates/paris.jpg',
    category: 'professional'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    users: '420,000+',
    image: '/images/templates/tokyo.jpg',
    category: 'simple'
  },
];

const TemplateShowcase = () => {
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredTemplates = activeCategory
    ? templates.filter(template => template.category === activeCategory)
    : templates;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Proven resume templates
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            These resume templates are here because they work. Every one is tried and tested on real hiring managers
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveCategory('simple')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'simple'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Simple
          </button>
          <button
            onClick={() => setActiveCategory('professional')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'professional'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Professional
          </button>
          <button
            onClick={() => setActiveCategory('modern')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'modern'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Modern
          </button>
          <button
            onClick={() => setActiveCategory('creative')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'creative'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Creative
          </button>
          <button
            onClick={() => setActiveCategory('ats')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'ats'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ATS
          </button>
        </div>

        {/* Templates grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative group"
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              <Link href={`/app/create-resume?template=${template.id}`}>
                <div className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                  <div className="aspect-[3/4] relative bg-gradient-to-b from-blue-50 to-indigo-50 flex items-center justify-center">
                    <div className="absolute top-0 left-0 right-0 p-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
                      <span className="text-sm font-medium">{template.name}</span>
                    </div>

                    <FileText className="h-16 w-16 text-blue-500" />

                    {/* Overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 ${
                        hoveredTemplate === template.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    ></div>

                    {/* Template info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-xs text-gray-200">{template.users} users chose this template</p>
                    </div>

                    {/* Use template button */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                        hoveredTemplate === template.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <span className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-blue-50 transition-colors">
                        Use this template
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/resume-templates" className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg">
            View all templates
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TemplateShowcase;
