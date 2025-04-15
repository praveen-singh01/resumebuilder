"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ResumeData } from "@/types/resume";

// Define template types
export interface ResumeTemplateProps {
  resumeData: ResumeData;
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
}

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
    primaryColor: "#3B82F6",
    secondaryColor: "#93C5FD",
    fontFamily: "Inter, sans-serif",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design with minimal elements",
    previewImage: "/templates/minimal.png",
    primaryColor: "#10B981",
    secondaryColor: "#6EE7B7",
    fontFamily: "Inter, sans-serif",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional resume layout with a timeless appeal",
    previewImage: "/templates/classic.png",
    primaryColor: "#6366F1",
    secondaryColor: "#A5B4FC",
    fontFamily: "Georgia, serif",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold and creative design for standing out",
    previewImage: "/templates/creative.png",
    primaryColor: "#EC4899",
    secondaryColor: "#F9A8D4",
    fontFamily: "Poppins, sans-serif",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Sophisticated design for executive positions",
    previewImage: "/templates/professional.png",
    primaryColor: "#8B5CF6",
    secondaryColor: "#C4B5FD",
    fontFamily: "Montserrat, sans-serif",
  },
  {
    id: "technical",
    name: "Technical",
    description: "Optimized for technical roles and skills",
    previewImage: "/templates/technical.png",
    primaryColor: "#F59E0B",
    secondaryColor: "#FCD34D",
    fontFamily: "Roboto Mono, monospace",
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Refined and sophisticated design with elegant typography",
    previewImage: "/templates/elegant.png",
    primaryColor: "#4B5563",
    secondaryColor: "#9CA3AF",
    fontFamily: "Playfair Display, serif",
  },
  {
    id: "compact",
    name: "Compact",
    description: "Space-efficient design that fits more content on one page",
    previewImage: "/templates/compact.png",
    primaryColor: "#0369A1",
    secondaryColor: "#7DD3FC",
    fontFamily: "Inter, sans-serif",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Premium design for senior executives and leadership roles",
    previewImage: "/templates/executive.png",
    primaryColor: "#1E3A8A",
    secondaryColor: "#BFDBFE",
    fontFamily: "Merriweather, serif",
  },
  {
    id: "contemporary",
    name: "Contemporary",
    description: "Modern and trendy design with a unique layout",
    previewImage: "/templates/contemporary.png",
    primaryColor: "#059669",
    secondaryColor: "#A7F3D0",
    fontFamily: "Poppins, sans-serif",
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
  const [currentPage, setCurrentPage] = useState(0);
  const templatesPerPage = 4;
  const totalPages = Math.ceil(templates.length / templatesPerPage);

  const currentTemplates = templates.slice(
    currentPage * templatesPerPage,
    (currentPage + 1) * templatesPerPage
  );

  const changePage = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const placeholderImage = (primaryColor: string) => (
    <div
      className="w-full h-full flex items-center justify-center rounded-t-lg"
      style={{ backgroundColor: `${primaryColor}20` }}
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

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Choose a Template</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {currentTemplates.map((template) => (
          <motion.div
            key={template.id}
            className="flex-shrink-0 w-full snap-center"
            style={{
              borderRadius: "0.5rem",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
            initial={{ scale: 0.95, opacity: 0.8 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => setHoveredTemplate(template.id)}
            onMouseLeave={() => setHoveredTemplate(null)}
          >
            <div className="bg-white rounded-lg overflow-hidden h-full">
              <div className="relative h-80 bg-gray-50">
                {template.previewImage ? (
                  <Image
                    src={template.previewImage}
                    alt={template.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-t-lg"
                    onError={() => console.error("Error loading image")}
                  />
                ) : (
                  placeholderImage(template.primaryColor)
                )}

                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 rounded-t-lg"
                  animate={{
                    opacity: hoveredTemplate === template.id ? 1 : 0,
                  }}
                >
                  <button
                    onClick={() => onSelectTemplate(template)}
                    className="px-4 py-2 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 transition-colors"
                  >
                    Preview
                  </button>
                </motion.div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg">{template.name}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {template.description}
                </p>

                <div className="mt-4 flex justify-between items-center">
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
                    className="px-3 py-1 text-sm rounded-md text-white"
                    style={{ backgroundColor: template.primaryColor }}
                  >
                    {selectedTemplateId === template.id ? "Selected" : "Select"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => changePage(index)}
              className={`w-8 h-8 rounded-full ${
                currentPage === index
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
