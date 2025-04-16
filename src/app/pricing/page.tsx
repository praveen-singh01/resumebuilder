"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, X, HelpCircle } from 'lucide-react';

// UI Components
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      description: 'Basic resume creation',
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: [
        { name: 'Create 1 resume', included: true },
        { name: 'Limited templates', included: true },
        { name: 'Download as PDF', included: true },
        { name: 'Basic customization', included: true },
        { name: 'Cover letter creation', included: false },
        { name: 'Multiple download formats', included: false },
        { name: 'Premium templates', included: false },
        { name: 'Resume analytics', included: false },
        { name: 'Priority support', included: false },
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Premium',
      description: 'For job seekers who want to stand out',
      price: {
        monthly: 7.95,
        yearly: 5.95,
      },
      features: [
        { name: 'Create unlimited resumes', included: true },
        { name: 'All templates', included: true },
        { name: 'Download as PDF, DOCX, TXT', included: true },
        { name: 'Advanced customization', included: true },
        { name: 'Cover letter creation', included: true },
        { name: 'Multiple download formats', included: true },
        { name: 'Premium templates', included: true },
        { name: 'Resume analytics', included: true },
        { name: 'Priority support', included: false },
      ],
      cta: 'Get Premium',
      popular: true,
    },
    {
      name: 'Ultimate',
      description: 'For professionals seeking the best tools',
      price: {
        monthly: 12.95,
        yearly: 9.95,
      },
      features: [
        { name: 'Create unlimited resumes', included: true },
        { name: 'All templates', included: true },
        { name: 'Download as PDF, DOCX, TXT', included: true },
        { name: 'Advanced customization', included: true },
        { name: 'Cover letter creation', included: true },
        { name: 'Multiple download formats', included: true },
        { name: 'Premium templates', included: true },
        { name: 'Resume analytics', included: true },
        { name: 'Priority support', included: true },
      ],
      cta: 'Get Ultimate',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works best for you. All plans include a 14-day money-back guarantee.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1 shadow-sm inline-flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Yearly <span className="text-green-500 font-bold">Save 25%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-md overflow-hidden ${
                plan.popular ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-blue-500 text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-gray-500 mt-1">{plan.description}</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${plan.price[billingCycle]}
                  </span>
                  <span className="ml-1 text-xl font-medium text-gray-500">
                    /{billingCycle === 'monthly' ? 'mo' : 'mo (billed annually)'}
                  </span>
                </div>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mt-0.5 mr-2 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.name}
                      </span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-gray-400 ml-1 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-64 text-sm">
                              {feature.name === 'Create unlimited resumes'
                                ? 'Create as many resumes as you need for different job applications.'
                                : feature.name === 'Resume analytics'
                                ? 'Get insights on how your resume performs with employers.'
                                : `Details about ${feature.name.toLowerCase()}.`}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    className={`w-full py-2 px-4 rounded-lg font-medium ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                        : plan.name === 'Free'
                        ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        : 'bg-white border border-blue-600 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold mb-3">Can I cancel my subscription?</h3>
              <p className="text-gray-600">Yes, you can cancel your subscription at any time. If you cancel within 14 days of your initial purchase, you'll receive a full refund.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold mb-3">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, PayPal, and Apple Pay.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold mb-3">Can I switch plans?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, the new rate will apply at the start of your next billing cycle.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold mb-3">Is my payment information secure?</h3>
              <p className="text-gray-600">Yes, we use industry-standard encryption to protect your payment information. We never store your full credit card details on our servers.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to create your professional resume?</h2>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
            Join millions of job seekers who have successfully landed their dream jobs with our resume builder.
          </p>
          <Link 
            href="/app/create-resume" 
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-lg"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
