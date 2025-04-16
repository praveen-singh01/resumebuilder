"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 pt-16 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Write your story with the</span>
                <span className="block text-blue-600">ultimate resume builder</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Only 2% of resumes win. Yours will be one of them. Let's build you a resume that works.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link href="/auth/login?redirectUrl=/app/create-resume" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium text-center hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg">
                  Create my resume
                </Link>
                <Link href="/auth/login?redirectUrl=/app/upload-resume" className="w-full sm:w-auto bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-lg font-medium text-center hover:bg-gray-50 transition-all duration-200">
                  Upload my resume
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">39%</div>
                  <div className="mt-1 text-sm text-gray-600">more likely to get hired</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">8%</div>
                  <div className="mt-1 text-sm text-gray-600">better pay with your next job</div>
                </div>
                <div className="text-center col-span-2 sm:col-span-1">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-3xl font-bold text-blue-600">36,869</span>
                  </div>
                  <div className="mt-1 text-sm text-gray-600">resumes created today</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 lg:mt-0 lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full overflow-hidden rounded-lg bg-gradient-to-b from-blue-50 to-indigo-50 p-8 aspect-[3/4]">
                  <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
                    <span className="text-sm font-medium">Professional Resume</span>
                  </div>

                  <div className="h-full flex flex-col">
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <FileText className="h-20 w-20 text-blue-500 mb-4" />
                      <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="w-3/4 h-4 bg-gray-200 rounded mb-6"></div>

                      <div className="w-full h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="w-full h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="w-3/4 h-3 bg-gray-200 rounded mb-6"></div>

                      <div className="w-full h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="w-full h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>

              {/* Floating elements for visual interest */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full opacity-70 blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-100 rounded-full opacity-70 blur-xl"></div>
            </motion.div>
          </div>
        </div>

        {/* Trusted by section */}
        <div className="mt-20">
          <p className="text-center text-sm font-medium text-gray-500 mb-6">
            Our candidates have been hired at:
          </p>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
            <span className="text-gray-500 font-medium">Booking.com</span>
            <span className="text-gray-500 font-medium">Apple</span>
            <span className="text-gray-500 font-medium">Amazon</span>
            <span className="text-gray-500 font-medium">Google</span>
            <span className="text-gray-500 font-medium">Microsoft</span>
            <span className="text-gray-500 font-medium">Accenture</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
