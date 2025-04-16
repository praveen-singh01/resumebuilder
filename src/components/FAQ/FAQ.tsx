"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'How do I create a resume?',
    answer: 'Creating a resume is easy with our resume builder. Simply click on the "Create my resume" button, choose a template, and follow the step-by-step process to fill in your information. You can add sections for your personal details, work experience, education, skills, and more. Once you\'re done, you can download your resume as a PDF file.'
  },
  {
    question: 'Can I upload my existing resume?',
    answer: 'Yes, you can upload your existing resume in PDF or Word format. Our system will extract the information and pre-fill the resume builder for you. You can then edit and update your information as needed before downloading your new resume.'
  },
  {
    question: 'Are the resume templates ATS-friendly?',
    answer: 'Yes, all of our resume templates are designed to be ATS-friendly. They use standard fonts, clear section headings, and proper formatting to ensure that your resume can be properly parsed by Applicant Tracking Systems. This increases your chances of getting past the initial screening process and having your resume seen by a human recruiter.'
  },
  {
    question: 'How do I download my resume?',
    answer: 'Once you\'ve completed your resume, you can download it by clicking the "Download" button. You can choose to download your resume as a PDF file, which is the most commonly accepted format by employers. Your resume will be saved to your device, and you can then email it to employers or upload it to job application websites.'
  },
  {
    question: 'Can I create multiple resumes?',
    answer: 'Yes, you can create multiple resumes with our resume builder. This is useful if you want to tailor your resume for different job applications or industries. Each resume is saved to your account, and you can edit or download them at any time.'
  },
  {
    question: 'Is my information secure?',
    answer: 'Yes, we take data security very seriously. All of your information is encrypted and stored securely. We do not share your personal information with third parties without your consent. You can read more about our privacy policy to understand how we handle your data.'
  },
  {
    question: 'Do I need to create an account?',
    answer: 'Creating an account is recommended as it allows you to save your progress and come back to edit your resume later. However, you can start building your resume without creating an account. If you decide to save your progress, you will be prompted to create an account or log in.'
  },
  {
    question: 'How do I make my resume stand out?',
    answer: 'To make your resume stand out, focus on highlighting your achievements rather than just listing job duties. Use action verbs and quantify your accomplishments with specific metrics when possible. Choose a clean, professional template that matches your industry. Customize your resume for each job application by including relevant keywords from the job description. Our resume builder provides suggestions and tips to help you create a standout resume.'
  }
];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFAQs, setFilteredFAQs] = useState(faqItems);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredFAQs(faqItems);
    } else {
      const filtered = faqItems.filter(
        item =>
          item.question.toLowerCase().includes(term.toLowerCase()) ||
          item.answer.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredFAQs(filtered);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Find answers to common questions about our resume builder.
          </motion.p>
        </div>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for questions..."
            />
          </div>
        </div>

        {/* FAQ accordion */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <Accordion type="single" collapsible className="divide-y divide-gray-200">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <AccordionItem value={`item-${index}`} className="border-none">
                    <AccordionTrigger className="px-6 py-4 text-left text-gray-900 hover:text-blue-600 hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 text-gray-600">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                No questions found matching "{searchTerm}". Try a different search term.
              </div>
            )}
          </Accordion>
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">Still have questions?</p>
          <a
            href="/contact"
            className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            Contact our support team
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
