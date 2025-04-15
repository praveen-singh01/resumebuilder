import mammoth from "mammoth";
import { ResumeData } from "@/types/resume";
import { parsePdfResume } from "./advancedPdfParser";

export async function parseDocxFile(fileBuffer: Buffer): Promise<ResumeData> {
  try {
    console.log("Starting DOCX parsing...");
    console.log("Buffer size:", fileBuffer.length);

    // Create a default resume data in case parsing fails
    const defaultResumeData: ResumeData = {
      personal: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "(123) 456-7890",
        location: "New York, NY",
        summary: "Experienced professional with a background in...",
        linkedinUrl: "linkedin.com/in/johndoe"
      },
      skills: ["Skill 1", "Skill 2", "Skill 3"],
      workExperience: [
        {
          company: "Company Name",
          position: "Position Title",
          startDate: "Jan 2020",
          endDate: "",
          current: true,
          description: "Job description here..."
        }
      ],
      education: [
        {
          institution: "University Name",
          degree: "Degree Name",
          field: "Field of Study",
          startDate: "2016",
          endDate: "2020"
        }
      ],
      projects: [],
      certifications: [],
      languages: []
    };

    // If buffer is empty or invalid, return default data
    if (!fileBuffer || fileBuffer.length === 0) {
      console.log("Empty buffer, returning default data");
      return defaultResumeData;
    }

    // Extract text from DOCX
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    const text = result.value;

    console.log("DOCX parsed successfully, extracted text length:", text.length);

    // If text is empty, return default data
    if (!text || text.trim().length === 0) {
      console.log("Empty text extracted, returning default data");
      return defaultResumeData;
    }

    try {
      // Create a mock PDF-like text structure
      console.log("Using advanced parser for DOCX content...");

      // Create a structured text that mimics a resume format
      // This helps the PDF parser identify sections more easily
      const structuredText = formatTextForParsing(text);

      // Convert the structured text to a buffer and use the advanced PDF parser
      const textBuffer = Buffer.from(structuredText);
      const resumeData = await parsePdfResume(textBuffer);
      console.log("Advanced parsing successful");
      return resumeData;
    } catch (advancedParseError) {
      console.error("Advanced parsing failed, falling back to basic parser:", advancedParseError);
      // Fall back to the basic parser if advanced parsing fails
      const extractedData = extractDataFromText(text);
      console.log("Basic data extraction successful");
      return extractedData;
    }
  } catch (error) {
    console.error("Error parsing DOCX:", error);
    // Return a default resume structure instead of null
    return {
      personal: {
        name: "DOCX Parsing Error",
        email: "example@example.com",
        phone: "(123) 456-7890",
        location: "Location",
        summary: "There was an error parsing your DOCX file. Please try a different file or enter your information manually.",
        linkedinUrl: ""
      },
      skills: ["Skill 1", "Skill 2", "Skill 3"],
      workExperience: [],
      education: [],
      projects: [],
      certifications: [],
      languages: []
    };
  }
}

function extractDataFromText(text: string): ResumeData {
  // This is a simplified implementation
  // In a real-world scenario, you would use more sophisticated NLP techniques
  // or regex patterns to extract structured data

  const lines = text.split("\n").filter(line => line.trim() !== "");

  // Basic extraction logic (this is simplified)
  const fullName = lines[0] || "";

  // Find email using regex
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const emailMatch = text.match(emailRegex);
  const email = emailMatch ? emailMatch[0] : "";

  // Find phone using regex
  const phoneRegex = /(\+\d{1,3}[-\s]?)?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}/;
  const phoneMatch = text.match(phoneRegex);
  const phone = phoneMatch ? phoneMatch[0] : "";

  // Find LinkedIn URL
  const linkedinRegex = /linkedin\.com\/in\/[a-zA-Z0-9-]+/;
  const linkedinMatch = text.match(linkedinRegex);
  const linkedinUrl = linkedinMatch ? `https://www.${linkedinMatch[0]}` : "";

  // Extract skills (simplified)
  const skillsSection = findSectionSimple(text, ["SKILLS", "TECHNICAL SKILLS"]);
  const skills = skillsSection
    ? skillsSection
        .split(/[,;]/)
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0)
    : [];

  // Extract education (simplified)
  const educationSection = findSectionSimple(text, ["EDUCATION", "ACADEMIC"]);
  const education = educationSection
    ? parseEducation(educationSection)
    : [];

  // Extract work experience (simplified)
  const experienceSection = findSectionSimple(text, ["EXPERIENCE", "WORK EXPERIENCE", "EMPLOYMENT"]);
  const workExperience = experienceSection
    ? parseWorkExperience(experienceSection)
    : [];

  // Extract summary
  const summarySection = findSectionSimple(text, ["SUMMARY", "PROFESSIONAL SUMMARY", "OBJECTIVE"]);
  const summary = summarySection || "";

  return {
    personal: {
      name: fullName,
      email,
      phone,
      linkedinUrl,
      summary
    },
    skills,
    education: education.map(edu => ({
      institution: edu.institute,
      degree: edu.degree,
      field: '',
      startDate: edu.year.split('-')[0]?.trim() || '',
      endDate: edu.year.split('-')[1]?.trim() || ''
    })),
    workExperience: workExperience.map(exp => ({
      company: exp.company,
      position: exp.role,
      startDate: exp.duration.split('-')[0]?.trim() || '',
      endDate: exp.duration.split('-')[1]?.trim() || '',
      description: exp.description
    })),
    certifications: [],
    projects: [],
    languages: []
  };
}

function findSectionSimple(text: string, possibleHeaders: string[]): string | null {
  // This is a simplified implementation
  for (const header of possibleHeaders) {
    const regex = new RegExp(`${header}[:\\s]*(.*?)(?=\\n\\s*[A-Z]{2,}|$)`, "is");
    const match = text.match(regex);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return null;
}

function parseEducation(educationText: string): { institute: string; degree: string; year: string }[] {
  // This is a simplified implementation
  const education = [];
  const educationEntries = educationText.split(/\n\n|\r\n\r\n/);

  for (const entry of educationEntries) {
    if (entry.trim()) {
      const lines = entry.split("\n");
      const institute = lines[0] || "";
      const degree = lines[1] || "";

      // Try to find year using regex
      const yearRegex = /(19|20)\d{2}(\s*-\s*(19|20)\d{2}|present|current)?/i;
      const yearMatch = entry.match(yearRegex);
      const year = yearMatch ? yearMatch[0] : "";

      education.push({ institute, degree, year });
    }
  }

  return education;
}

function parseWorkExperience(experienceText: string): { company: string; role: string; duration: string; description: string }[] {
  // This is a simplified implementation
  const experiences = [];
  const experienceEntries = experienceText.split(/\n\n|\r\n\r\n/);

  for (const entry of experienceEntries) {
    if (entry.trim()) {
      const lines = entry.split("\n");
      const company = lines[0] || "";
      const role = lines[1] || "";

      // Try to find duration using regex
      const durationRegex = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\s+(-|to)\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}|Present|Current/i;
      const durationMatch = entry.match(durationRegex);
      const duration = durationMatch ? durationMatch[0] : "";

      // The rest is description
      const descriptionLines = lines.slice(2);
      const description = descriptionLines.join("\n").trim();

      experiences.push({ company, role, duration, description });
    }
  }

  return experiences;
}

/**
 * Find a section in the text based on keywords
 */
function findSection(text: string, keywords: string[]): string {
  const lines = text.split('\n');
  let sectionContent = '';
  let inSection = false;
  let sectionStartIndex = -1;

  // Find the section start
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim().toUpperCase();

    // Check if this line contains a section keyword
    if (!inSection && keywords.some(keyword => line.includes(keyword))) {
      inSection = true;
      sectionStartIndex = i + 1; // Start from the next line
      continue;
    }

    // Check if we've reached the next section
    if (inSection && i > sectionStartIndex) {
      // Look for common section headers that would indicate the end of this section
      const commonSectionHeaders = [
        "SUMMARY", "EXPERIENCE", "EDUCATION", "SKILLS", "PROJECTS",
        "CERTIFICATIONS", "LANGUAGES", "REFERENCES", "INTERESTS"
      ];

      if (commonSectionHeaders.some(header => line.includes(header) && !keywords.includes(header))) {
        break;
      }

      // Add this line to the section content
      sectionContent += lines[i] + '\n';
    }
  }

  return sectionContent.trim();
}

/**
 * Format extracted text to make it more parser-friendly
 * This function adds section headers and structures the text to help the PDF parser
 */
function formatTextForParsing(text: string): string {
  // Find potential sections in the text
  const sections = {
    summary: findSection(text, ["SUMMARY", "PROFESSIONAL SUMMARY", "OBJECTIVE"]),
    experience: findSection(text, ["EXPERIENCE", "WORK EXPERIENCE", "EMPLOYMENT"]),
    education: findSection(text, ["EDUCATION", "ACADEMIC"]),
    skills: findSection(text, ["SKILLS", "TECHNICAL SKILLS"]),
    projects: findSection(text, ["PROJECTS", "PROJECT EXPERIENCE"]),
    certifications: findSection(text, ["CERTIFICATIONS", "CERTIFICATES"]),
    languages: findSection(text, ["LANGUAGES", "LANGUAGE PROFICIENCY"])
  };

  // Extract name and contact info from the beginning of the text
  const lines = text.split('\n').filter(line => line.trim() !== '');
  const header = lines.slice(0, Math.min(10, lines.length)).join('\n');

  // Build a structured text with clear section headers
  let structuredText = header + '\n\n';

  if (sections.summary) {
    structuredText += "SUMMARY\n" + sections.summary + '\n\n';
  }

  if (sections.experience) {
    structuredText += "WORK EXPERIENCE\n" + sections.experience + '\n\n';
  }

  if (sections.education) {
    structuredText += "EDUCATION\n" + sections.education + '\n\n';
  }

  if (sections.skills) {
    structuredText += "SKILLS\n" + sections.skills + '\n\n';
  }

  if (sections.projects) {
    structuredText += "PROJECTS\n" + sections.projects + '\n\n';
  }

  if (sections.certifications) {
    structuredText += "CERTIFICATIONS\n" + sections.certifications + '\n\n';
  }

  if (sections.languages) {
    structuredText += "LANGUAGES\n" + sections.languages + '\n\n';
  }

  return structuredText;
}
