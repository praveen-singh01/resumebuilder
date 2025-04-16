"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronRight, ArrowRight, FileText, Briefcase } from 'lucide-react';

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
    id: 'software-engineer',
    title: 'Software Engineer',
    industry: 'Technology',
    experience: 'Mid-level',
    image: '/images/examples/software-engineer.jpg',
    description: 'A clean and professional resume for a software engineer with 3-5 years of experience.'
  },
  {
    id: 'financial-analyst',
    title: 'Financial Analyst',
    industry: 'Finance',
    experience: 'Entry-level',
    image: '/images/examples/financial-analyst.jpg',
    description: 'A well-structured resume for an entry-level financial analyst position.'
  },
  {
    id: 'nurse',
    title: 'Registered Nurse',
    industry: 'Healthcare',
    experience: 'Senior',
    image: '/images/examples/nurse.jpg',
    description: 'A comprehensive resume for an experienced registered nurse highlighting clinical skills.'
  },
  {
    id: 'teacher',
    title: 'Elementary Teacher',
    industry: 'Education',
    experience: 'Mid-level',
    image: '/images/examples/teacher.jpg',
    description: 'A creative yet professional resume for a teacher with classroom experience.'
  },
  {
    id: 'marketing-manager',
    title: 'Marketing Manager',
    industry: 'Marketing',
    experience: 'Senior',
    image: '/images/examples/marketing-manager.jpg',
    description: 'A results-focused resume for a marketing manager with campaign success metrics.'
  },
  {
    id: 'sales-representative',
    title: 'Sales Representative',
    industry: 'Sales',
    experience: 'Entry-level',
    image: '/images/examples/sales-representative.jpg',
    description: 'A persuasive resume for a sales representative highlighting communication skills.'
  },
  {
    id: 'customer-service',
    title: 'Customer Service Representative',
    industry: 'Customer Service',
    experience: 'Entry-level',
    image: '/images/examples/customer-service.jpg',
    description: 'A customer-focused resume for a service representative position.'
  },
  {
    id: 'administrative-assistant',
    title: 'Administrative Assistant',
    industry: 'Administrative',
    experience: 'Mid-level',
    image: '/images/examples/administrative-assistant.jpg',
    description: 'An organized resume for an administrative assistant with office management skills.'
  },
  {
    id: 'mechanical-engineer',
    title: 'Mechanical Engineer',
    industry: 'Engineering',
    experience: 'Senior',
    image: '/images/examples/mechanical-engineer.jpg',
    description: 'A technical resume for a mechanical engineer with project management experience.'
  },
  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    industry: 'Design',
    experience: 'Mid-level',
    image: '/images/examples/graphic-designer.jpg',
    description: 'A creative resume for a graphic designer showcasing visual skills and portfolio.'
  },
  {
    id: 'hotel-manager',
    title: 'Hotel Manager',
    industry: 'Hospitality',
    experience: 'Senior',
    image: '/images/examples/hotel-manager.jpg',
    description: 'A service-oriented resume for a hotel manager with leadership experience.'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    industry: 'Technology',
    experience: 'Mid-level',
    image: '/images/examples/data-scientist.jpg',
    description: 'An analytical resume for a data scientist highlighting technical skills and projects.'
  }
];

// Fallback image for examples
const fallbackImage = '/templates/modern.png';

export default function ResumeExamplesPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Resume Examples</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Browse our collection of professionally written resume examples for inspiration. Find examples relevant to your industry and experience level.
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
              <Link href={`/resume-examples/${example.id}`}>
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

        {/* Resume Writing Tips */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Resume Writing Tips</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">Tailor Your Resume</h3>
              <p className="text-gray-600 mb-4">Customize your resume for each job application by including relevant keywords from the job description.</p>
              <Link href="/blog/tailoring-your-resume" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
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
              <Link href="/blog/action-verbs-for-resumes" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to create your own professional resume?</h2>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
            Use our resume builder to create a standout resume in minutes. Choose from professional templates and get expert guidance.
          </p>
          <Link
            href="/app/create-resume"
            className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-lg"
          >
            Create My Resume <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
