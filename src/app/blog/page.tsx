"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, ChevronRight, ArrowRight } from 'lucide-react';

// Blog post data
const blogPosts = [
  {
    id: 'resume-tips-2023',
    title: '10 Resume Tips for 2023 That Will Help You Get Hired',
    excerpt: 'Learn the latest resume trends and tips to make your resume stand out to employers in 2023.',
    category: 'Resume Tips',
    date: 'May 15, 2023',
    readTime: '5 min read',
    author: 'Sarah Johnson',
    featured: true
  },
  {
    id: 'ats-friendly-resume',
    title: 'How to Create an ATS-Friendly Resume That Gets Past the Bots',
    excerpt: 'Discover the secrets to creating a resume that will pass through Applicant Tracking Systems and land on the hiring manager\'s desk.',
    category: 'Resume Tips',
    date: 'April 28, 2023',
    readTime: '7 min read',
    author: 'Michael Chen',
    featured: true
  },
  {
    id: 'cover-letter-mistakes',
    title: '5 Common Cover Letter Mistakes and How to Avoid Them',
    excerpt: 'Don\'t let these common cover letter mistakes cost you the job. Learn how to write a compelling cover letter that gets results.',
    category: 'Cover Letters',
    date: 'April 10, 2023',
    readTime: '4 min read',
    author: 'Emily Rodriguez',
    featured: true
  },
  {
    id: 'remote-job-search',
    title: 'The Ultimate Guide to Finding Remote Jobs in 2023',
    excerpt: 'Looking for remote work? This comprehensive guide will show you how to find and land remote jobs in today\'s competitive market.',
    category: 'Job Search',
    date: 'March 22, 2023',
    readTime: '8 min read',
    author: 'David Wilson',
    featured: false
  },
  {
    id: 'linkedin-profile-optimization',
    title: 'LinkedIn Profile Optimization: 12 Steps to Get Noticed by Recruiters',
    excerpt: 'Learn how to optimize your LinkedIn profile to attract recruiters and land more job opportunities.',
    category: 'LinkedIn',
    date: 'March 15, 2023',
    readTime: '6 min read',
    author: 'Jessica Lee',
    featured: false
  },
  {
    id: 'career-change-resume',
    title: 'How to Write a Resume for a Career Change',
    excerpt: 'Changing careers? Learn how to highlight your transferable skills and create a resume that works for your new industry.',
    category: 'Resume Tips',
    date: 'February 28, 2023',
    readTime: '5 min read',
    author: 'Robert Taylor',
    featured: false
  },
  {
    id: 'job-interview-questions',
    title: '50 Common Job Interview Questions and How to Answer Them',
    excerpt: 'Prepare for your next job interview with these common questions and expert tips on how to answer them effectively.',
    category: 'Interviews',
    date: 'February 15, 2023',
    readTime: '10 min read',
    author: 'Amanda Garcia',
    featured: false
  },
  {
    id: 'salary-negotiation',
    title: 'Salary Negotiation: How to Get the Pay You Deserve',
    excerpt: 'Learn proven strategies for negotiating your salary and getting paid what you\'re worth.',
    category: 'Career Advice',
    date: 'January 30, 2023',
    readTime: '6 min read',
    author: 'James Brown',
    featured: false
  },
  {
    id: 'resume-keywords',
    title: 'Resume Keywords: How to Use Them to Get More Interviews',
    excerpt: 'Discover how to use the right keywords in your resume to get past ATS systems and land more interviews.',
    category: 'Resume Tips',
    date: 'January 18, 2023',
    readTime: '5 min read',
    author: 'Sarah Johnson',
    featured: false
  }
];

// Categories
const categories = [
  'All Categories',
  'Resume Tips',
  'Cover Letters',
  'Job Search',
  'LinkedIn',
  'Interviews',
  'Career Advice'
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Categories');

  // Filter blog posts based on search term and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All Categories' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Separate featured posts
  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Resume Builder Blog</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Expert advice on resume writing, job search strategies, and career development.
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
                placeholder="Search articles..."
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <Link href={`/blog/${post.id}`}>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="mr-3">{post.date}</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-3">{post.date}</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* No results message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-blue-100 mb-6">
                  Get the latest career advice, resume tips, and job search strategies delivered straight to your inbox.
                </p>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-lg">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-blue-200 mt-3">
                  By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-white rounded-2xl p-8 shadow-md border border-gray-100">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to create your professional resume?</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Use our resume builder to create a standout resume in minutes. Choose from professional templates and get expert guidance.
            </p>
            <Link 
              href="/app/create-resume" 
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-lg"
            >
              Create My Resume <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
