"use client";

import { ResumeTemplateProps } from "../TemplateSelection";


function formatDuration(start: string, end?: string, current?: boolean) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
  const startDate = new Date(start);
  const endDate = current ? 'Present' : end ? new Date(end).toLocaleDateString('en-US', options) : '';
  return `${startDate.toLocaleDateString('en-US', options)} – ${endDate}`;
}

export default function ModernTemplate({
  resumeData,
  primaryColor = "#3B82F6",
  secondaryColor = "#93C5FD",
  fontFamily = "Inter, sans-serif",
}: ResumeTemplateProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-lg p-8 max-w-[21cm] mx-auto"
      style={{
        fontFamily,
        minHeight: "29.7cm",
        width: "21cm",
      }}
    >
      {/* Header */}
      <div
        className="flex justify-between items-start mb-6 pb-6 border-b"
        style={{ borderColor: secondaryColor }}
      >
        <div>
          <h1 className="text-3xl font-bold" style={{ color: primaryColor }}>
            {resumeData.personal.name || "Your Name"}
          </h1>
          <div className="text-gray-600 mt-1">
            {resumeData.personal.summary || "Professional summary will appear here."}
          </div>
        </div>
        <div className="text-right text-sm text-gray-700">
          <div>{resumeData.personal.email || "email@example.com"}</div>
          <div>{resumeData.personal.phone || "123-456-7890"}</div>
          <div>{resumeData.personal.linkedinUrl || "linkedin.com/in/yourprofile"}</div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="w-full md:w-2/3">
          {/* Work Experience */}
          <Section title="Work Experience" color={primaryColor}>
            {resumeData.workExperience.length ? (
              resumeData.workExperience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{exp.company}</h3>
                    <span className="text-sm text-gray-600">
  {formatDuration(exp.startDate, exp.endDate, exp.current)}
</span>

                  </div>
                  <div className="text-sm font-medium italic">{exp.position}</div>
                  <p className="text-sm mt-1">{exp.description}</p>
                </div>
              ))
            ) : (
              <EmptyPlaceholder text="Your work experience will appear here." />
            )}
          </Section>

          {/* Education */}
          <Section title="Education" color={primaryColor}>
            {resumeData.education.length ? (
              resumeData.education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between">
                  <h3 className="font-semibold">{edu.institution}</h3>

                  <span className="text-sm text-gray-600">
  {edu.startDate} – {edu.current ? "Present" : edu.endDate || "N/A"}
</span>

                  </div>
                  <div className="text-sm italic">{edu.degree}</div>
                </div>
              ))
            ) : (
              <EmptyPlaceholder text="Your education details will appear here." />
            )}
          </Section>

          {/* Projects */}
          {(resumeData.projects || []).length > 0 && (
            <Section title="Projects" color={primaryColor}>
              {(resumeData.projects || []).map((project, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">
                    {project.name}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm ml-2"
                        style={{ color: primaryColor }}
                      >
                        (Link)
                      </a>
                    )}
                  </h3>
                  <p className="text-sm mt-1">{project.description}</p>
                  <div className="text-xs mt-1 italic">
                    Technologies: {project.technologies?.join(", ") || "No technologies specified"}
                  </div>
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/3">
          {/* Skills */}
          <div
            className="mb-6 p-4 rounded-lg"
            style={{ backgroundColor: `${secondaryColor}20` }}
          >
            <h2 className="text-xl font-semibold mb-3" style={{ color: primaryColor }}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {(resumeData.skills.length > 0 ? resumeData.skills : ["JavaScript", "React", "Node.js"]).map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="px-2 py-1 rounded-md text-sm"
                  style={{
                    backgroundColor: `${primaryColor}20`,
                    color: primaryColor,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          {(resumeData.certifications || []).length > 0 && (
            <Section title="Certifications" color={primaryColor}>
              {(resumeData.certifications || []).map((cert, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{cert.name}</h3>
                    <span className="text-sm text-gray-600">{cert.date}</span>
                  </div>
                  <div className="text-sm italic">{cert.issuer}</div>
                </div>
              ))}
            </Section>
          )}


          {/* Languages */}
          {(resumeData.languages || []).length > 0 && (
            <Section title="Languages" color={primaryColor}>
              <p className="text-sm">{(resumeData.languages || []).map(lang => lang.language).join(", ")}</p>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable section component
const Section = ({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-3" style={{ color }}>
      {title}
    </h2>
    {children}
  </div>
);

// Placeholder for empty data
const EmptyPlaceholder = ({ text }: { text: string }) => (
  <div className="text-sm text-gray-500 italic">{text}</div>
);






