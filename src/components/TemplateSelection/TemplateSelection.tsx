"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Define template types
export type ResumeTemplate = {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
};

// Sample templates
const templates: ResumeTemplate[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and professional design with a modern touch",
    previewImage: "/templates/modern.png",
    primaryColor: "#3B82F6", // blue-500
    secondaryColor: "#93C5FD", // blue-300
    fontFamily: "Inter, sans-serif",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design with minimal elements",
    previewImage: "/templates/minimal.png",
    primaryColor: "#10B981", // emerald-500
    secondaryColor: "#6EE7B7", // emerald-300
    fontFamily: "Inter, sans-serif",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional resume layout with a timeless appeal",
    previewImage: "/templates/classic.png",
    primaryColor: "#6366F1", // indigo-500
    secondaryColor: "#A5B4FC", // indigo-300
    fontFamily: "Georgia, serif",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold and creative design for standing out",
    previewImage: "/templates/creative.png",
    primaryColor: "#EC4899", // pink-500
    secondaryColor: "#F9A8D4", // pink-300
    fontFamily: "Poppins, sans-serif",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Sophisticated design for executive positions",
    previewImage: "/templates/professional.png",
    primaryColor: "#8B5CF6", // violet-500
    secondaryColor: "#C4B5FD", // violet-300
    fontFamily: "Montserrat, sans-serif",
  },
  {
    id: "technical",
    name: "Technical",
    description: "Optimized for technical roles and skills",
    previewImage: "/templates/technical.png",
    primaryColor: "#F59E0B", // amber-500
    secondaryColor: "#FCD34D", // amber-300
    fontFamily: "Roboto Mono, monospace",
  },
];

interface TemplateSelectionProps {
  onSelectTemplate: (template: ResumeTemplate) => void;
  selectedTemplateId: string;
}

export default function TemplateSelection({
  onSelectTemplate,
  selectedTemplateId,
}: TemplateSelectionProps) {
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Handle scroll buttons
  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Placeholder for missing images
  const placeholderImage = (_templateId: string, primaryColor: string) => {
    return (
      <div
        className="w-full h-full flex items-center justify-center rounded-t-lg"
        style={{ backgroundColor: primaryColor + "20" }} // Using primary color with opacity
      >
        <div className="text-center p-4">
          <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
          <div className="w-3/4 h-4 bg-gray-200 rounded mb-4 mx-auto"></div>

          <div className="flex flex-col space-y-2">
            <div className="w-full h-2 bg-gray-200 rounded"></div>
            <div className="w-full h-2 bg-gray-200 rounded"></div>
            <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1 justify-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-12 h-2 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Choose a Template</h2>

      <div className="relative">
        {/* Left scroll button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Template carousel */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto pb-6 px-12 hide-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {templates.map((template) => (
            <motion.div
              key={template.id}
              className={`flex-shrink-0 w-64 mx-3 snap-center ${
                selectedTemplateId === template.id ? "ring-2 ring-offset-2" : ""
              }`}
              style={{
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                border: selectedTemplateId === template.id ? `2px solid ${template.primaryColor}` : 'none'
              }}
              initial={{ scale: 0.95, opacity: 0.8 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              <div className="bg-white rounded-lg overflow-hidden h-full">
                {/* Template preview */}
                <div className="relative h-80 bg-gray-50">
                  {template.previewImage ? (
                    <Image
                      src={template.previewImage}
                      alt={template.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-t-lg"
                      onError={() => console.log(`Error loading image for ${template.id}`)}
                    />
                  ) : (
                    placeholderImage(template.id, template.primaryColor)
                  )}

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity rounded-t-lg"
                    animate={{ opacity: hoveredTemplate === template.id ? 1 : 0 }}
                  >
                    <button
                      onClick={() => onSelectTemplate(template)}
                      className="px-4 py-2 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 transition-colors"
                    >
                      Preview
                    </button>
                  </motion.div>
                </div>

                {/* Template info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg">{template.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{template.description}</p>

                  <div className="mt-4 flex justify-between items-center">
                    {/* Color preview */}
                    <div className="flex space-x-2">
                      <div
                        className="w-5 h-5 rounded-full"
                        style={{ backgroundColor: template.primaryColor }}
                      ></div>
                      <div
                        className="w-5 h-5 rounded-full"
                        style={{ backgroundColor: template.secondaryColor }}
                      ></div>
                    </div>

                    <button
                      onClick={() => onSelectTemplate(template)}
                      className="px-3 py-1 text-sm rounded-md"
                      style={{
                        backgroundColor: template.primaryColor,
                        color: "white"
                      }}
                    >
                      {selectedTemplateId === template.id ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right scroll button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Add custom CSS for hiding scrollbar */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}



