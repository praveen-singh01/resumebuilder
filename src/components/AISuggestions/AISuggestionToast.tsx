"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  type?: "warning" | "improvement" | "tip";
  duration?: number;
  onClose: () => void;
}

export default function AISuggestionToast({
  message,
  type = "tip",
  duration = 5000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Allow exit animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Get icon based on suggestion type
  const getIcon = () => {
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
  const getBgColor = () => {
    switch (type) {
      case "warning":
        return "bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800";
      case "improvement":
        return "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800";
      case "tip":
        return "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800";
      default:
        return "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700";
    }
  };

  // Toast animation variants
  const toastVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      transition: { 
        duration: 0.2 
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed bottom-4 right-4 max-w-sm p-4 rounded-lg shadow-lg border ${getBgColor()} z-50`}
          variants={toastVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              {getIcon()}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                {message}
              </p>
            </div>
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Close"
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
