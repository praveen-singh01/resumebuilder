"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronRight, ArrowRight, Briefcase } from 'lucide-react';

// Example data
const industries = [
  'All Industries',
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Marketing',
  'Sales',
  'Customer Service',
  'Administrative',
  'Engineering',
  'Design',
  'Hospitality'
];

const examples = [
  {
    id: 'software-engineer-cv',
    title: 'Software Engineer CV',
    industry: 'Technology',
    experience: 'Mid-level',
    description: 'A clean and professional CV for a software engineer with 3-5 years of experience.'
  },
  {
    id: 'financial-analyst-cv',
    title: 'Financial Analyst CV',
    industry: 'Finance',
    experience: 'Entry-level',
    description: 'A well-structured CV for an entry-level financial analyst position.'
  },
  {
    id: 'nurse-cv',
    title: 'Registered Nurse CV',
    industry: 'Healthcare',
    experience: 'Senior',
    description: 'A comprehensive CV for an experienced registered nurse highlighting clinical skills.'
  },
  {
    id: 'teacher-cv',
    title: 'Elementary Teacher CV',
    industry: 'Education',
    experience: 'Mid-level',
    description: 'A creative yet professional CV for a teacher with classroom experience.'
  },
  {
    id: 'marketing-manager-cv',
    title: 'Marketing Manager CV',
    industry: 'Marketing',
    experience: 'Senior',
    description: 'A results-focused CV for a marketing manager with campaign success metrics.'
  },
  {
    id: 'sales-representative-cv',
    title: 'Sales Representative CV',
    industry: 'Sales',
    experience: 'Entry-level',
    description: 'A persuasive CV for a sales representative highlighting communication skills.'
  },
  {
    id: 'customer-service-cv',
    title: 'Customer Service Representative CV',
    industry: 'Customer Service',
    experience: 'Entry-level',
    description: 'A customer-focused CV for a service representative position.'
  },
  {
    id: 'administrative-assistant-cv',
    title: 'Administrative Assistant CV',
    industry: 'Administrative',
    experience: 'Mid-level',
    description: 'An organized CV for an administrative assistant with office management skills.'
  },
  {
    id: 'mechanical-engineer-cv',
    title: 'Mechanical Engineer CV',
    industry: 'Engineering',
    experience: 'Senior',
    description: 'A technical CV for a mechanical engineer with project management experience.'
  },
  {
    id: 'graphic-designer-cv',
    title: 'Graphic Designer CV',
    industry: 'Design',
    experience: 'Mid-level',
    description: 'A creative CV for a graphic designer showcasing visual skills and portfolio.'
  },
  {
    id: 'hotel-manager-cv',
    title: 'Hotel Manager CV',
    industry: 'Hospitality',
    experience: 'Senior',
    description: 'A service-oriented CV for a hotel manager with leadership experience.'
  },
  {
    id: 'data-scientist-cv',
    title: 'Data Scientist CV',
    industry: 'Technology',
    experience: 'Mid-level',
    description: 'An analytical CV for a data scientist highlighting technical skills and projects.'
  }
];

export default function CVExamplesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndustry, setActiveIndustry] = useState('All Industries');
  const [activeExperience, setActiveExperience] = useState('All');
  const [hoveredExample, setHoveredExample] = useState<string | null>(null);

  // Filter examples based on search term, industry, and experience level
  const filteredExamples = examples.filter(example => {
    const matchesSearch = example.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          example.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = activeIndustry === 'All Industries' || example.industry === activeIndustry;
    const matchesExperience = activeExperience === 'All' || example.experience === activeExperience;
    return matchesSearch && matchesIndustry && matchesExperience;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CV Examples</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Browse our collection of professionally written CV examples for inspiration. Find examples relevant to your industry and experience level.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-10">
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by job title or industry..."
              />
            </div>
          </div>

          {/* Industry Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Industry</h3>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setActiveIndustry(industry)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeIndustry === industry
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Level Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Experience Level</h3>
            <div className="flex flex-wrap gap-2">
              {['All', 'Entry-level', 'Mid-level', 'Senior'].map((level) => (
                <button
                  key={level}
                  onClick={() => setActiveExperience(level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeExperience === level
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredExamples.map((example) => (
            <motion.div
              key={example.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative group"
              onMouseEnter={() => setHoveredExample(example.id)}
              onMouseLeave={() => setHoveredExample(null)}
            >
              <Link href={`/cv-examples/${example.id}`}>
                <div className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                  <div className="aspect-[3/4] relative bg-gradient-to-b from-blue-50 to-indigo-50 flex items-center justify-center">
                    <div className="absolute top-0 left-0 right-0 p-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
                      <span className="text-sm font-medium">{example.title}</span>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <Briefcase className="h-12 w-12 text-blue-500 mb-2" />
                      <span className="text-xs text-blue-700">{example.industry}</span>
                    </div>
                    
                    {/* Overlay on hover */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 ${
                        hoveredExample === example.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    ></div>
                    
                    {/* Example info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h3 className="font-medium">{example.title}</h3>
                      <p className="text-xs text-gray-200">{example.industry} • {example.experience}</p>
                    </div>
                    
                    {/* View example button */}
                    <div 
                      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                        hoveredExample === example.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <span className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-blue-50 transition-colors">
                        View Example
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2">
                  <h3 className="font-medium text-gray-900">{example.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{example.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* No results message */}
        {filteredExamples.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No examples found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* CV Writing Tips */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">CV Writing Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">Tailor Your CV</h3>
              <p className="text-gray-600 mb-4">Customize your CV for each job application by including relevant keywords from the job description.</p>
              <Link href="/blog/tailoring-your-cv" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">Quantify Achievements</h3>
              <p className="text-gray-600 mb-4">Use numbers and percentages to demonstrate the impact of your work and make your accomplishments stand out.</p>
              <Link href="/blog/quantifying-achievements" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">Use Action Verbs</h3>
              <p className="text-gray-600 mb-4">Start bullet points with strong action verbs like "achieved," "implemented," or "managed" to show initiative.</p>
              <Link href="/blog/action-verbs-for-cvs" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to create your own professional CV?</h2>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
            Use our CV builder to create a standout CV in minutes. Choose from professional templates and get expert guidance.
          </p>
          <Link 
            href="/app/create-cv" 
            className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-lg"
          >
            Create My CV <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
