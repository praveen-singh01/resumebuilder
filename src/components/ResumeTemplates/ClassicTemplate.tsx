"use client";

import { ResumeTemplateProps } from "../TemplateSelection";

export default function ClassicTemplate({
  resumeData,
  primaryColor = "#6366F1",
  secondaryColor = "#A5B4FC",
  fontFamily = "Georgia, serif",
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
      <div className="text-center mb-6 pb-6">
        <h1 className="text-3xl font-bold" style={{ color: primaryColor }}>
          {resumeData.personal.name || "Your Name"}
        </h1>
        <div className="flex justify-center flex-wrap gap-2 mt-2 text-sm text-gray-600">
          {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
          {resumeData.personal.phone && (
            <>
              <span>•</span>
              <span>{resumeData.personal.phone}</span>
            </>
          )}
          {resumeData.personal.linkedinUrl && (
            <>
              <span>•</span>
              <span>{resumeData.personal.linkedinUrl}</span>
            </>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-1 mb-6" style={{ backgroundColor: primaryColor }}></div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column */}
        <div className="w-full md:w-1/3 space-y-6">
          {/* Contact Info */}
          <Section title="Contact" color={primaryColor}>
            <div className="space-y-2 text-sm">
              {resumeData.personal.email && (
                <div>
                  <div className="font-semibold">Email</div>
                  <div>{resumeData.personal.email}</div>
                </div>
              )}
              {resumeData.personal.phone && (
                <div>
                  <div className="font-semibold">Phone</div>
                  <div>{resumeData.personal.phone}</div>
                </div>
              )}
              {resumeData.personal.linkedinUrl && (
                <div>
                  <div className="font-semibold">LinkedIn</div>
                  <div>{resumeData.personal.linkedinUrl}</div>
                </div>
              )}
            </div>
          </Section>

          {/* Skills */}
          <Section title="Skills" color={primaryColor}>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {resumeData.skills.length > 0 ? (
                resumeData.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))
              ) : (
                <EmptyPlaceholder text="Your skills will appear here." />
              )}
            </ul>
          </Section>

          {/* Education */}
          <Section title="Education" color={primaryColor}>
            {resumeData.education.length ? (
              resumeData.education.map((edu, index) => (
                <div key={index} className="mb-3 text-sm">
                  <div className="font-semibold">{edu.institution}</div>
                  <div>{edu.degree} in {edu.field}</div>
                  <div className="text-gray-600">
                    {edu.startDate} – {edu.current ? "Present" : edu.endDate || "N/A"}
                  </div>
                </div>
              ))
            ) : (
              <EmptyPlaceholder text="Your education details will appear here." />
            )}
          </Section>

          {/* Languages */}
          {(resumeData.languages || []).length > 0 && (
            <Section title="Languages" color={primaryColor}>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {(resumeData.languages || []).map((lang, index) => (
                  <li key={index}>
                    {lang.language} ({lang.proficiency})
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        {/* Right Column */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Summary */}
          {resumeData.personal.summary && (
            <Section title="Summary" color={primaryColor}>
              <p className="text-sm">{resumeData.personal.summary}</p>
            </Section>
          )}

          {/* Work Experience */}
          <Section title="Work Experience" color={primaryColor}>
            {resumeData.workExperience.length ? (
              resumeData.workExperience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{exp.company}</h3>
                    <span className="text-sm text-gray-600">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate || "N/A"}
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
    <h2 className="text-xl font-semibold mb-3 pb-1 border-b" style={{ color, borderColor: color }}>
      {title}
    </h2>
    {children}
  </div>
);

// Placeholder for empty data
const EmptyPlaceholder = ({ text }: { text: string }) => (
  <div className="text-sm text-gray-500 italic">{text}</div>
);
