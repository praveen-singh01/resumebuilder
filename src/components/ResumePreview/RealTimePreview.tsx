"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ResumeData } from "@/types/resume";

interface RealTimePreviewProps {
  resumeData: ResumeData;
}

export default function RealTimePreview({ resumeData }: RealTimePreviewProps) {
  // Track which sections have been updated to animate them
  const [animateSections, setAnimateSections] = useState({
    personal: false,
    skills: false,
    experience: false,
    education: false,
    projects: false,
    certifications: false,
    languages: false,
  });

  // Track previous data to detect changes
  const [prevData, setPrevData] = useState<ResumeData | null>(null);

  // Check which sections have changed and need animation
  useEffect(() => {
    if (!prevData) {
      setPrevData(resumeData);
      return;
    }

    const updatedSections = {
      personal: 
        prevData.fullName !== resumeData.fullName ||
        prevData.email !== resumeData.email ||
        prevData.phone !== resumeData.phone ||
        prevData.linkedinUrl !== resumeData.linkedinUrl ||
        prevData.summary !== resumeData.summary,
      skills: JSON.stringify(prevData.skills) !== JSON.stringify(resumeData.skills),
      experience: JSON.stringify(prevData.workExperience) !== JSON.stringify(resumeData.workExperience),
      education: JSON.stringify(prevData.education) !== JSON.stringify(resumeData.education),
      projects: JSON.stringify(prevData.projects) !== JSON.stringify(resumeData.projects),
      certifications: JSON.stringify(prevData.certifications) !== JSON.stringify(resumeData.certifications),
      languages: JSON.stringify(prevData.languages) !== JSON.stringify(resumeData.languages),
    };

    // Set which sections to animate
    Object.entries(updatedSections).forEach(([key, value]) => {
      if (value) {
        setAnimateSections(prev => ({ ...prev, [key]: true }));
        
        // Reset animation flag after animation completes
        setTimeout(() => {
          setAnimateSections(prev => ({ ...prev, [key]: false }));
        }, 1000);
      }
    });

    // Update previous data
    setPrevData(resumeData);
  }, [resumeData]);

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    update: {
      scale: [1, 1.02, 1],
      backgroundColor: ["rgba(255, 255, 255, 0)", "rgba(236, 252, 255, 0.7)", "rgba(255, 255, 255, 0)"],
      transition: { 
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="sticky top-6 w-full">
      <motion.div 
        className="bg-white rounded-lg shadow-lg p-8 max-w-[21cm] mx-auto"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\" fill=\"%23f0f0f0\" fill-opacity=\"0.1\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')",
          backgroundSize: "cover",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          minHeight: "29.7cm",
          width: "21cm",
          transformOrigin: "top center",
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-6"
          animate={animateSections.personal ? "update" : "visible"}
          variants={sectionVariants}
        >
          <h1 className="text-3xl font-bold">
            {resumeData.fullName || "Your Name"}
          </h1>
          <div className="text-sm text-gray-600 mt-2">
            {resumeData.email || "email@example.com"} | {resumeData.phone || "123-456-7890"} | {resumeData.linkedinUrl || "linkedin.com/in/yourprofile"}
          </div>
        </motion.div>

        {/* Summary */}
        {(resumeData.summary || animateSections.personal) && (
          <motion.div 
            className="mb-6"
            animate={animateSections.personal ? "update" : "visible"}
            variants={sectionVariants}
          >
            <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Summary</h2>
            <p className="text-sm">
              {resumeData.summary || "Professional summary will appear here. Add a brief overview of your skills, experience, and career goals."}
            </p>
          </motion.div>
        )}

        {/* Skills */}
        <motion.div 
          className="mb-6"
          animate={animateSections.skills ? "update" : "visible"}
          variants={sectionVariants}
        >
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {(resumeData.skills.length > 0 ? resumeData.skills : ["JavaScript", "React", "Node.js", "HTML/CSS", "TypeScript"]).map((skill, index) => (
                <motion.span 
                  key={skill + index}
                  className="bg-gray-100 px-2 py-1 rounded-md text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  {skill}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Work Experience */}
        <motion.div 
          className="mb-6"
          animate={animateSections.experience ? "update" : "visible"}
          variants={sectionVariants}
        >
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Work Experience</h2>
          {resumeData.workExperience.length > 0 ? (
            resumeData.workExperience.map((exp, index) => (
              <motion.div 
                key={index} 
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold">{exp.company}</h3>
                  <span className="text-sm text-gray-600">{exp.duration}</span>
                </div>
                <div className="text-sm font-medium italic">{exp.role}</div>
                <p className="text-sm mt-1">{exp.description}</p>
              </motion.div>
            ))
          ) : (
            <div className="text-sm text-gray-500 italic">
              Your work experience will appear here. Add details about your previous roles, responsibilities, and achievements.
            </div>
          )}
        </motion.div>

        {/* Education */}
        <motion.div 
          className="mb-6"
          animate={animateSections.education ? "update" : "visible"}
          variants={sectionVariants}
        >
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Education</h2>
          {resumeData.education.length > 0 ? (
            resumeData.education.map((edu, index) => (
              <motion.div 
                key={index} 
                className="mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold">{edu.institute}</h3>
                  <span className="text-sm text-gray-600">{edu.year}</span>
                </div>
                <div className="text-sm italic">{edu.degree}</div>
              </motion.div>
            ))
          ) : (
            <div className="text-sm text-gray-500 italic">
              Your education details will appear here. Add information about your degrees, institutions, and graduation years.
            </div>
          )}
        </motion.div>

        {/* Projects */}
        {(resumeData.projects.length > 0 || animateSections.projects) && (
          <motion.div 
            className="mb-6"
            animate={animateSections.projects ? "update" : "visible"}
            variants={sectionVariants}
          >
            <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Projects</h2>
            {resumeData.projects.length > 0 ? (
              resumeData.projects.map((project, index) => (
                <motion.div 
                  key={index} 
                  className="mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <h3 className="font-semibold">
                    {project.name}
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm ml-2">
                        (Link)
                      </a>
                    )}
                  </h3>
                  <p className="text-sm mt-1">{project.description}</p>
                  <div className="text-xs mt-1 italic">
                    Technologies: {project.technologies.join(', ')}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-sm text-gray-500 italic">
                Your projects will appear here. Add details about your personal or professional projects, including descriptions and technologies used.
              </div>
            )}
          </motion.div>
        )}

        {/* Certifications */}
        {(resumeData.certifications.length > 0 || animateSections.certifications) && (
          <motion.div 
            className="mb-6"
            animate={animateSections.certifications ? "update" : "visible"}
            variants={sectionVariants}
          >
            <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Certifications</h2>
            {resumeData.certifications.length > 0 ? (
              resumeData.certifications.map((cert, index) => (
                <motion.div 
                  key={index} 
                  className="mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{cert.name}</h3>
                    <span className="text-sm text-gray-600">{cert.year}</span>
                  </div>
                  <div className="text-sm">Issuer: {cert.issuer}</div>
                </motion.div>
              ))
            ) : (
              <div className="text-sm text-gray-500 italic">
                Your certifications will appear here. Add information about professional certifications you've earned.
              </div>
            )}
          </motion.div>
        )}

        {/* Languages */}
        {(resumeData.languages.length > 0 || animateSections.languages) && (
          <motion.div
            animate={animateSections.languages ? "update" : "visible"}
            variants={sectionVariants}
          >
            <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Languages</h2>
            {resumeData.languages.length > 0 ? (
              <p className="text-sm">{resumeData.languages.join(', ')}</p>
            ) : (
              <div className="text-sm text-gray-500 italic">
                Languages you speak will appear here. Add the languages you know and your proficiency level.
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
