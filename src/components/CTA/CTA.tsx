"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold sm:text-4xl"
          >
            Ready to land your dream job?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-blue-100"
          >
            Join millions of job seekers who have created professional resumes with our easy-to-use builder.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/auth/login?redirectUrl=/app/create-resume"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              Create my resume
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/resume-templates"
              className="bg-blue-700 text-white hover:bg-blue-800 px-8 py-3 rounded-lg font-medium transition-colors duration-200 border border-blue-500 shadow-lg hover:shadow-xl"
            >
              Browse templates
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-sm text-blue-200"
          >
            No credit card required. Free to get started.
          </motion.div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/3 w-56 h-56 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
      </div>
    </section>
  );
};

export default CTA;
