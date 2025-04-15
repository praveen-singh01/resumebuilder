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
        className="px-4 py-2 bg-blue-500 text-white rounded-md opacity-50 cursor-not-allowed"
        disabled
      >
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
        className={`px-4 py-2 ${isGenerating ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-md transition-colors`}
        onClick={() => setIsGenerating(true)}
      >
        {({ loading }) =>
          loading || isGenerating ? 'Generating PDF...' : 'Download PDF'
        }
      </PDFDownloadLink>
    </div>
  );
}
