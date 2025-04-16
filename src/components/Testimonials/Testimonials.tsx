"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, User } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'Marketing Manager',
    company: 'Tech Solutions Inc.',
    image: '/images/testimonials/sarah.jpg',
    rating: 5,
    text: 'I was struggling to get interviews until I used this resume builder. Within a week of sending out my new resume, I got 3 interview calls! The templates are professional and the AI suggestions helped me highlight my achievements effectively.'
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Software Developer',
    company: 'Innovate Labs',
    image: '/images/testimonials/michael.jpg',
    rating: 5,
    text: 'As a developer, I wanted a clean, ATS-friendly resume that would showcase my technical skills. This builder delivered exactly what I needed. The ATS optimization feature gave me confidence that my resume would pass through automated systems.'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'HR Specialist',
    company: 'Global Enterprises',
    image: '/images/testimonials/emily.jpg',
    rating: 5,
    text: 'As someone who reviews resumes daily, I can say that the templates from this builder stand out. I was so impressed that I used it for my own resume update. The process was intuitive and the result was professional.'
  },
  {
    id: 4,
    name: 'David Wilson',
    position: 'Financial Analyst',
    company: 'Capital Investments',
    image: '/images/testimonials/david.jpg',
    rating: 5,
    text: 'The resume builder helped me quantify my achievements with specific metrics. The industry-specific suggestions were spot on for finance. I secured a position with a 15% higher salary than my previous job!'
  },
  {
    id: 5,
    name: 'Priya Patel',
    position: 'UX Designer',
    company: 'Creative Digital',
    image: '/images/testimonials/priya.jpg',
    rating: 5,
    text: 'The creative templates were perfect for showcasing my design portfolio. I appreciated how I could customize the layout while maintaining a professional look. The download options made it easy to share my resume in different formats.'
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            What our users say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Join thousands of job seekers who have successfully landed their dream jobs using our resume builder.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-blue-100 flex items-center justify-center">
                    <User className="h-12 w-12 text-blue-500" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-2">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl text-gray-700 italic mb-6">
                    "{testimonials[activeIndex].text}"
                  </p>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{testimonials[activeIndex].name}</h4>
                    <p className="text-gray-600">
                      {testimonials[activeIndex].position}, {testimonials[activeIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-blue-600">4.8/5</div>
            <div className="mt-2 text-gray-600">Average rating</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-blue-600">10M+</div>
            <div className="mt-2 text-gray-600">Resumes created</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-blue-600">150+</div>
            <div className="mt-2 text-gray-600">Countries</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-blue-600">65%</div>
            <div className="mt-2 text-gray-600">Interview success rate</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
