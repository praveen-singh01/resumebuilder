"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResumeData } from "@/types/resume";

interface AISuggestionPanelProps {
  resumeData: ResumeData;
  visible: boolean;
  onClose: () => void;
}

// Define suggestion types
type SuggestionType = "warning" | "improvement" | "tip";

interface Suggestion {
  id: string;
  type: SuggestionType;
  message: string;
  section?: string;
}

export default function AISuggestionPanel({
  resumeData,
  visible,
  onClose,
}: AISuggestionPanelProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [dismissedSuggestions, setDismissedSuggestions] = useState<string[]>([]);

  // Generate suggestions based on resume data
  useEffect(() => {
    if (!resumeData) return;

    const newSuggestions: Suggestion[] = [];

    // Check summary length
    if (!resumeData.summary || resumeData.summary.length < 50) {
      newSuggestions.push({
        id: "summary-length",
        type: "warning",
        message: "Your summary is too short. Aim for 3-5 sentences that highlight your expertise and career goals.",
        section: "summary",
      });
    } else if (resumeData.summary.length > 500) {
      newSuggestions.push({
        id: "summary-too-long",
        type: "warning",
        message: "Your summary is quite long. Consider condensing it to 3-5 impactful sentences.",
        section: "summary",
      });
    }

    // Check for skills
    if (!resumeData.skills || resumeData.skills.length < 5) {
      newSuggestions.push({
        id: "skills-few",
        type: "improvement",
        message: "Add more relevant skills to increase keyword matches with job descriptions.",
        section: "skills",
      });
    }

    // Check work experience descriptions
    if (resumeData.workExperience && resumeData.workExperience.length > 0) {
      const hasShortDescriptions = resumeData.workExperience.some(
        (exp) => !exp.description || exp.description.length < 100
      );

      if (hasShortDescriptions) {
        newSuggestions.push({
          id: "work-descriptions",
          type: "improvement",
          message: "Expand your work experience descriptions with specific achievements and metrics.",
          section: "experience",
        });
      }

      // Check for action verbs in work descriptions
      const actionVerbs = ["led", "managed", "created", "developed", "implemented", "achieved", "increased", "reduced", "improved"];
      const hasActionVerbs = resumeData.workExperience.some((exp) => {
        if (!exp.description) return false;
        return actionVerbs.some((verb) => exp.description.toLowerCase().includes(verb));
      });

      if (!hasActionVerbs) {
        newSuggestions.push({
          id: "action-verbs",
          type: "tip",
          message: "Use strong action verbs like 'achieved', 'led', or 'implemented' in your work descriptions.",
          section: "experience",
        });
      }
    }

    // Check education details
    if (resumeData.education && resumeData.education.length > 0) {
      const missingDegreeDetails = resumeData.education.some(
        (edu) => !edu.degree || edu.degree.length < 5
      );

      if (missingDegreeDetails) {
        newSuggestions.push({
          id: "education-details",
          type: "improvement",
          message: "Add more details to your education entries, including full degree names and relevant coursework.",
          section: "education",
        });
      }
    }

    // General tips
    newSuggestions.push({
      id: "keywords-tip",
      type: "tip",
      message: "Tailor your resume with keywords from the job description to pass through ATS systems.",
    });

    newSuggestions.push({
      id: "quantify-tip",
      type: "tip",
      message: "Quantify your achievements with numbers and percentages whenever possible.",
    });

    // Filter out dismissed suggestions
    const filteredSuggestions = newSuggestions.filter(
      (suggestion) => !dismissedSuggestions.includes(suggestion.id)
    );

    setSuggestions(filteredSuggestions);
  }, [resumeData, dismissedSuggestions]);

  // Dismiss a single suggestion
  const dismissSuggestion = (id: string) => {
    setDismissedSuggestions((prev) => [...prev, id]);
  };

  // Get icon based on suggestion type
  const getSuggestionIcon = (type: SuggestionType) => {
    switch (type) {
      case "warning":
        return (
          <svg
            className="w-5 h-5 text-amber-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
        );
      case "improvement":
        return (
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        );
      case "tip":
        return (
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            ></path>
          </svg>
        );
      default:
        return null;
    }
  };

  // Get background color based on suggestion type
  const getSuggestionBgColor = (type: SuggestionType) => {
    switch (type) {
      case "warning":
        return "bg-amber-50 dark:bg-amber-900/20";
      case "improvement":
        return "bg-blue-50 dark:bg-blue-900/20";
      case "tip":
        return "bg-green-50 dark:bg-green-900/20";
      default:
        return "bg-gray-50 dark:bg-gray-800";
    }
  };

  // Panel animation variants
  const panelVariants = {
    hidden: { opacity: 0, x: 300 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    exit: { 
      opacity: 0, 
      x: 300,
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  // Suggestion item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.3
      }
    }),
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { 
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-lg z-50 overflow-y-auto"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              <h2 className="text-lg font-semibold">AI Suggestions</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close panel"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          {/* Suggestions */}
          <div className="p-4">
            {suggestions.length > 0 ? (
              <AnimatePresence>
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.id}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`mb-3 p-3 rounded-lg ${getSuggestionBgColor(
                      suggestion.type
                    )} relative`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getSuggestionIcon(suggestion.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          {suggestion.message}
                        </p>
                        {suggestion.section && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 inline-block">
                            Section: {suggestion.section}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => dismissSuggestion(suggestion.id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      aria-label="Dismiss suggestion"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="text-center py-8">
                <svg
                  className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <p className="text-gray-500 dark:text-gray-400">
                  No suggestions at the moment. Your resume looks great!
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              Got it
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
