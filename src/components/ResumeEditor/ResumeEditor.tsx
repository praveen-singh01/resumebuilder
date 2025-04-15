"use client";

import { useState } from 'react';
import { ResumeData, Education, WorkExperience, Project, Certification } from '@/types/resume';

interface ResumeEditorProps {
  resumeData: ResumeData;
  onUpdate: (data: ResumeData) => void;
  onPreview: () => void;
}

export default function ResumeEditor({ resumeData, onUpdate, onPreview }: ResumeEditorProps) {
  const [activeSection, setActiveSection] = useState<string>('personal');

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onUpdate({
      ...resumeData,
      [name]: value,
    });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
    onUpdate({
      ...resumeData,
      skills,
    });
  };

  const handleLanguagesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const languages = e.target.value.split(',').map(lang => lang.trim()).filter(Boolean);
    onUpdate({
      ...resumeData,
      languages,
    });
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    onUpdate({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const addEducation = () => {
    onUpdate({
      ...resumeData,
      education: [
        ...resumeData.education,
        { institute: '', degree: '', year: '' },
      ],
    });
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation.splice(index, 1);
    onUpdate({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const handleWorkExperienceChange = (index: number, field: keyof WorkExperience, value: string) => {
    const updatedWorkExperience = [...resumeData.workExperience];
    updatedWorkExperience[index] = {
      ...updatedWorkExperience[index],
      [field]: value,
    };
    onUpdate({
      ...resumeData,
      workExperience: updatedWorkExperience,
    });
  };

  const addWorkExperience = () => {
    onUpdate({
      ...resumeData,
      workExperience: [
        ...resumeData.workExperience,
        { company: '', role: '', duration: '', description: '' },
      ],
    });
  };

  const removeWorkExperience = (index: number) => {
    const updatedWorkExperience = [...resumeData.workExperience];
    updatedWorkExperience.splice(index, 1);
    onUpdate({
      ...resumeData,
      workExperience: updatedWorkExperience,
    });
  };

  const handleProjectChange = (index: number, field: keyof Project, value: string | string[]) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    onUpdate({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  const handleProjectTechnologiesChange = (index: number, value: string) => {
    const technologies = value.split(',').map(tech => tech.trim()).filter(Boolean);
    handleProjectChange(index, 'technologies', technologies);
  };

  const addProject = () => {
    onUpdate({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        { name: '', description: '', technologies: [], url: '' },
      ],
    });
  };

  const removeProject = (index: number) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects.splice(index, 1);
    onUpdate({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  const handleCertificationChange = (index: number, field: keyof Certification, value: string) => {
    const updatedCertifications = [...resumeData.certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value,
    };
    onUpdate({
      ...resumeData,
      certifications: updatedCertifications,
    });
  };

  const addCertification = () => {
    onUpdate({
      ...resumeData,
      certifications: [
        ...resumeData.certifications,
        { name: '', issuer: '', year: '' },
      ],
    });
  };

  const removeCertification = (index: number) => {
    const updatedCertifications = [...resumeData.certifications];
    updatedCertifications.splice(index, 1);
    onUpdate({
      ...resumeData,
      certifications: updatedCertifications,
    });
  };

  return (
    <div>
      <div className="flex mb-6 overflow-x-auto">
        <button
          className={`px-4 py-2 whitespace-nowrap ${activeSection === 'personal' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-t-lg mr-1`}
          onClick={() => setActiveSection('personal')}
        >
          Personal Info
        </button>
        <button
          className={`px-4 py-2 whitespace-nowrap ${activeSection === 'skills' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-t-lg mr-1`}
          onClick={() => setActiveSection('skills')}
        >
          Skills & Languages
        </button>
        <button
          className={`px-4 py-2 whitespace-nowrap ${activeSection === 'education' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-t-lg mr-1`}
          onClick={() => setActiveSection('education')}
        >
          Education
        </button>
        <button
          className={`px-4 py-2 whitespace-nowrap ${activeSection === 'experience' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-t-lg mr-1`}
          onClick={() => setActiveSection('experience')}
        >
          Work Experience
        </button>
        <button
          className={`px-4 py-2 whitespace-nowrap ${activeSection === 'projects' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-t-lg mr-1`}
          onClick={() => setActiveSection('projects')}
        >
          Projects
        </button>
        <button
          className={`px-4 py-2 whitespace-nowrap ${activeSection === 'certifications' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-t-lg`}
          onClick={() => setActiveSection('certifications')}
        >
          Certifications
        </button>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        {/* Personal Information */}
        {activeSection === 'personal' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={resumeData.fullName}
                onChange={handlePersonalInfoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={resumeData.email}
                onChange={handlePersonalInfoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={resumeData.phone}
                onChange={handlePersonalInfoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
              <input
                type="url"
                name="linkedinUrl"
                value={resumeData.linkedinUrl}
                onChange={handlePersonalInfoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
              <textarea
                name="summary"
                value={resumeData.summary}
                onChange={handlePersonalInfoChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        )}

        {/* Skills & Languages */}
        {activeSection === 'skills' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Skills & Languages</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma-separated)</label>
              <textarea
                value={resumeData.skills.join(', ')}
                onChange={handleSkillsChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="JavaScript, React, Node.js, etc."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Languages (comma-separated)</label>
              <textarea
                value={resumeData.languages.join(', ')}
                onChange={handleLanguagesChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="English, Spanish, etc."
              />
            </div>
          </div>
        )}

        {/* Education */}
        {activeSection === 'education' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Education</h2>
              <button
                type="button"
                onClick={addEducation}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Education
              </button>
            </div>
            
            {resumeData.education.length === 0 ? (
              <p className="text-gray-500 italic">No education entries yet. Click "Add Education" to add one.</p>
            ) : (
              <div className="space-y-6">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="p-4 border border-gray-300 rounded-md relative">
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      ?
                    </button>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Institute</label>
                        <input
                          type="text"
                          value={edu.institute}
                          onChange={(e) => handleEducationChange(index, 'institute', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                        <input
                          type="text"
                          value={edu.year}
                          onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="2018 - 2022"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Work Experience */}
        {activeSection === 'experience' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Work Experience</h2>
              <button
                type="button"
                onClick={addWorkExperience}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Experience
              </button>
            </div>
            
            {resumeData.workExperience.length === 0 ? (
              <p className="text-gray-500 italic">No work experience entries yet. Click "Add Experience" to add one.</p>
            ) : (
              <div className="space-y-6">
                {resumeData.workExperience.map((exp, index) => (
                  <div key={index} className="p-4 border border-gray-300 rounded-md relative">
                    <button
                      type="button"
                      onClick={() => removeWorkExperience(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      ?
                    </button>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => handleWorkExperienceChange(index, 'role', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                        <input
                          type="text"
                          value={exp.duration}
                          onChange={(e) => handleWorkExperienceChange(index, 'duration', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="Jan 2020 - Present"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={exp.description}
                          onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Projects */}
        {activeSection === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Projects</h2>
              <button
                type="button"
                onClick={addProject}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Project
              </button>
            </div>
            
            {resumeData.projects.length === 0 ? (
              <p className="text-gray-500 italic">No project entries yet. Click "Add Project" to add one.</p>
            ) : (
              <div className="space-y-6">
                {resumeData.projects.map((project, index) => (
                  <div key={index} className="p-4 border border-gray-300 rounded-md relative">
                    <button
                      type="button"
                      onClick={() => removeProject(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      ?
                    </button>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                        <input
                          type="text"
                          value={project.name}
                          onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={project.description}
                          onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma-separated)</label>
                        <input
                          type="text"
                          value={project.technologies.join(', ')}
                          onChange={(e) => handleProjectTechnologiesChange(index, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="React, Node.js, MongoDB"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL (optional)</label>
                        <input
                          type="url"
                          value={project.url || ''}
                          onChange={(e) => handleProjectChange(index, 'url', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Certifications */}
        {activeSection === 'certifications' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Certifications</h2>
              <button
                type="button"
                onClick={addCertification}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Certification
              </button>
            </div>
            
            {resumeData.certifications.length === 0 ? (
              <p className="text-gray-500 italic">No certification entries yet. Click "Add Certification" to add one.</p>
            ) : (
              <div className="space-y-6">
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} className="p-4 border border-gray-300 rounded-md relative">
                    <button
                      type="button"
                      onClick={() => removeCertification(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      ?
                    </button>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
                        <input
                          type="text"
                          value={cert.name}
                          onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Issuer</label>
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                        <input
                          type="text"
                          value={cert.year}
                          onChange={(e) => handleCertificationChange(index, 'year', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="2022"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onPreview}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Preview Resume
        </button>
      </div>
    </div>
  );
}
