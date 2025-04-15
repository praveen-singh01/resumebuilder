import { ResumeData } from '@/types/resume';
// Import pdf-parse dynamically to avoid issues with Next.js
let pdfParse: any = null;

// We'll initialize this in the parsePdfResume function

// No NLP tools initialization

// Regular expressions for common patterns
const EMAIL_REGEX = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
const PHONE_REGEX = /(\+\d{1,3}[ -]?)?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}/g;
const LINKEDIN_REGEX = /linkedin\.com\/in\/([a-zA-Z0-9-]+)/i;
const EDUCATION_KEYWORDS = ['education', 'university', 'college', 'bachelor', 'master', 'phd', 'degree', 'diploma', 'school'];
const EXPERIENCE_KEYWORDS = ['experience', 'work', 'employment', 'job', 'career', 'position', 'role'];
const SKILLS_KEYWORDS = ['skills', 'technologies', 'tools', 'languages', 'frameworks', 'proficient', 'familiar'];
const DATE_REGEX = /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]* (\d{4})\s*(-|–|to)\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]* (\d{4})|(\d{4})\s*(-|–|to)\s*(\d{4})|(\d{4})\s*(-|–|to)\s*(present|current)/gi;

// Common technical skills for matching
const COMMON_TECH_SKILLS = [
  'javascript', 'typescript', 'python', 'java', 'cplusplus', 'csharp', 'ruby', 'php', 'swift', 'kotlin',
  'react', 'angular', 'vue', 'node', 'express', 'django', 'flask', 'spring', 'laravel', 'rails',
  'html', 'css', 'sass', 'less', 'tailwind', 'bootstrap', 'material-ui', 'styled-components',
  'aws', 'azure', 'gcp', 'firebase', 'docker', 'kubernetes', 'terraform', 'jenkins', 'circleci',
  'mongodb', 'mysql', 'postgresql', 'sql', 'oracle', 'redis', 'elasticsearch', 'dynamodb',
  'git', 'github', 'gitlab', 'bitbucket', 'jira', 'confluence', 'agile', 'scrum', 'kanban',
  'rest', 'graphql', 'grpc', 'websocket', 'oauth', 'jwt', 'api', 'microservices', 'serverless',
  'machine learning', 'ai', 'data science', 'nlp', 'computer vision', 'tensorflow', 'pytorch',
  'mobile', 'ios', 'android', 'react native', 'flutter', 'xamarin', 'cordova', 'ionic',
  'testing', 'jest', 'mocha', 'cypress', 'selenium', 'junit', 'pytest', 'tdd', 'bdd'
];

// No need to initialize pdf-parse

/**
 * Extract text content from a PDF buffer
 */
async function extractTextFromPdf(pdfBuffer: Buffer): Promise<string> {
  try {
    console.log("Extracting text from PDF using basic decoder...");

    // Use basic text decoder instead of pdf-parse
    const text = new TextDecoder().decode(pdfBuffer);

    // Clean up the text by removing non-printable characters
    const cleanedText = text.replace(/[\x00-\x09\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, '');

    console.log("Text extraction complete. Length:", cleanedText.length);
    return cleanedText;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Failed to extract text from PDF");
  }
}

/**
 * Extract sections from resume text
 */
function extractSections(text: string): Record<string, string> {
  console.log("Extracting sections from text...");
  const sections: Record<string, string> = {
    header: '',
    summary: '',
    education: '',
    experience: '',
    skills: '',
    projects: '',
    certifications: '',
    languages: ''
  };

  // Split text into lines
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);

  // Identify potential section headers
  const sectionHeaders: {[key: string]: number} = {};
  lines.forEach((line, index) => {
    const lowerLine = line.toLowerCase();

    if (lowerLine.includes('summary') || lowerLine.includes('objective') || lowerLine.includes('profile')) {
      sectionHeaders.summary = index;
    } else if (EDUCATION_KEYWORDS.some(keyword => lowerLine.includes(keyword)) && lowerLine.length < 30) {
      sectionHeaders.education = index;
    } else if (EXPERIENCE_KEYWORDS.some(keyword => lowerLine.includes(keyword)) && lowerLine.length < 30) {
      sectionHeaders.experience = index;
    } else if (SKILLS_KEYWORDS.some(keyword => lowerLine.includes(keyword)) && lowerLine.length < 30) {
      sectionHeaders.skills = index;
    } else if (lowerLine.includes('project') && lowerLine.length < 30) {
      sectionHeaders.projects = index;
    } else if (lowerLine.includes('certification') || lowerLine.includes('certificate') && lowerLine.length < 30) {
      sectionHeaders.certifications = index;
    } else if (lowerLine.includes('language') && lowerLine.length < 30) {
      sectionHeaders.languages = index;
    }
  });

  // Extract header (everything before the first section)
  const firstSectionIndex = Math.min(...Object.values(sectionHeaders).filter(val => val !== undefined));
  if (firstSectionIndex !== Infinity) {
    sections.header = lines.slice(0, firstSectionIndex).join('\n');
  } else {
    sections.header = lines.slice(0, Math.min(10, lines.length)).join('\n');
  }

  // Extract each section
  const sectionKeys = Object.keys(sectionHeaders);
  sectionKeys.forEach((section, i) => {
    const startIndex = sectionHeaders[section];
    const nextSection = sectionKeys.find(key => sectionHeaders[key] > startIndex);
    const endIndex = nextSection ? sectionHeaders[nextSection] : lines.length;

    if (startIndex !== undefined && endIndex !== undefined) {
      sections[section] = lines.slice(startIndex, endIndex).join('\n');
    }
  });

  console.log("Sections extracted:", Object.keys(sections).filter(key => sections[key]));
  return sections;
}

/**
 * Extract personal information from resume text
 */
function extractPersonalInfo(text: string): ResumeData['personal'] {
  console.log("Extracting personal information...");
  const personal: ResumeData['personal'] = {
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    linkedinUrl: ''
  };

  // Extract email
  const emailMatches = text.match(EMAIL_REGEX);
  if (emailMatches && emailMatches.length > 0) {
    personal.email = emailMatches[0];
  }

  // Extract phone
  const phoneMatches = text.match(PHONE_REGEX);
  if (phoneMatches && phoneMatches.length > 0) {
    personal.phone = phoneMatches[0];
  }

  // Extract LinkedIn URL
  const linkedinMatches = text.match(LINKEDIN_REGEX);
  if (linkedinMatches && linkedinMatches.length > 0) {
    personal.linkedinUrl = `https://linkedin.com/in/${linkedinMatches[1]}`;
  }

  // Extract name (usually at the beginning of the resume)
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  if (lines.length > 0) {
    // The first line is often the name
    const potentialName = lines[0];
    // Check if it's likely a name (no special characters, not too long)
    if (potentialName.length < 40 && !/[\\\/\@\#\$\%\^\&\*\(\)\[\]\{\}\<\>\=\+\_\-\d]/.test(potentialName)) {
      personal.name = potentialName;
    }
  }

  // Try to extract location from the first few lines
  const headerText = lines.slice(0, 5).join(' ');
  // Look for common location patterns like "City, State" or "City, Country"
  const locationMatches = headerText.match(/([A-Za-z\s]+,\s*[A-Za-z\s]+)/g);
  if (locationMatches && locationMatches.length > 0) {
    personal.location = locationMatches[0];
  }

  return personal;
}

/**
 * Extract skills from resume text
 */
function extractSkills(text: string, sections: Record<string, string>): string[] {
  console.log("Extracting skills...");
  const skills: string[] = [];

  // First check the skills section if it exists
  if (sections.skills) {
    // Check for common tech skills
    COMMON_TECH_SKILLS.forEach(skill => {
      const skillRegex = new RegExp(`\\b${skill}\\b`, 'i');
      if (skillRegex.test(sections.skills)) {
        skills.push(skill);
      }
    });
  }

  // If we didn't find many skills in the skills section, look through the entire document
  if (skills.length < 5) {
    COMMON_TECH_SKILLS.forEach(skill => {
      const skillRegex = new RegExp(`\\b${skill}\\b`, 'i');
      if (skillRegex.test(text) && !skills.includes(skill)) {
        skills.push(skill);
      }
    });
  }

  return skills;
}

/**
 * Extract work experience from resume text
 */
function extractWorkExperience(text: string, sections: Record<string, string>): ResumeData['workExperience'] {
  console.log("Extracting work experience...");
  const workExperience: ResumeData['workExperience'] = [];

  if (!sections.experience) {
    return workExperience;
  }

  // Split the experience section into paragraphs
  const paragraphs = sections.experience.split('\n\n').filter(p => p.trim());

  paragraphs.forEach(paragraph => {
    // Look for company and position patterns
    const lines = paragraph.split('\n').map(line => line.trim()).filter(line => line);
    if (lines.length < 2) return; // Need at least 2 lines for a valid experience entry

    const experience: {
      company: string;
      position: string;
      startDate: string;
      endDate: string | null;
      description: string;
    } = {
      company: '',
      position: '',
      startDate: '',
      endDate: null,
      description: ''
    };

    // First line is often the position
    experience.position = lines[0];

    // Second line is often the company
    if (lines[1].length < 100) { // Sanity check to avoid setting a description as company
      experience.company = lines[1];
    }

    // Look for dates
    const dateMatches = paragraph.match(DATE_REGEX);
    if (dateMatches && dateMatches.length > 0) {
      const dateParts = dateMatches[0].toLowerCase().split(/[-–to]+/);
      if (dateParts.length >= 2) {
        experience.startDate = dateParts[0].trim();
        experience.endDate = dateParts[1].trim();

        // Convert "present" or "current" to null for endDate
        if (experience.endDate.includes('present') || experience.endDate.includes('current')) {
          experience.endDate = null;
        }
      }
    }

    // The rest is the description
    experience.description = lines.slice(2).join('\n');

    // Only add if we have at least company or position
    if (experience.company || experience.position) {
      workExperience.push(experience);
    }
  });

  return workExperience;
}

/**
 * Extract education from resume text
 */
function extractEducation(text: string, sections: Record<string, string>): ResumeData['education'] {
  console.log("Extracting education...");
  const education: ResumeData['education'] = [];

  if (!sections.education) {
    return education;
  }

  // Split the education section into paragraphs
  const paragraphs = sections.education.split('\n\n').filter(p => p.trim());

  paragraphs.forEach(paragraph => {
    const lines = paragraph.split('\n').map(line => line.trim()).filter(line => line);
    if (lines.length < 2) return; // Need at least 2 lines for a valid education entry

    const edu: {
      institution: string;
      degree: string;
      field: string;
      startDate: string;
      endDate: string | null;
    } = {
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: null
    };

    // First line is often the institution
    edu.institution = lines[0];

    // Look for degree keywords in the remaining lines
    const degreeKeywords = ['bachelor', 'master', 'phd', 'doctorate', 'bs', 'ba', 'ms', 'ma', 'mba', 'b.s.', 'b.a.', 'm.s.', 'm.a.'];
    const degreeLines = lines.filter(line =>
      degreeKeywords.some(keyword => line.toLowerCase().includes(keyword))
    );

    if (degreeLines.length > 0) {
      // Try to separate degree and field
      const degreeLine = degreeLines[0];
      const degreeMatch = degreeLine.match(new RegExp(`(${degreeKeywords.join('|')}).*?(?:in|of)\\s+(.+)`, 'i'));

      if (degreeMatch) {
        edu.degree = degreeMatch[1].trim();
        edu.field = degreeMatch[2].trim();
      } else {
        edu.degree = degreeLine;
      }
    } else if (lines.length > 1) {
      // If no clear degree line, use the second line as degree
      edu.degree = lines[1];
    }

    // Look for dates
    const dateMatches = paragraph.match(DATE_REGEX);
    if (dateMatches && dateMatches.length > 0) {
      const dateParts = dateMatches[0].toLowerCase().split(/[-–to]+/);
      if (dateParts.length >= 2) {
        edu.startDate = dateParts[0].trim();
        edu.endDate = dateParts[1].trim();

        // Convert "present" or "current" to null for endDate
        if (edu.endDate.includes('present') || edu.endDate.includes('current')) {
          edu.endDate = null;
        }
      }
    }

    // Only add if we have at least institution or degree
    if (edu.institution || edu.degree) {
      education.push(edu);
    }
  });

  return education;
}

/**
 * Extract projects from resume text
 */
function extractProjects(text: string, sections: Record<string, string>): ResumeData['projects'] {
  console.log("Extracting projects...");
  const projects: ResumeData['projects'] = [];

  if (!sections.projects) {
    return projects;
  }

  // Split the projects section into paragraphs
  const paragraphs = sections.projects.split('\n\n').filter(p => p.trim());

  paragraphs.forEach(paragraph => {
    const lines = paragraph.split('\n').map(line => line.trim()).filter(line => line);
    if (lines.length < 2) return; // Need at least 2 lines for a valid project entry

    const project: {
      name: string;
      description: string;
      url: string;
    } = {
      name: '',
      description: '',
      url: ''
    };

    // First line is often the project name
    project.name = lines[0];

    // Look for URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urlMatches = paragraph.match(urlRegex);
    if (urlMatches && urlMatches.length > 0) {
      project.url = urlMatches[0];
    }

    // The rest is the description
    project.description = lines.slice(1).join('\n');

    // Only add if we have at least a name
    if (project.name) {
      projects.push(project);
    }
  });

  return projects;
}

/**
 * Extract certifications from resume text
 */
function extractCertifications(text: string, sections: Record<string, string>): ResumeData['certifications'] {
  console.log("Extracting certifications...");
  const certifications: ResumeData['certifications'] = [];

  if (!sections.certifications) {
    return certifications;
  }

  // Split the certifications section into lines
  const lines = sections.certifications.split('\n').map(line => line.trim()).filter(line => line);

  lines.forEach(line => {
    if (line.length < 5 || line.toLowerCase().includes('certification')) return; // Skip section headers

    const cert: {
      name: string;
      issuer: string;
      date: string;
    } = {
      name: line,
      issuer: '',
      date: ''
    };

    // Try to extract issuer if there's a dash or pipe
    const separators = [' - ', ' | ', ' – ', ' : '];
    for (const separator of separators) {
      if (line.includes(separator)) {
        const parts = line.split(separator);
        cert.name = parts[0].trim();
        cert.issuer = parts[1].trim();
        break;
      }
    }

    // Try to extract date
    const dateMatch = line.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]* \d{4}\b|\b\d{4}\b/i);
    if (dateMatch) {
      cert.date = dateMatch[0];
    }

    certifications.push(cert);
  });

  return certifications;
}

/**
 * Extract languages from resume text
 */
function extractLanguages(text: string, sections: Record<string, string>): ResumeData['languages'] {
  console.log("Extracting languages...");
  const languages: ResumeData['languages'] = [];

  if (!sections.languages) {
    return languages;
  }

  // Common languages
  const commonLanguages = [
    'english', 'spanish', 'french', 'german', 'chinese', 'japanese', 'korean',
    'russian', 'arabic', 'hindi', 'portuguese', 'italian', 'dutch', 'swedish',
    'norwegian', 'danish', 'finnish', 'polish', 'turkish', 'greek', 'hebrew'
  ];

  // Common proficiency levels
  const proficiencyLevels = [
    'native', 'fluent', 'proficient', 'intermediate', 'advanced', 'beginner', 'basic',
    'elementary', 'professional', 'working', 'limited', 'c2', 'c1', 'b2', 'b1', 'a2', 'a1'
  ];

  // Split the languages section into lines
  const lines = sections.languages.split('\n').map(line => line.trim()).filter(line => line);

  lines.forEach(line => {
    if (line.length < 3 || line.toLowerCase() === 'languages') return; // Skip section headers

    // Check if the line contains a common language
    const foundLanguage = commonLanguages.find(lang => line.toLowerCase().includes(lang));
    if (foundLanguage) {
      const lang: {
        name: string;
        proficiency: string;
      } = {
        name: foundLanguage.charAt(0).toUpperCase() + foundLanguage.slice(1),
        proficiency: ''
      };

      // Try to extract proficiency level
      const foundProficiency = proficiencyLevels.find(level => line.toLowerCase().includes(level));
      if (foundProficiency) {
        lang.proficiency = foundProficiency.charAt(0).toUpperCase() + foundProficiency.slice(1);
      }

      languages.push(lang);
    }
  });

  return languages;
}

/**
 * Extract summary from resume text
 */
function extractSummary(text: string, sections: Record<string, string>): string {
  console.log("Extracting summary...");

  if (sections.summary) {
    // Get the first paragraph from the summary section
    const paragraphs = sections.summary.split('\n\n').filter(p => p.trim());
    if (paragraphs.length > 0) {
      return paragraphs[0].replace(/summary|profile|objective/i, '').trim();
    }
  }

  // If no summary section, try to find a paragraph that looks like a summary
  const paragraphs = text.split('\n\n').filter(p => p.trim());
  for (const paragraph of paragraphs) {
    if (
      paragraph.length > 50 &&
      paragraph.length < 500 &&
      !paragraph.includes('@') &&
      !paragraph.includes('http') &&
      !paragraph.match(/\d{4}/) // No dates
    ) {
      return paragraph.trim();
    }
  }

  return '';
}

/**
 * Main function to parse a PDF resume
 */
export async function parsePdfResume(pdfBuffer: Buffer): Promise<ResumeData> {
  try {
    console.log("Starting PDF resume parsing...");

    // Extract text from PDF
    const text = await extractTextFromPdf(pdfBuffer);

    // Extract sections from the text
    const sections = extractSections(text);

    // Extract personal information
    const personal = extractPersonalInfo(text);

    // Extract summary
    personal.summary = extractSummary(text, sections);

    // Extract skills
    const skills = extractSkills(text, sections);

    // Extract work experience
    const workExperience = extractWorkExperience(text, sections);

    // Extract education
    const education = extractEducation(text, sections);

    // Extract projects
    const projects = extractProjects(text, sections);

    // Extract certifications
    const certifications = extractCertifications(text, sections);

    // Extract languages
    const languages = extractLanguages(text, sections);

    // Construct the resume data
    const resumeData: ResumeData = {
      personal,
      skills,
      workExperience,
      education,
      projects,
      certifications,
      languages
    };

    console.log("Resume parsing complete!");
    return resumeData;
  } catch (error) {
    console.error("Error parsing PDF resume:", error);
    throw new Error("Failed to parse PDF resume");
  }
}
