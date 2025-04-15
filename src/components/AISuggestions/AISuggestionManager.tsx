"use client";

import { useState, useEffect } from "react";
import { ResumeData } from "@/types/resume";
import AISuggestionPanel from "./AISuggestionPanel";
import AISuggestionToast from "./AISuggestionToast";

interface AISuggestionManagerProps {
  resumeData: ResumeData;
  showInitialSuggestions?: boolean;
}

// Define suggestion types
type SuggestionType = "warning" | "improvement" | "tip";

interface Suggestion {
  id: string;
  type: SuggestionType;
  message: string;
  section?: string;
}

export default function AISuggestionManager({
  resumeData,
  showInitialSuggestions = true,
}: AISuggestionManagerProps) {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [toasts, setToasts] = useState<Suggestion[]>([]);
  const [hasShownInitialSuggestions, setHasShownInitialSuggestions] = useState(false);

  // Show initial suggestions when resume data is loaded
  useEffect(() => {
    if (resumeData && showInitialSuggestions && !hasShownInitialSuggestions) {
      // Show a toast with a random tip
      const initialTips = [
        {
          id: "initial-tip-1",
          type: "tip" as SuggestionType,
          message: "Try to keep your resume to one page for most positions.",
        },
        {
          id: "initial-tip-2",
          type: "tip" as SuggestionType,
          message: "Use industry-specific keywords to pass through ATS systems.",
        },
        {
          id: "initial-tip-3",
          type: "improvement" as SuggestionType,
          message: "Quantify your achievements with numbers and percentages for more impact.",
        },
        {
          id: "initial-tip-4",
          type: "tip" as SuggestionType,
          message: "Tailor your resume for each job application for better results.",
        },
      ];

      // Show a random tip
      const randomTip = initialTips[Math.floor(Math.random() * initialTips.length)];
      setToasts([randomTip]);

      // Show panel after a delay
      setTimeout(() => {
        setIsPanelVisible(true);
      }, 2000);

      setHasShownInitialSuggestions(true);
    }
  }, [resumeData, showInitialSuggestions, hasShownInitialSuggestions]);

  // Remove a toast
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Add a new toast
  const addToast = (suggestion: Suggestion) => {
    setToasts((prev) => [...prev, suggestion]);
  };

  // Toggle the suggestion panel
  const togglePanel = () => {
    setIsPanelVisible((prev) => !prev);
  };

  return (
    <>
      {/* Suggestion Panel */}
      <AISuggestionPanel
        resumeData={resumeData}
        visible={isPanelVisible}
        onClose={() => setIsPanelVisible(false)}
      />

      {/* Floating button to open panel */}
      <button
        onClick={togglePanel}
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-colors z-40"
        aria-label="AI Suggestions"
      >
        <svg
          className="w-6 h-6"
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
      </button>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <AISuggestionToast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </>
  );
}
