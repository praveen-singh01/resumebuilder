"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResumeData } from "@/types/resume";

interface ImprovedLinkedInInputProps {
  onResumeData: (data: ResumeData) => void;
}

export default function ImprovedLinkedInInput({
  onResumeData,
}: ImprovedLinkedInInputProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extractionStage, setExtractionStage] = useState<
    "idle" | "connecting" | "extracting" | "processing" | "complete" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Please enter a LinkedIn URL");
      return;
    }

    // Basic validation for LinkedIn URL
    if (!url.includes("linkedin.com/in/")) {
      setError(
        "Please enter a valid LinkedIn profile URL (e.g., https://www.linkedin.com/in/username)"
      );
      return;
    }

    setIsLoading(true);
    setError(null);
    setExtractionStage("connecting");

    try {
      // Simulate the different stages of extraction with delays
      setTimeout(() => setExtractionStage("extracting"), 1000);
      setTimeout(() => setExtractionStage("processing"), 3000);

      const response = await fetch("/api/parse-linkedin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      if (!result.success) {
        setExtractionStage("error");
        throw new Error(result.error || "Failed to parse LinkedIn profile");
      }

      setExtractionStage("complete");
      
      // Wait a moment to show the success state before proceeding
      setTimeout(() => {
        onResumeData(result.data);
      }, 1000);
    } catch (err) {
      console.error("Error parsing LinkedIn profile:", err);
      setError(
        err instanceof Error ? err.message : "Failed to parse LinkedIn profile"
      );
      setExtractionStage("error");
    } finally {
      setIsLoading(false);
    }
  };

  const getExtractionStageText = () => {
    switch (extractionStage) {
      case "connecting":
        return "Connecting to LinkedIn...";
      case "extracting":
        return "Extracting profile data...";
      case "processing":
        return "Processing information...";
      case "complete":
        return "Extraction complete!";
      case "error":
        return "Extraction failed";
      default:
        return "";
    }
  };

  const getExtractionProgress = () => {
    switch (extractionStage) {
      case "connecting":
        return 25;
      case "extracting":
        return 50;
      case "processing":
        return 75;
      case "complete":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.linkedin.com/in/username"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Extract
              </span>
            ) : (
              "Extract Data"
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {getExtractionStageText()}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {getExtractionProgress()}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <motion.div
                    className="bg-blue-500 h-2.5 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${getExtractionProgress()}%` }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        extractionStage === "idle"
                          ? "bg-gray-200 dark:bg-gray-700"
                          : "bg-blue-500"
                      }`}
                    >
                      {extractionStage !== "idle" && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-xs ${
                        extractionStage === "idle"
                          ? "text-gray-500 dark:text-gray-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Connecting to LinkedIn
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        extractionStage === "idle" || extractionStage === "connecting"
                          ? "bg-gray-200 dark:bg-gray-700"
                          : "bg-blue-500"
                      }`}
                    >
                      {extractionStage !== "idle" && extractionStage !== "connecting" && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-xs ${
                        extractionStage === "idle" || extractionStage === "connecting"
                          ? "text-gray-500 dark:text-gray-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Extracting profile data
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        extractionStage === "idle" ||
                        extractionStage === "connecting" ||
                        extractionStage === "extracting"
                          ? "bg-gray-200 dark:bg-gray-700"
                          : "bg-blue-500"
                      }`}
                    >
                      {extractionStage !== "idle" &&
                        extractionStage !== "connecting" &&
                        extractionStage !== "extracting" && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        )}
                    </div>
                    <span
                      className={`text-xs ${
                        extractionStage === "idle" ||
                        extractionStage === "connecting" ||
                        extractionStage === "extracting"
                          ? "text-gray-500 dark:text-gray-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Processing information
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        extractionStage === "complete"
                          ? "bg-green-500"
                          : extractionStage === "error"
                          ? "bg-red-500"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      {extractionStage === "complete" && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      )}
                      {extractionStage === "error" && (
                        <svg
                          className="w-3 h-3 text-white"
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
                      )}
                    </div>
                    <span
                      className={`text-xs ${
                        extractionStage === "complete"
                          ? "text-green-600 dark:text-green-400"
                          : extractionStage === "error"
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {extractionStage === "complete"
                        ? "Extraction complete"
                        : extractionStage === "error"
                        ? "Extraction failed"
                        : "Finalizing"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {error && !isLoading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md"
            >
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
        <p>
          <strong>Pro Tip:</strong> Make sure your LinkedIn profile is public or
          that you're logged in to LinkedIn in another browser tab for best
          results.
        </p>
        <p>
          We'll extract your:
          <span className="flex flex-wrap gap-1 mt-1">
            {["Profile Info", "Work Experience", "Education", "Skills", "Projects"].map(
              (item) => (
                <span
                  key={item}
                  className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  {item}
                </span>
              )
            )}
          </span>
        </p>
      </div>
    </div>
  );
}
