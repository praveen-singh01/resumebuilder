"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, FileText } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-blue-600 mr-2" />
                <span className="font-bold text-gray-900 text-xl">Resume</span>
                <span className="font-bold text-blue-600 text-xl">Builder</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {/* Resume Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Resume
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <div className="grid grid-cols-1 gap-2 p-2">
                  <DropdownMenuItem asChild>
                    <Link href="/resume-templates" className="flex flex-col">
                      <span className="font-medium">Resume Templates</span>
                      <span className="text-xs text-gray-500">Professional designs for your resume</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/resume-examples" className="flex flex-col">
                      <span className="font-medium">Resume Examples</span>
                      <span className="text-xs text-gray-500">Examples by industry and job title</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/app/create-resume" className="flex flex-col">
                      <span className="font-medium">Resume Builder</span>
                      <span className="text-xs text-gray-500">Create a resume in minutes</span>
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cover Letter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Cover Letter
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <div className="grid grid-cols-1 gap-2 p-2">
                  <DropdownMenuItem asChild>
                    <Link href="/cover-letter-templates" className="flex flex-col">
                      <span className="font-medium">Cover Letter Templates</span>
                      <span className="text-xs text-gray-500">Professional templates</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/cover-letter-examples" className="flex flex-col">
                      <span className="font-medium">Cover Letter Examples</span>
                      <span className="text-xs text-gray-500">Industry-specific examples</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/app/create-cover-letter" className="flex flex-col">
                      <span className="font-medium">Cover Letter Builder</span>
                      <span className="text-xs text-gray-500">Create a cover letter in minutes</span>
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CV Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                CV
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <div className="grid grid-cols-1 gap-2 p-2">
                  <DropdownMenuItem asChild>
                    <Link href="/cv-templates" className="flex flex-col">
                      <span className="font-medium">CV Templates</span>
                      <span className="text-xs text-gray-500">Professional CV templates</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/cv-examples" className="flex flex-col">
                      <span className="font-medium">CV Examples</span>
                      <span className="text-xs text-gray-500">Industry-specific examples</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/app/create-cv" className="flex flex-col">
                      <span className="font-medium">CV Builder</span>
                      <span className="text-xs text-gray-500">Create a CV in minutes</span>
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Blog Link */}
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Blog
            </Link>

            {/* Pricing Link */}
            <Link href="/pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Pricing
            </Link>
          </nav>

          {/* Account and Build Resume Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/signin" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              My Account
            </Link>
            <Link href="/app/create-resume" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg">
              Build my resume
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="py-2">
              <button className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">
                Resume
              </button>
              <div className="pl-6 space-y-1 mt-1">
                <Link href="/resume-templates" className="block px-3 py-1 text-sm text-gray-600 hover:text-blue-600 rounded-md">
                  Resume Templates
                </Link>
                <Link href="/resume-examples" className="block px-3 py-1 text-sm text-gray-600 hover:text-blue-600 rounded-md">
                  Resume Examples
                </Link>
                <Link href="/app/create-resume" className="block px-3 py-1 text-sm text-gray-600 hover:text-blue-600 rounded-md">
                  Resume Builder
                </Link>
              </div>
            </div>

            <div className="py-2">
              <button className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">
                Cover Letter
              </button>
              <div className="pl-6 space-y-1 mt-1">
                <Link href="/cover-letter-templates" className="block px-3 py-1 text-sm text-gray-600 hover:text-blue-600 rounded-md">
                  Cover Letter Templates
                </Link>
                <Link href="/cover-letter-examples" className="block px-3 py-1 text-sm text-gray-600 hover:text-blue-600 rounded-md">
                  Cover Letter Examples
                </Link>
                <Link href="/app/create-cover-letter" className="block px-3 py-1 text-sm text-gray-600 hover:text-blue-600 rounded-md">
                  Cover Letter Builder
                </Link>
              </div>
            </div>

            <div className="py-2">
              <button className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">
                CV
              </button>
              <div className="pl-6 space-y-1 mt-1">
                <Link href="/cv-templates" className="block px-3 py-1 text-sm text-gray-600 hover:text-blue-600 rounded-md">
                  CV Templates
                </Link>
                <Link href="/cv-examples" className="block px-3 py-1 text-sm text-gray-600 hover:text-blue-600 rounded-md">
                  CV Examples
                </Link>
                <Link href="/app/create-cv" className="block px-3 py-1 text-sm text-gray-600 hover:text-blue-600 rounded-md">
                  CV Builder
                </Link>
              </div>
            </div>

            <Link href="/blog" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">
              Blog
            </Link>

            <Link href="/pricing" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">
              Pricing
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <Link href="/auth/signin" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">
                  My Account
                </Link>
              </div>
            </div>
            <div className="mt-3 px-5">
              <Link href="/app/create-resume" className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-center hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg">
                Build my resume
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
