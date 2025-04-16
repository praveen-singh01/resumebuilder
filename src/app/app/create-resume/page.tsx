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
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import AuthWrapper from '@/components/AuthWrapper';

// UI Components
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Resume Builder Components
import FileUpload from '@/components/FileUpload/FileUpload';
import LinkedInInput from '@/components/LinkedInInput/LinkedInInput';
import TemplateSelection from '@/components/TemplateSelection';
import ResumeEditor from '@/components/ResumeEditor/ResumeEditor';

// Resume Templates
import ModernTemplate from '@/components/ResumeTemplates/ModernTemplate';
import MinimalTemplate from '@/components/ResumeTemplates/MinimalTemplate';
import ClassicTemplate from '@/components/ResumeTemplates/ClassicTemplate';
import CreativeTemplate from '@/components/ResumeTemplates/CreativeTemplate';
import ContemporaryTemplate from '@/components/ResumeTemplates/ContemporaryTemplate';
import PDFExport from '@/components/PDFExport/PDFExport';

// Types
import { ResumeData } from '@/types/resume';
import { ResumeTemplate } from '@/components/TemplateSelection';

export default function CreateResumePage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>({
    personal: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(123) 456-7890",
      location: "New York, NY",
      summary: "Experienced software developer with a passion for creating elegant solutions.",
      linkedinUrl: "linkedin.com/in/johndoe"
    },
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "HTML/CSS"],
    workExperience: [
      {
        company: "Tech Solutions Inc.",
        position: "Senior Developer",
        startDate: "2020-01-01",
        endDate: "",
        current: true,
        description: "Lead developer for client projects, mentoring junior developers."
      },
      {
        company: "Web Innovations",
        position: "Frontend Developer",
        startDate: "2018-03-01",
        endDate: "2019-12-31",
        description: "Developed responsive web applications using React."
      }
    ],
    education: [
      {
        institution: "University of Technology",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2014-09-01",
        endDate: "2018-05-31"
      }
    ],
    projects: [
      {
        name: "E-commerce Platform",
        description: "Built a full-stack e-commerce platform with React and Node.js",
        technologies: ["React", "Node.js", "MongoDB"]
      }
    ],
    languages: [
      {
        language: "English",
        proficiency: "Native"
      },
      {
        language: "Spanish",
        proficiency: "Intermediate"
      }
    ],
    certifications: [
      {
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2022-06-15"
      }
    ]
  });

  const [activeTab, setActiveTab] = useState<'input' | 'template' | 'edit' | 'preview'>('input');
  const [activeInputMethod, setActiveInputMethod] = useState<'upload' | 'linkedin'>('upload');
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>({
    id: "modern",
    name: "Modern",
    description: "Clean and professional design with a modern touch",
    previewImage: "/templates/modern.png",
    primaryColor: "#3B82F6",
    secondaryColor: "#93C5FD",
    fontFamily: "Inter, sans-serif",
  });

  const handleTemplateSelect = (template: ResumeTemplate) => {
    setSelectedTemplate(template);
  };

  const handleTabChange = (tab: 'input' | 'template' | 'edit' | 'preview') => {
    setActiveTab(tab);
  };

  const handleResumeUpdate = (data: ResumeData) => {
    console.log('Updating resume data');

    // Force the data to be used directly
    const updatedData = {
      ...data,
      personal: {
        name: data.personal.name || 'John Doe',
        email: data.personal.email || 'john.doe@example.com',
        phone: data.personal.phone || '(123) 456-7890',
        location: data.personal.location || 'New York, NY',
        summary: data.personal.summary || 'Experienced software developer with over 5 years of experience in full-stack development.',
        linkedinUrl: data.personal.linkedinUrl || 'linkedin.com/in/johndoe'
      },
      skills: data.skills.length > 0 ? data.skills : ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'SQL', 'AWS', 'Docker', 'Git'],
      workExperience: data.workExperience.length > 0 ? data.workExperience : [
        {
          company: 'Tech Innovations Inc.',
          position: 'Senior Software Developer',
          startDate: 'Jan 2020',
          endDate: '',
          current: true,
          description: 'Lead development of web applications using React and Node.js.'
        }
      ],
      education: data.education.length > 0 ? data.education : [
        {
          institution: 'University of Technology',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2014',
          endDate: '2018'
        }
      ],
      projects: (data.projects && data.projects.length > 0) ? data.projects : [
        {
          name: 'E-commerce Platform',
          description: 'Developed a full-stack e-commerce platform with payment integration',
          technologies: ['React', 'Node.js', 'MongoDB']
        }
      ],
      languages: (data.languages && data.languages.length > 0) ? data.languages : [
        {
          language: 'English',
          proficiency: 'Fluent'
        },
        {
          language: 'Hindi',
          proficiency: 'Native'
        }
      ],
      certifications: (data.certifications && data.certifications.length > 0) ? data.certifications : [
        {
          name: 'AWS Certified Developer',
          issuer: 'Amazon Web Services',
          date: '2021'
        }
      ]
    };

    setResumeData(updatedData);

    // Automatically switch to the edit tab after data is loaded
    setActiveTab('edit');
  };

  // Render the appropriate component based on the active tab
  const renderContent = () => {
    if (!resumeData) return null;

    switch (activeTab) {
      case 'input':
        return (
          <div className="p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Upload Resume or Enter LinkedIn URL
            </h2>

            {/* Method Selection Tabs */}
            <div className="mb-6">
              <div className="flex justify-center">
                <div className="inline-flex bg-gray-100 p-1 rounded-lg">
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeInputMethod === 'upload' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                    onClick={() => setActiveInputMethod('upload')}
                  >
                    <Upload className="inline-block mr-2 h-4 w-4" /> Upload Resume
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeInputMethod === 'linkedin' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                    onClick={() => setActiveInputMethod('linkedin')}
                  >
                    <FileText className="inline-block mr-2 h-4 w-4" /> LinkedIn Import
                  </button>
                </div>
              </div>
            </div>

            {/* Content based on selected method */}
            <div className="max-w-xl mx-auto">
              {activeInputMethod === 'upload' ? (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <FileUpload onResumeData={handleResumeUpdate} />
                </div>
              ) : (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <LinkedInInput onResumeData={handleResumeUpdate} />
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => handleTabChange('template')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Next: Choose Template <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 'template':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Choose Your Resume Template
            </h2>

            <div className="mt-8">
              <TemplateSelection
                onSelectTemplate={handleTemplateSelect}
                selectedTemplateId={selectedTemplate.id}
              />
            </div>

            <div className="mt-12 flex justify-between">
              <Button
                onClick={() => handleTabChange('input')}
                variant="outline"
                className="px-6 py-2 rounded-lg font-medium border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>

              <Button
                onClick={() => handleTabChange('edit')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Next: Edit Resume <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 'edit':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Edit Your Resume
            </h2>

            <div className="mt-8">
              <ResumeEditor
                resumeData={resumeData}
                onUpdate={handleResumeUpdate}
                onPreview={() => handleTabChange('preview')}
              />
            </div>
          </div>
        );

      case 'preview':
        return (
          <div className="p-8">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 md:mb-0">
                Resume Preview
              </h2>
              <div className="flex gap-3">
                <Button
                  onClick={() => handleTabChange('edit')}
                  variant="outline"
                  className="px-4 py-2 rounded-lg font-medium border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
                >
                  <Edit3 className="mr-2 h-4 w-4" /> Edit
                </Button>
                <PDFExport
                  resumeData={resumeData}
                  selectedTemplate={selectedTemplate}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-full">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-4xl mx-auto">
                  {selectedTemplate.id === "modern" && (
                    <ModernTemplate
                      resumeData={resumeData}
                      primaryColor={selectedTemplate.primaryColor}
                      secondaryColor={selectedTemplate.secondaryColor}
                      fontFamily={selectedTemplate.fontFamily}
                    />
                  )}
                  {selectedTemplate.id === "minimal" && (
                    <MinimalTemplate
                      resumeData={resumeData}
                      primaryColor={selectedTemplate.primaryColor}
                      secondaryColor={selectedTemplate.secondaryColor}
                      fontFamily={selectedTemplate.fontFamily}
                    />
                  )}
                  {selectedTemplate.id === "classic" && (
                    <ClassicTemplate
                      resumeData={resumeData}
                      primaryColor={selectedTemplate.primaryColor}
                      secondaryColor={selectedTemplate.secondaryColor}
                      fontFamily={selectedTemplate.fontFamily}
                    />
                  )}
                  {selectedTemplate.id === "creative" && (
                    <CreativeTemplate
                      resumeData={resumeData}
                      primaryColor={selectedTemplate.primaryColor}
                      secondaryColor={selectedTemplate.secondaryColor}
                      fontFamily={selectedTemplate.fontFamily}
                    />
                  )}
                  {selectedTemplate.id === "contemporary" && (
                    <ContemporaryTemplate
                      resumeData={resumeData}
                      primaryColor={selectedTemplate.primaryColor}
                      secondaryColor={selectedTemplate.secondaryColor}
                      fontFamily={selectedTemplate.fontFamily}
                    />
                  )}
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
    <AuthWrapper requireAuth={true}>
      <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Create Your Professional Resume</h1>
            <p className="mt-2 text-gray-600">Follow these simple steps to create a standout resume</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="max-w-3xl mx-auto">
              <Tabs value={activeTab} className="w-full">
                <TabsList className="grid grid-cols-4 w-full bg-gray-100 p-1 rounded-lg">
                  {[
                    { id: 'input', label: 'Import', icon: <Upload className="h-4 w-4" /> },
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
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Resume Tips</h3>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Use action verbs and quantify your achievements with specific metrics</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Tailor your resume to each job application by including relevant keywords</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Keep your resume concise and focused on your most relevant experience</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </AuthWrapper>
  );
}
