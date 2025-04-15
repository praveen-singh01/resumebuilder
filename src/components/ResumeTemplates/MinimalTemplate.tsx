"use client";

import { motion } from 'framer-motion';
import { ResumeData } from '@/types/resume';

interface MinimalTemplateProps {
  resumeData: ResumeData;
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
}

export default function MinimalTemplate({
  resumeData,
  primaryColor = '#10B981',
  secondaryColor = '#6EE7B7',
  fontFamily = 'Inter, sans-serif',
}: MinimalTemplateProps) {
  // Destructure with correct property names from ResumeData
  const {
    personal: { name, email, phone, website, location, summary },
    workExperience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = []
  } = resumeData;

  return (
    <div 
      className="bg-white p-8 max-w-[21cm] mx-auto shadow-lg"
      style={{
        fontFamily,
        minHeight: '29.7cm',
        width: '21cm',
      }}
    >
      {/* Header */}
      <header className="border-b pb-4 mb-6">
        <h1 className="text-4xl font-light mb-2">
          {name}
        </h1>
        <div className="text-sm text-gray-600 flex flex-wrap gap-4">
          {email && <span>{email}</span>}
          {phone && (
            <>
              <span>•</span>
              <span>{phone}</span>
            </>
          )}
          {website && (
            <>
              <span>•</span>
              <a 
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Portfolio
              </a>
            </>
          )}
          {location && (
            <>
              <span>•</span>
              <span>{location}</span>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <p className="text-gray-700 leading-relaxed">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: primaryColor }}>
            EXPERIENCE
          </h2>
          {workExperience.map((exp, index) => (
            <motion.div 
              key={index} 
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-baseline flex-wrap gap-2">
                <h3 className="font-medium">{exp.position}</h3>
                <span className="text-sm text-gray-500">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{exp.company}</p>
              <p className="text-sm text-gray-700">{exp.description}</p>
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: primaryColor }}>
            EDUCATION
          </h2>
          {education.map((edu, index) => (
            <motion.div 
              key={index} 
              className="mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-baseline flex-wrap gap-2">
                <h3 className="font-medium">{edu.degree} in {edu.field}</h3>
                <span className="text-sm text-gray-500">
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </span>
              </div>
              <p className="text-gray-600">{edu.institution}</p>
              {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
            </motion.div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3" style={{ color: primaryColor }}>
            SKILLS
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <motion.span 
                key={index}
                className="px-2 py-1 text-sm rounded"
                style={{ backgroundColor: secondaryColor, color: 'white' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: primaryColor }}>
            PROJECTS
          </h2>
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="font-medium">{project.name}</h3>
              <p className="text-sm text-gray-700 mb-2">{project.description}</p>
              {project.technologies && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="text-xs px-2 py-1 bg-gray-100 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {project.url && (
                <a 
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline mt-1 block"
                >
                  View Project
                </a>
              )}
            </motion.div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: primaryColor }}>
            CERTIFICATIONS
          </h2>
          {certifications.map((cert, index) => (
            <motion.div 
              key={index} 
              className="mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-baseline flex-wrap gap-2">
                <h3 className="font-medium">{cert.name}</h3>
                <span className="text-sm text-gray-500">{cert.date}</span>
              </div>
              <p className="text-gray-600">{cert.issuer}</p>
              {cert.url && (
                <a 
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  View Certificate
                </a>
              )}
            </motion.div>
          ))}
        </section>
      )}
    </div>
  );
}




