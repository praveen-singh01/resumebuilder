"use client";

import { useState } from 'react';
import { ResumeData } from '@/types/resume';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LinkedInInputProps {
  onResumeData: (data: ResumeData) => void;
}

export default function LinkedInInput({ onResumeData }: LinkedInInputProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setError('Please enter a LinkedIn URL');
      return;
    }

    // Basic validation for LinkedIn URL
    if (!url.includes('linkedin.com/in/')) {
      setError('Please enter a valid LinkedIn profile URL (e.g., https://www.linkedin.com/in/username)');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/parse-linkedin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to parse LinkedIn profile');
      }

      onResumeData(result.data);
    } catch (err) {
      console.error('Error parsing LinkedIn profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to parse LinkedIn profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center py-8"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium text-blue-700">Extracting profile data...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="linkedin-url" className="text-sm font-medium text-gray-700">
              LinkedIn Profile URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="linkedin-url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.linkedin.com/in/username"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
            </div>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start mt-2 text-red-600 text-sm"
              >
                <AlertCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg w-full md:w-auto"
              disabled={isLoading}
            >
              Extract Profile Data <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500 mt-4">
            <p>We'll extract your experience, skills, and education from your LinkedIn profile.</p>
          </div>
        </form>
      )}
    </div>
  );
}
