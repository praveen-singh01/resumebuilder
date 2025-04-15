"use client";

import { ResumeTemplateProps } from "../TemplateSelection";

export default function CreativeTemplate({
  resumeData,
  primaryColor = "#EC4899",
  secondaryColor = "#F9A8D4",
  fontFamily = "Poppins, sans-serif",
}: ResumeTemplateProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden max-w-[21cm] mx-auto"
      style={{
        fontFamily,
        minHeight: "29.7cm",
        width: "21cm",
      }}
    >
      {/* Header with accent color */}
      <div
        className="p-8 text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <h1 className="text-4xl font-bold">
          {resumeData.personal.name || "Your Name"}
        </h1>
        <div className="text-xl mt-2 opacity-90">
          {resumeData.workExperience[0]?.position || "Your Position"}
        </div>
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 mt-4">
          {resumeData.personal.email && (
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>{resumeData.personal.email}</span>
            </div>
          )}
          
          {resumeData.personal.phone && (
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>{resumeData.personal.phone}</span>
            </div>
          )}
          
          {resumeData.personal.linkedinUrl && (
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
              <span>{resumeData.personal.linkedinUrl}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* About Me */}
        {resumeData.personal.summary && (
          <Section title="About Me" color={primaryColor} icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }>
            <p className="text-gray-700">{resumeData.personal.summary}</p>
          </Section>
        )}

        {/* Experience */}
        <Section title="Experience" color={primaryColor} icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        }>
          {resumeData.workExperience.length ? (
            resumeData.workExperience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{exp.company}</h3>
                    <div className="text-md font-medium" style={{ color: primaryColor }}>{exp.position}</div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1 md:mt-0 md:text-right">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate || "N/A"}
                  </div>
                </div>
                <p className="mt-2 text-gray-700">{exp.description}</p>
              </div>
            ))
          ) : (
            <EmptyPlaceholder text="Your work experience will appear here." />
          )}
        </Section>

        {/* Education */}
        <Section title="Education" color={primaryColor} icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        }>
          {resumeData.education.length ? (
            resumeData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{edu.institution}</h3>
                    <div className="text-md">{edu.degree} in {edu.field}</div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1 md:mt-0 md:text-right">
                    {edu.startDate} – {edu.current ? "Present" : edu.endDate || "N/A"}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <EmptyPlaceholder text="Your education details will appear here." />
          )}
        </Section>

        {/* Skills */}
        <Section title="Skills" color={primaryColor} icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.length > 0 ? (
              resumeData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-white text-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  {skill}
                </span>
              ))
            ) : (
              <EmptyPlaceholder text="Your skills will appear here." />
            )}
          </div>
        </Section>

        {/* Projects */}
        {(resumeData.projects || []).length > 0 && (
          <Section title="Projects" color={primaryColor} icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }>
            {(resumeData.projects || []).map((project, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold">{project.name}</h3>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm"
                      style={{ color: primaryColor }}
                    >
                      View Project
                    </a>
                  )}
                </div>
                <p className="mt-1 text-gray-700">{project.description}</p>
                {project.technologies && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Languages */}
        {(resumeData.languages || []).length > 0 && (
          <Section title="Languages" color={primaryColor} icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          }>
            <div className="flex flex-wrap gap-4">
              {(resumeData.languages || []).map((lang, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="font-medium">{lang.language}</div>
                  <div className="text-sm text-gray-600">{lang.proficiency}</div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Certifications */}
        {(resumeData.certifications || []).length > 0 && (
          <Section title="Certifications" color={primaryColor} icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          }>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(resumeData.certifications || []).map((cert, index) => (
                <div key={index} className="border p-3 rounded" style={{ borderColor: secondaryColor }}>
                  <h3 className="font-bold">{cert.name}</h3>
                  <div className="text-sm">{cert.issuer}</div>
                  <div className="text-sm text-gray-600 mt-1">{cert.date}</div>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

// Reusable section component with icon
const Section = ({
  title,
  color,
  icon,
  children,
}: {
  title: string;
  color: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="mb-8">
    <div className="flex items-center gap-2 mb-4">
      <div className="p-2 rounded-full" style={{ backgroundColor: `${color}20`, color }}>
        {icon}
      </div>
      <h2 className="text-2xl font-bold" style={{ color }}>
        {title}
      </h2>
    </div>
    {children}
  </div>
);

// Placeholder for empty data
const EmptyPlaceholder = ({ text }: { text: string }) => (
  <div className="text-sm text-gray-500 italic">{text}</div>
);
