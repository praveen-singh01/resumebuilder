"use client";

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Globe, FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and social media */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-white mr-2" />
                <span className="font-bold text-white text-xl">Resume</span>
                <span className="font-bold text-blue-300 text-xl">Builder</span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-gray-400 max-w-md">
              Our professional resume builder helps you create a standout resume that will impress employers. Get hired faster with our easy-to-use tools.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">YouTube</span>
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Resume */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resume</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/resume-templates" className="text-gray-400 hover:text-white transition-colors">
                  Resume Templates
                </Link>
              </li>
              <li>
                <Link href="/resume-examples" className="text-gray-400 hover:text-white transition-colors">
                  Resume Examples
                </Link>
              </li>
              <li>
                <Link href="/app/create-resume" className="text-gray-400 hover:text-white transition-colors">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/resume-tips" className="text-gray-400 hover:text-white transition-colors">
                  Resume Writing Tips
                </Link>
              </li>
              <li>
                <Link href="/resume-formats" className="text-gray-400 hover:text-white transition-colors">
                  Resume Formats
                </Link>
              </li>
            </ul>
          </div>

          {/* Cover Letter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Cover Letter</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/cover-letter-templates" className="text-gray-400 hover:text-white transition-colors">
                  Cover Letter Templates
                </Link>
              </li>
              <li>
                <Link href="/cover-letter-examples" className="text-gray-400 hover:text-white transition-colors">
                  Cover Letter Examples
                </Link>
              </li>
              <li>
                <Link href="/app/create-cover-letter" className="text-gray-400 hover:text-white transition-colors">
                  Cover Letter Builder
                </Link>
              </li>
              <li>
                <Link href="/cover-letter-tips" className="text-gray-400 hover:text-white transition-colors">
                  Cover Letter Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/career-advice" className="text-gray-400 hover:text-white transition-colors">
                  Career Advice
                </Link>
              </li>
              <li>
                <Link href="/job-interview" className="text-gray-400 hover:text-white transition-colors">
                  Job Interview
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Language selector and copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Globe className="h-5 w-5 text-gray-400 mr-2" />
            <select className="bg-gray-800 text-gray-300 rounded-md py-1 px-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
            </select>
          </div>

          <div className="text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Resume Builder. All rights reserved.</p>
          </div>
        </div>

        {/* Legal links */}
        <div className="mt-6 text-sm text-gray-500 flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
          <Link href="/terms" className="hover:text-gray-300 transition-colors">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:text-gray-300 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/cookies" className="hover:text-gray-300 transition-colors">
            Cookie Policy
          </Link>
          <Link href="/accessibility" className="hover:text-gray-300 transition-colors">
            Accessibility
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
