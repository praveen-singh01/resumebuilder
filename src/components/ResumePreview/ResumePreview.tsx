"use client";

import { useState } from 'react';
import { ResumeData } from '@/types/resume';

interface ResumePreviewProps {
  resumeData: ResumeData;
  onEdit: () => void;
}

export default function ResumePreview({ resumeData, onEdit }: ResumePreviewProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Resume Preview</h2>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Back to Edit
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Download PDF
          </button>
        </div>
      </div>

      <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-lg max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">{resumeData.fullName}</h1>
          <div className="text-sm text-gray-600 mt-2">
            {resumeData.email} | {resumeData.phone} | {resumeData.linkedinUrl}
          </div>
        </div>

        {/* Summary */}
        {resumeData.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Summary</h2>
            <p className="text-sm">{resumeData.summary}</p>
          </div>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <span key={index} className="bg-gray-100 px-2 py-1 rounded-md text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {resumeData.workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Work Experience</h2>
            {resumeData.workExperience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{exp.company}</h3>
                  <span className="text-sm text-gray-600">{exp.duration}</span>
                </div>
                <div className="text-sm font-medium italic">{exp.role}</div>
                <p className="text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Education</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{edu.institute}</h3>
                  <span className="text-sm text-gray-600">{edu.year}</span>
                </div>
                <div className="text-sm italic">{edu.degree}</div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Projects</h2>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="mb-4">
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
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Certifications</h2>
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <span className="text-sm text-gray-600">{cert.year}</span>
                </div>
                <div className="text-sm">Issuer: {cert.issuer}</div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {resumeData.languages.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Languages</h2>
            <p className="text-sm">{resumeData.languages.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
