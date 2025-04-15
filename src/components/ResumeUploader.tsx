import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Sparkles } from './ui/sparkles';
import { MovingBorder } from './ui/moving-border';
import { ResumeData } from '@/types/resume';

interface ResumeUploaderProps {
  onResumeData: (data: ResumeData) => void;
}

export default function ResumeUploader({ onResumeData }: ResumeUploaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    
    // Check file type
    if (!file.type.includes('pdf') && !file.type.includes('word') && !file.name.endsWith('.docx')) {
      setError('Please upload a PDF or DOCX file');
      return;
    }

    setFileName(file.name);
    setIsLoading(true);
    setError(null);
    setSuccess(false);

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
      setSuccess(true);
      onResumeData(result.data);
    } catch (err) {
      console.error('Error uploading file:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload file');
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  }, [onResumeData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Sparkles className="w-full">
        <MovingBorder className="p-1">
          <Card className={`w-full ${isDragActive ? 'bg-primary/5' : ''}`}>
            <CardContent className="p-6">
              <div
                {...getRootProps()}
                className={`
                  flex flex-col items-center justify-center w-full p-8 
                  border-2 border-dashed rounded-lg cursor-pointer
                  transition-all duration-200 ease-in-out
                  ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'}
                `}
              >
                <input {...getInputProps()} />
                
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-500">Analyzing your resume...</p>
                  </div>
                ) : success ? (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center space-y-4"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500" />
                    <p className="text-lg font-medium text-green-600">Resume uploaded successfully!</p>
                    {fileName && <p className="text-sm text-gray-500">{fileName}</p>}
                    <Button 
                      variant="outline" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSuccess(false);
                        setFileName(null);
                      }}
                    >
                      Upload another file
                    </Button>
                  </motion.div>
                ) : error ? (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center space-y-4"
                  >
                    <AlertCircle className="w-16 h-16 text-red-500" />
                    <p className="text-lg font-medium text-red-600">Error uploading file</p>
                    <p className="text-sm text-gray-500">{error}</p>
                    <Button 
                      variant="outline" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setError(null);
                      }}
                    >
                      Try again
                    </Button>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-4">
                    {isDragActive ? (
                      <Upload className="w-16 h-16 text-primary animate-bounce" />
                    ) : (
                      <FileText className="w-16 h-16 text-gray-400" />
                    )}
                    <div className="flex flex-col items-center justify-center space-y-1">
                      <p className="text-lg font-medium">
                        {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
                      </p>
                      <p className="text-sm text-gray-500">
                        Drag and drop your resume file here, or click to select a file
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Supported formats: PDF, DOCX
                      </p>
                    </div>
                    <Button variant="gradient" className="mt-4">
                      Select File
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </MovingBorder>
      </Sparkles>
    </div>
  );
}
