"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FileUpload from '@/components/FileUpload/FileUpload';
import LinkedInInput from '@/components/LinkedInInput/LinkedInInput';
import ResumeEditor from '@/components/ResumeEditor/ResumeEditor';
import { ResumeData } from '@/types/resume';
import TemplateSelection, { ResumeTemplate } from '@/components/TemplateSelection';
import ModernTemplate from '@/components/ResumeTemplates/ModernTemplate';
import MinimalTemplate from '@/components/ResumeTemplates/MinimalTemplate';
import ClassicTemplate from '@/components/ResumeTemplates/ClassicTemplate';
import CreativeTemplate from '@/components/ResumeTemplates/CreativeTemplate';
import ContemporaryTemplate from '@/components/ResumeTemplates/ContemporaryTemplate';

// UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles } from '@/components/ui/sparkles';
import { MovingBorder } from '@/components/ui/moving-border';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { TextReveal } from '@/components/ui/text-reveal';

// Icons
import {
  Upload,
  FileText as LinkedinIcon, // Using FileText as a replacement for the deprecated Linkedin icon
  Palette,
  Edit3,
  Eye,
  Download,
  CheckCircle2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function Home() {
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

  const [activeTab, setActiveTab] = useState<'input' | 'template' | 'edit' | 'preview'>('preview');
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
    setResumeData(data);
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
                    <LinkedinIcon className="inline-block mr-2 h-4 w-4" /> LinkedIn Import
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
                Next: Choose Template <ArrowRight className="ml-2 h-4 w-4" />
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
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>

              <Button
                onClick={() => handleTabChange('edit')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Next: Edit Resume <ArrowRight className="ml-2 h-4 w-4" />
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
                <Button
                  onClick={() => window.print()}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      {/* Hero Section with Background Effects */}
      <div className="relative">
        <BackgroundBeams className="absolute inset-0 z-0 opacity-40" />
        <header className="relative z-10 pt-20 pb-16 px-4 md:px-6 text-center">
          <div className="container mx-auto max-w-6xl">
            <Sparkles>
              <TextReveal
                text="Build Your Professional Resume in Minutes"
                className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4"
              />
            </Sparkles>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mt-6 mb-8">
              Create a standout resume with our easy-to-use builder. Upload your existing resume or
              <span className="text-blue-600 font-medium"> start from scratch</span> and customize with
              <span className="text-indigo-600 font-medium"> professional templates</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                onClick={() => handleTabChange('input')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={() => handleTabChange('preview')}
                variant="outline"
                className="px-8 py-3 rounded-lg text-lg font-medium border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
              >
                View Samples <Eye className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4 md:px-6 relative z-10">
        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => handleTabChange(value as any)} className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto mb-8 bg-gray-100 p-1 rounded-lg">
            {['input', 'template', 'edit', 'preview'].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className={`rounded-md py-3 ${activeTab === tab ? 'bg-white shadow-sm' : ''}`}
              >
                <div className="flex items-center gap-2">
                  {tab === 'input' && <Upload className="h-4 w-4" />}
                  {tab === 'template' && <Palette className="h-4 w-4" />}
                  {tab === 'edit' && <Edit3 className="h-4 w-4" />}
                  {tab === 'preview' && <Eye className="h-4 w-4" />}
                  <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                  {activeTab === tab && <CheckCircle2 className="h-4 w-4 text-green-500 ml-1" />}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-0 shadow-xl overflow-hidden bg-white/80 backdrop-blur-sm">
                <CardContent className="p-0">
                  {renderContent()}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Resume Builder</h3>
              <p className="text-gray-400">Create professional resumes in minutes with our easy-to-use builder.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>PDF Resume Upload</li>
                <li>LinkedIn Profile Import</li>
                <li>Multiple Templates</li>
                <li>AI-Powered Suggestions</li>
                <li>One-Click Download</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">Have questions or feedback? Reach out to us.</p>
              <a href="mailto:support@resumebuilder.com" className="text-blue-400 hover:text-blue-300 mt-2 inline-block">support@resumebuilder.com</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Resume Builder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}