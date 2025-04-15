"use client";

import { useState, useEffect } from 'react';
import { ResumeData } from '@/types/resume';
import { ResumeTemplate } from '@/components/TemplateSelection';
import dynamic from 'next/dynamic';

// Dynamically import PDFDocument with no SSR
const PDFDocument = dynamic(() => import('./PDFDocument'), { ssr: false });

interface PDFExportProps {
  resumeData: ResumeData;
  selectedTemplate: ResumeTemplate;
}

export default function PDFExport({ resumeData, selectedTemplate }: PDFExportProps) {
  const [isClient, setIsClient] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [PDFDownloadLink, setPDFDownloadLink] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    // Dynamically import PDFDownloadLink only on client side
    import('@react-pdf/renderer').then((module) => {
      setPDFDownloadLink(() => module.PDFDownloadLink);
    });
  }, []);

  if (!isClient || !PDFDownloadLink) {
    return (
      <button
        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium opacity-50 cursor-not-allowed flex items-center"
        disabled
      >
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading PDF Export...
      </button>
    );
  }

  return (
    <div>
      <PDFDownloadLink
        document={
          <PDFDocument
            resumeData={resumeData}
            templateId={selectedTemplate.id}
            primaryColor={selectedTemplate.primaryColor}
            secondaryColor={selectedTemplate.secondaryColor}
            fontFamily={selectedTemplate.fontFamily}
          />
        }
        fileName={`${resumeData.personal.name.replace(/\s+/g, '_')}_Resume.pdf`}
        className={`px-4 py-2 ${isGenerating ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'} text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center`}
        onClick={() => setIsGenerating(true)}
      >
        {({ loading }) => (
          <>
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {loading || isGenerating ? 'Generating PDF...' : 'Download PDF'}
          </>
        )}
      </PDFDownloadLink>
    </div>
  );
}
