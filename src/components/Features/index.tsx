"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Zap, CheckCircle, Download, Globe } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: 'Professional Templates',
      description: 'Choose from 20+ professional resume templates designed by experts to land interviews.'
    },
    {
      icon: <Upload className="h-8 w-8 text-blue-600" />,
      title: 'Upload Your Resume',
      description: "Already have a resume? Upload it and we will help you improve it."
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: 'Fast and Easy',
      description: 'Build your resume in minutes with our easy-to-use builder.'
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
      title: 'ATS-Friendly',
      description: 'Our resumes are designed to pass Applicant Tracking Systems.'
    },
    {
      icon: <Download className="h-8 w-8 text-blue-600" />,
      title: 'Download as PDF',
      description: 'Download your resume as a PDF file to send to employers.'
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: 'Industry-Specific Content',
      description: 'Get tailored content suggestions based on your industry and job title.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Features that help you win jobs
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Our resume builder has all the tools you need to create a professional resume that will impress employers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 p-3 bg-blue-50 rounded-lg">
                  {feature.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
