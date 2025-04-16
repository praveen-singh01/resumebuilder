"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Filter, Check, FileText } from 'lucide-react';

// Template data
const templates = [
  {
    id: 'london-cv',
    name: 'London CV',
    users: '3,200,000+',
    category: 'professional'
  },
  {
    id: 'berlin-cv',
    name: 'Berlin CV',
    users: '2,800,000+',
    category: 'simple'
  },
  {
    id: 'paris-cv',
    name: 'Paris CV',
    users: '2,500,000+',
    category: 'modern'
  },
  {
    id: 'madrid-cv',
    name: 'Madrid CV',
    users: '1,900,000+',
    category: 'creative'
  },
  {
    id: 'rome-cv',
    name: 'Rome CV',
    users: '1,700,000+',
    category: 'ats'
  },
  {
    id: 'amsterdam-cv',
    name: 'Amsterdam CV',
    users: '1,500,000+',
    category: 'professional'
  },
  {
    id: 'vienna-cv',
    name: 'Vienna CV',
    users: '1,300,000+',
    category: 'simple'
  },
  {
    id: 'dublin-cv',
    name: 'Dublin CV',
    users: '1,100,000+',
    category: 'modern'
  },
  {
    id: 'lisbon-cv',
    name: 'Lisbon CV',
    users: '900,000+',
    category: 'creative'
  },
  {
    id: 'prague-cv',
    name: 'Prague CV',
    users: '800,000+',
    category: 'ats'
  },
  {
    id: 'brussels-cv',
    name: 'Brussels CV',
    users: '700,000+',
    category: 'professional'
  },
  {
    id: 'athens-cv',
    name: 'Athens CV',
    users: '600,000+',
    category: 'simple'
  },
];

export default function CVTemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  // Filter templates based on search term and category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory ? template.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CV Templates</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our collection of professional CV templates. Each template is ATS-friendly and designed to stand out.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search templates..."
            />
          </div>

          <div className="flex flex-wrap gap-2">
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
              ATS-Friendly
            </button>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
              <Link href={`/app/create-cv?template=${template.id}`}>
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

        {/* No results message */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No templates found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Why Our CV Templates Stand Out</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">ATS-Friendly</h3>
              <p className="text-gray-600">All our templates are designed to pass through Applicant Tracking Systems with ease.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professionally Designed</h3>
              <p className="text-gray-600">Created by professional designers with years of experience in CV optimization.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fully Customizable</h3>
              <p className="text-gray-600">Easily customize colors, fonts, and layouts to match your personal style.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to create your professional CV?</h2>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
            Choose a template and start building your CV in minutes. No credit card required.
          </p>
          <Link 
            href="/app/create-cv" 
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-lg"
          >
            Create My CV Now
          </Link>
        </div>
      </div>
    </div>
  );
}
