"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Upload,
  Palette,
  Edit3,
  Eye,
  Download,
  CheckCircle2,
  Mail
} from 'lucide-react';
import Link from 'next/link';

// UI Components
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Cover Letter Templates
const coverLetterTemplates = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'A clean and professional cover letter template',
    previewImage: '/images/templates/cover-letter-professional.jpg',
    primaryColor: '#3B82F6',
    secondaryColor: '#93C5FD',
    fontFamily: 'Inter, sans-serif',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'A modern and stylish cover letter template',
    previewImage: '/images/templates/cover-letter-modern.jpg',
    primaryColor: '#8B5CF6',
    secondaryColor: '#C4B5FD',
    fontFamily: 'Inter, sans-serif',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'A creative and unique cover letter template',
    previewImage: '/images/templates/cover-letter-creative.jpg',
    primaryColor: '#EC4899',
    secondaryColor: '#F9A8D4',
    fontFamily: 'Inter, sans-serif',
  },
  {
    id: 'simple',
    name: 'Simple',
    description: 'A simple and clean cover letter template',
    previewImage: '/images/templates/cover-letter-simple.jpg',
    primaryColor: '#10B981',
    secondaryColor: '#A7F3D0',
    fontFamily: 'Inter, sans-serif',
  }
];

// Fallback image for templates
const fallbackImage = '/templates/modern.png';

export default function CreateCoverLetterPage() {
  const [activeTab, setActiveTab] = useState<'template' | 'edit' | 'preview'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState(coverLetterTemplates[0]);
  const [coverLetterData, setCoverLetterData] = useState({
    recipientName: '',
    companyName: '',
    jobTitle: '',
    yourName: 'John Doe',
    yourEmail: 'john.doe@example.com',
    yourPhone: '(123) 456-7890',
    yourAddress: 'New York, NY',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    greeting: 'Dear Hiring Manager,',
    introduction: 'I am writing to express my interest in the [Job Title] position at [Company Name]. With my background in [Your Background] and passion for [Industry/Field], I am confident that I would be a valuable addition to your team.',
    body: 'Throughout my career, I have developed strong skills in [Key Skill 1], [Key Skill 2], and [Key Skill 3]. In my previous role at [Previous Company], I [Achievement 1]. I also [Achievement 2], which resulted in [Positive Outcome].\n\nI am particularly drawn to [Company Name] because of your commitment to [Company Value/Mission]. I believe my experience in [Relevant Experience] aligns perfectly with what you are looking for in a [Job Title].',
    conclusion: 'Thank you for considering my application. I am excited about the opportunity to contribute to [Company Name] and would welcome the chance to discuss how my skills and experiences would benefit your team. I look forward to hearing from you.',
    closing: 'Sincerely,',
    signature: 'John Doe'
  });

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
  };

  const handleTabChange = (tab: 'template' | 'edit' | 'preview') => {
    setActiveTab(tab);
  };

  const handleInputChange = (field: string, value: string) => {
    setCoverLetterData({
      ...coverLetterData,
      [field]: value
    });
  };

  // Render the appropriate component based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'template':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Choose Your Cover Letter Template
            </h2>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coverLetterTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedTemplate.id === template.id
                      ? 'border-blue-500 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="aspect-[3/4] relative bg-gradient-to-b from-blue-50 to-indigo-50 flex items-center justify-center">
                    <div className="absolute top-0 left-0 right-0 p-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
                      <span className="text-sm font-medium">{template.name}</span>
                    </div>

                    <Mail className="h-16 w-16 text-blue-500" />

                    {selectedTemplate.id === template.id && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-white">
                    <h3 className="font-medium text-gray-900">{template.name}</h3>
                    <p className="text-xs text-gray-500">{template.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-end">
              <Button
                onClick={() => handleTabChange('edit')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Next: Edit Cover Letter <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 'edit':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Edit Your Cover Letter
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
                    <input
                      type="text"
                      value={coverLetterData.recipientName}
                      onChange={(e) => handleInputChange('recipientName', e.target.value)}
                      placeholder="Hiring Manager"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input
                      type="text"
                      value={coverLetterData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="Company Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={coverLetterData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    placeholder="Job Title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={coverLetterData.yourName}
                      onChange={(e) => handleInputChange('yourName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                    <input
                      type="email"
                      value={coverLetterData.yourEmail}
                      onChange={(e) => handleInputChange('yourEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Phone</label>
                    <input
                      type="text"
                      value={coverLetterData.yourPhone}
                      onChange={(e) => handleInputChange('yourPhone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Address</label>
                    <input
                      type="text"
                      value={coverLetterData.yourAddress}
                      onChange={(e) => handleInputChange('yourAddress', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="text"
                    value={coverLetterData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Greeting</label>
                  <input
                    type="text"
                    value={coverLetterData.greeting}
                    onChange={(e) => handleInputChange('greeting', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Introduction</label>
                  <textarea
                    value={coverLetterData.introduction}
                    onChange={(e) => handleInputChange('introduction', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
                  <textarea
                    value={coverLetterData.body}
                    onChange={(e) => handleInputChange('body', e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Conclusion</label>
                  <textarea
                    value={coverLetterData.conclusion}
                    onChange={(e) => handleInputChange('conclusion', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Closing</label>
                    <input
                      type="text"
                      value={coverLetterData.closing}
                      onChange={(e) => handleInputChange('closing', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Signature</label>
                    <input
                      type="text"
                      value={coverLetterData.signature}
                      onChange={(e) => handleInputChange('signature', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="text-right mb-6">
                    <p className="text-gray-700">{coverLetterData.yourName}</p>
                    <p className="text-gray-700">{coverLetterData.yourEmail}</p>
                    <p className="text-gray-700">{coverLetterData.yourPhone}</p>
                    <p className="text-gray-700">{coverLetterData.yourAddress}</p>
                    <p className="text-gray-700 mt-4">{coverLetterData.date}</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-700">{coverLetterData.recipientName || 'Hiring Manager'}</p>
                    <p className="text-gray-700">{coverLetterData.companyName || 'Company Name'}</p>
                  </div>

                  <p className="mb-4 text-gray-700">{coverLetterData.greeting}</p>

                  <p className="mb-4 text-gray-700">{coverLetterData.introduction.replace('[Job Title]', coverLetterData.jobTitle || 'Job Title').replace('[Company Name]', coverLetterData.companyName || 'Company Name')}</p>

                  <p className="mb-4 text-gray-700 whitespace-pre-line">{coverLetterData.body.replace('[Company Name]', coverLetterData.companyName || 'Company Name').replace('[Job Title]', coverLetterData.jobTitle || 'Job Title')}</p>

                  <p className="mb-4 text-gray-700">{coverLetterData.conclusion.replace('[Company Name]', coverLetterData.companyName || 'Company Name')}</p>

                  <p className="mb-4 text-gray-700">{coverLetterData.closing}</p>
                  <p className="text-gray-700">{coverLetterData.signature}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-between">
              <Button
                onClick={() => handleTabChange('template')}
                variant="outline"
                className="px-6 py-2 rounded-lg font-medium border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Templates
              </Button>

              <Button
                onClick={() => handleTabChange('preview')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Preview Cover Letter <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 'preview':
        return (
          <div className="p-8">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 md:mb-0">
                Cover Letter Preview
              </h2>
              <div className="flex gap-3">
                <Button
                  onClick={() => handleTabChange('edit')}
                  variant="outline"
                  className="px-4 py-2 rounded-lg font-medium border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
                >
                  <Edit3 className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="p-12">
                  <div className="text-right mb-8">
                    <p className="text-gray-700">{coverLetterData.yourName}</p>
                    <p className="text-gray-700">{coverLetterData.yourEmail}</p>
                    <p className="text-gray-700">{coverLetterData.yourPhone}</p>
                    <p className="text-gray-700">{coverLetterData.yourAddress}</p>
                    <p className="text-gray-700 mt-4">{coverLetterData.date}</p>
                  </div>

                  <div className="mb-8">
                    <p className="text-gray-700">{coverLetterData.recipientName || 'Hiring Manager'}</p>
                    <p className="text-gray-700">{coverLetterData.companyName || 'Company Name'}</p>
                  </div>

                  <p className="mb-6 text-gray-700">{coverLetterData.greeting}</p>

                  <p className="mb-6 text-gray-700">{coverLetterData.introduction.replace('[Job Title]', coverLetterData.jobTitle || 'Job Title').replace('[Company Name]', coverLetterData.companyName || 'Company Name')}</p>

                  <p className="mb-6 text-gray-700 whitespace-pre-line">{coverLetterData.body.replace('[Company Name]', coverLetterData.companyName || 'Company Name').replace('[Job Title]', coverLetterData.jobTitle || 'Job Title')}</p>

                  <p className="mb-6 text-gray-700">{coverLetterData.conclusion.replace('[Company Name]', coverLetterData.companyName || 'Company Name')}</p>

                  <p className="mb-6 text-gray-700">{coverLetterData.closing}</p>
                  <p className="text-gray-700">{coverLetterData.signature}</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Create Your Cover Letter</h1>
            <p className="mt-2 text-gray-600">Follow these simple steps to create a professional cover letter</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="max-w-3xl mx-auto">
              <Tabs value={activeTab} className="w-full">
                <TabsList className="grid grid-cols-3 w-full bg-gray-100 p-1 rounded-lg">
                  {[
                    { id: 'template', label: 'Template', icon: <Palette className="h-4 w-4" /> },
                    { id: 'edit', label: 'Edit', icon: <Edit3 className="h-4 w-4" /> },
                    { id: 'preview', label: 'Preview', icon: <Eye className="h-4 w-4" /> }
                  ].map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      onClick={() => handleTabChange(tab.id as any)}
                      className={`flex items-center justify-center gap-2 py-2 ${
                        activeTab === tab.id ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                      {activeTab === tab.id && <CheckCircle2 className="h-4 w-4 text-green-500 ml-1" />}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Main Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden"
          >
            {renderContent()}
          </motion.div>

          {/* Tips Section */}
          <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Cover Letter Tips</h3>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Address your cover letter to a specific person whenever possible</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Customize your cover letter for each job application</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Keep your cover letter concise, ideally one page or less</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
