"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ResumeData } from '@/types/resume';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onResumeData: (data: ResumeData) => void;
}

export default function FileUpload({ onResumeData }: FileUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];

    // Check file type
    if (!file.type.includes('pdf') && !file.type.includes('word') && !file.name.endsWith('.docx')) {
      setError('Please upload a PDF or DOCX file');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Preparing to upload file:', file.name, 'Size:', file.size, 'Type:', file.type);
      const formData = new FormData();
      formData.append('file', file);

      console.log('Sending request to API...');
      const response = await fetch('/api/parse-resume', {
        method: 'POST',
        body: formData,
      });

      console.log('Response received, status:', response.status);

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Expected JSON response but got ${contentType}`);
      }

      const result = await response.json();
      console.log('Response parsed successfully');

      if (!result.success) {
        throw new Error(result.error || 'Failed to parse resume');
      }

      console.log('Calling onResumeData with parsed data');
      onResumeData(result.data);
    } catch (err) {
      console.error('Error uploading file:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload file');
    } finally {
      setIsLoading(false);
    }
  }, [onResumeData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
          ${isDragActive
            ? 'border-blue-500 bg-blue-50/50 shadow-lg scale-[1.02]'
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30 hover:shadow-md'}
        `}
      >
        <input {...getInputProps()} />

        {isLoading ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-6"
          >
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-medium text-blue-700">Analyzing your resume...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-6"
          >
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <p className="text-lg font-medium text-red-700">Error uploading file</p>
            <p className="text-sm text-gray-600 mt-2 max-w-md">{error}</p>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setError(null);
              }}
              className="mt-4 bg-red-100 text-red-700 hover:bg-red-200 border-none"
            >
              Try Again
            </Button>
          </motion.div>
        ) : (
          <div className="py-6">
            {isDragActive ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center"
              >
                <Upload className="w-16 h-16 text-blue-500 animate-bounce mb-4" />
                <p className="text-xl font-medium text-blue-700">Drop your file here</p>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Drag and drop your resume file here
                </p>
                <p className="text-sm text-gray-500 mb-6">or</p>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Select File
                </Button>
                <p className="mt-6 text-xs text-gray-500">Supported formats: PDF, DOCX (max 10MB)</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
