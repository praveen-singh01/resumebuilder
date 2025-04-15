"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { ResumeData } from "@/types/resume";

// We'll need to download these JSON files and place them in the public/animations directory
const uploadingAnimation = "/animations/uploading.json";
const successAnimation = "/animations/success.json";
const errorAnimation = "/animations/error.json";

interface FileUploadProps {
  onResumeData: (data: ResumeData) => void;
}

type UploadStatus = "idle" | "uploading" | "success" | "error";

export default function FileUpload({ onResumeData }: FileUploadProps) {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Simulate progress when uploading
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (uploadStatus === "uploading") {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 5;
          if (newProgress >= 95) {
            clearInterval(interval);
            return 95; // We'll set it to 100 when the actual upload completes
          }
          return newProgress;
        });
      }, 100);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [uploadStatus]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setFileName(file.name);
    
    // Check file type
    if (!file.type.includes("pdf") && !file.type.includes("word") && !file.name.endsWith(".docx")) {
      setError("Please upload a PDF or DOCX file");
      setUploadStatus("error");
      return;
    }

    setUploadStatus("uploading");
    setProgress(0);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to parse resume");
      }

      setProgress(100);
      setUploadStatus("success");
      
      // Wait a moment to show the success animation before proceeding
      setTimeout(() => {
        onResumeData(result.data);
      }, 1500);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError(err instanceof Error ? err.message : "Failed to upload file");
      setUploadStatus("error");
    }
  }, [onResumeData]);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
    disabled: uploadStatus === "uploading",
  });

  // Reset the upload state
  const handleReset = () => {
    setUploadStatus("idle");
    setFileName(null);
    setProgress(0);
    setError(null);
  };

  // Get border color based on drag state
  const getBorderColor = () => {
    if (isDragAccept) return "border-green-500";
    if (isDragReject) return "border-red-500";
    if (isDragActive) return "border-blue-500";
    return "border-gray-300";
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {uploadStatus === "idle" && (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${getBorderColor()} hover:bg-gray-50 dark:hover:bg-gray-800`}
            >
              <input {...getInputProps()} />
              
              <motion.div
                animate={isDragActive ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                </div>
                
                <div>
                  <p className="text-lg font-medium">
                    {isDragActive
                      ? "Drop your resume file here..."
                      : "Drag & drop your resume file here"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    or <span className="text-blue-500">browse files</span>
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    Supports PDF, DOCX (max 10MB)
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {uploadStatus === "uploading" && (
          <motion.div
            key="uploading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
          >
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 mb-4">
                {/* Replace with actual Lottie animation */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-2">Processing your resume...</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {fileName && `Analyzing ${fileName}`}
              </p>
              
              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {progress}% complete
              </p>
            </div>
          </motion.div>
        )}

        {uploadStatus === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
          >
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 mb-4">
                {/* Replace with actual Lottie animation */}
                <div className="w-full h-full flex items-center justify-center text-green-500">
                  <svg
                    className="w-16 h-16"
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
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-2">Resume Processed Successfully!</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Your resume data has been extracted and is ready for editing.
              </p>
              
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Upload Another File
              </button>
            </div>
          </motion.div>
        )}

        {uploadStatus === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
          >
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 mb-4">
                {/* Replace with actual Lottie animation */}
                <div className="w-full h-full flex items-center justify-center text-red-500">
                  <svg
                    className="w-16 h-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-2">Oops! Something went wrong</h3>
              <p className="text-sm text-red-500 mb-4">
                {error || "Failed to process your resume. Please try again."}
              </p>
              
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
