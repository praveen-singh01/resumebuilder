"use client";

import { ResumeTemplateProps } from "../TemplateSelection";

export default function ContemporaryTemplate({
  resumeData,
  primaryColor = "#059669",
  secondaryColor = "#A7F3D0",
  fontFamily = "Poppins, sans-serif",
}: ResumeTemplateProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden max-w-[21cm] mx-auto flex"
      style={{
        fontFamily,
        minHeight: "29.7cm",
        width: "21cm",
      }}
    >
      {/* Sidebar */}
      <div
        className="w-1/3 p-6 text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="sticky top-6">
          {/* Profile */}
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-white mb-4 flex items-center justify-center" style={{ color: primaryColor }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">
              {resumeData.personal.name || "Your Name"}
            </h1>
            <div className="text-sm opacity-90 mt-1">
              {resumeData.workExperience[0]?.position || "Your Position"}
            </div>
          </div>

          {/* Contact */}
          <SidebarSection title="Contact">
            {resumeData.personal.email && (
              <ContactItem icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              } text={resumeData.personal.email} />
            )}
            
            {resumeData.personal.phone && (
              <ContactItem icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              } text={resumeData.personal.phone} />
            )}
            
            {resumeData.personal.linkedinUrl && (
              <ContactItem icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
              } text={resumeData.personal.linkedinUrl} />
            )}
          </SidebarSection>

          {/* Skills */}
          <SidebarSection title="Skills">
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.length > 0 ? (
                resumeData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white/20 rounded text-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <div className="text-sm opacity-80 italic">Your skills will appear here.</div>
              )}
            </div>
          </SidebarSection>

          {/* Education */}
          <SidebarSection title="Education">
            {resumeData.education.length ? (
              resumeData.education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <div className="font-semibold">{edu.institution}</div>
                  <div className="text-sm">{edu.degree} in {edu.field}</div>
                  <div className="text-sm opacity-80">
                    {edu.startDate} – {edu.current ? "Present" : edu.endDate || "N/A"}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm opacity-80 italic">Your education details will appear here.</div>
            )}
          </SidebarSection>

          {/* Languages */}
          {(resumeData.languages || []).length > 0 && (
            <SidebarSection title="Languages">
              {(resumeData.languages || []).map((lang, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between">
                    <span>{lang.language}</span>
                    <span className="text-sm opacity-80">{lang.proficiency}</span>
                  </div>
                  <div className="w-full bg-white/20 h-1.5 rounded-full mt-1">
                    <div
                      className="h-full rounded-full bg-white"
                      style={{
                        width: lang.proficiency === "Native" ? "100%" :
                               lang.proficiency === "Fluent" ? "90%" :
                               lang.proficiency === "Advanced" ? "75%" :
                               lang.proficiency === "Intermediate" ? "50%" :
                               "25%"
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </SidebarSection>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8">
        {/* Summary */}
        {resumeData.personal.summary && (
          <MainSection title="About Me">
            <p className="text-gray-700">{resumeData.personal.summary}</p>
          </MainSection>
        )}

        {/* Experience */}
        <MainSection title="Work Experience">
          {resumeData.workExperience.length ? (
            resumeData.workExperience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: primaryColor }}>{exp.position}</h3>
                    <div className="text-md font-medium">{exp.company}</div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1 md:mt-0 md:text-right whitespace-nowrap">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate || "N/A"}
                  </div>
                </div>
                <p className="mt-2 text-gray-700">{exp.description}</p>
              </div>
            ))
          ) : (
            <EmptyPlaceholder text="Your work experience will appear here." />
          )}
        </MainSection>

        {/* Projects */}
        {(resumeData.projects || []).length > 0 && (
          <MainSection title="Projects">
            {(resumeData.projects || []).map((project, index) => (
              <div key={index} className="mb-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold" style={{ color: primaryColor }}>{project.name}</h3>
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
                        className="px-2 py-1 text-xs rounded"
                        style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </MainSection>
        )}

        {/* Certifications */}
        {(resumeData.certifications || []).length > 0 && (
          <MainSection title="Certifications">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(resumeData.certifications || []).map((cert, index) => (
                <div key={index} className="border p-3 rounded" style={{ borderColor: `${primaryColor}40` }}>
                  <h3 className="font-bold" style={{ color: primaryColor }}>{cert.name}</h3>
                  <div className="text-sm">{cert.issuer}</div>
                  <div className="text-sm text-gray-600 mt-1">{cert.date}</div>
                </div>
              ))}
            </div>
          </MainSection>
        )}
      </div>
    </div>
  );
}

// Sidebar section component
const SidebarSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold mb-3 pb-1 border-b border-white/30">
      {title}
    </h2>
    <div className="mt-3">
      {children}
    </div>
  </div>
);

// Contact item component
const ContactItem = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <div className="flex items-center gap-3 mb-3">
    <div className="flex-shrink-0">
      {icon}
    </div>
    <div className="text-sm overflow-hidden overflow-ellipsis">
      {text}
    </div>
  </div>
);

// Main section component
const MainSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-4 pb-2 border-b" style={{ borderColor: "#e2e8f0" }}>
      {title}
    </h2>
    <div className="mt-3">
      {children}
    </div>
  </div>
);

// Placeholder for empty data
const EmptyPlaceholder = ({ text }: { text: string }) => (
  <div className="text-sm text-gray-500 italic">{text}</div>
);
