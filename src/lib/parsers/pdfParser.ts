import { ResumeData } from "@/types/resume";

export async function parsePdfFile(fileBuffer: Buffer): Promise<ResumeData | null> {
  try {
    console.log("Starting PDF parsing...");
    console.log("Buffer size:", fileBuffer.length);

    // Extract text from PDF using TextDecoder
    const text = new TextDecoder().decode(fileBuffer);
    console.log("Extracted text length:", text.length);

    // Clean up the text by removing non-printable characters
    const cleanedText = text.replace(/[\x00-\x09\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, '');

    // Split into lines for easier processing
    const lines = cleanedText.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);

    // Extract resume data from the text
    const resumeData = extractDataFromText(cleanedText, lines);

    console.log("Successfully parsed PDF data");
    return resumeData;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    // Return a default resume structure instead of null
    return {
      personal: {
        name: "PDF Parsing Error",
        email: "example@example.com",
        phone: "(123) 456-7890",
        location: "Location",
        summary: "There was an error parsing your PDF. Please try a different file or enter your information manually.",
        linkedinUrl: ""
      },
      skills: [],
      workExperience: [],
      education: [],
      projects: [],
      certifications: [],
      languages: []
    };
  }
}

/**
 * Extract resume data from text content
 */
function extractDataFromText(text: string, lines: string[]): ResumeData {
  console.log("Extracting data from text...");

  // Extract personal information
  const personal = extractPersonalInfo(text, lines);

  // Extract skills
  const skills = extractSkills(text);

  // Extract work experience
  const workExperience = extractWorkExperience(text, lines);

  // Extract education
  const education = extractEducation(text, lines);

  // Extract projects
  const projects = extractProjects(text, lines);

  // Extract certifications
  const certifications = extractCertifications(text, lines);

  // Extract languages
  const languages = extractLanguages(text);

  return {
    personal,
    skills,
    workExperience,
    education,
    projects,
    certifications,
    languages
  };
}

/**
 * Extract personal information from text
 */
function extractPersonalInfo(text: string, lines: string[]): ResumeData['personal'] {
  const personal: ResumeData['personal'] = {
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    linkedinUrl: ''
  };

  // Extract name (usually at the beginning of the resume)
  if (lines.length > 0) {
    // The first line is often the name if it's not too long
    const potentialName = lines[0];
    if (potentialName.length < 40) {
      personal.name = potentialName;
    }
  }

  // Extract email using regex
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    personal.email = emailMatch[0];
  }

  // Extract phone using regex
  const phoneMatch = text.match(/\+?[0-9]{1,3}[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}/);
  if (phoneMatch) {
    personal.phone = phoneMatch[0];
  }

  // Extract LinkedIn URL
  const linkedinMatch = text.match(/linkedin\.com\/in\/[a-zA-Z0-9-]+/);
  if (linkedinMatch) {
    personal.linkedinUrl = linkedinMatch[0];
  }

  // Extract location (look for common patterns like "City, State" or "City, Country")
  const locationMatch = text.match(/[A-Z][a-z]+,\s*[A-Z][a-z]+/);
  if (locationMatch) {
    personal.location = locationMatch[0];
  }

  // Extract summary
  const summarySection = findSection(text, ['summary', 'professional summary', 'profile', 'objective']);
  if (summarySection) {
    personal.summary = summarySection.substring(0, 300); // Limit to 300 characters
  }

  return personal;
}

/**
 * Extract skills from text
 */
function extractSkills(text: string): string[] {
  const skills: string[] = [];
  const lowerText = text.toLowerCase();

  // Common skills to look for
  const commonSkills = [
    'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'ruby', 'php',
    'react', 'angular', 'vue', 'node', 'express', 'django', 'flask', 'spring',
    'html', 'css', 'sass', 'less', 'tailwind', 'bootstrap',
    'aws', 'azure', 'gcp', 'firebase', 'docker', 'kubernetes',
    'mongodb', 'mysql', 'postgresql', 'sql', 'oracle', 'redis',
    'git', 'github', 'gitlab', 'jira', 'agile', 'scrum',
    'rest', 'graphql', 'api', 'microservices', 'serverless',
    'machine learning', 'ai', 'data science', 'nlp',
    'mobile', 'ios', 'android', 'react native', 'flutter'
  ];

  // Check for each skill
  commonSkills.forEach(skill => {
    if (lowerText.includes(skill)) {
      // Capitalize the first letter of each word
      const formattedSkill = skill.replace(/\b\w/g, c => c.toUpperCase());
      skills.push(formattedSkill);
    }
  });

  return skills;
}

/**
 * Extract work experience from text
 */
function extractWorkExperience(_text: string, lines: string[]): ResumeData['workExperience'] {
  const workExperience: ResumeData['workExperience'] = [];

  // Look for experience section
  const experienceIndex = findSectionIndex(lines, ['experience', 'employment', 'work history']);
  if (experienceIndex === -1) return workExperience;

  // Find the next section after experience
  const nextSectionIndex = findNextSectionIndex(lines, experienceIndex);

  // Extract the experience section
  const experienceLines = lines.slice(experienceIndex + 1, nextSectionIndex !== -1 ? nextSectionIndex : undefined);

  // Process the experience section
  let currentJob: any = null;

  for (let i = 0; i < experienceLines.length; i++) {
    const line = experienceLines[i];

    // Look for date patterns that might indicate a new job entry
    const dateMatch = line.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\s*[-–]\s*(Present|Current|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)\s*\d{0,4}|\d{4}\s*[-–]\s*(Present|Current|\d{4})/i);

    if (dateMatch) {
      // If we find a date, it's likely a new job entry
      if (currentJob && (currentJob.company || currentJob.position)) {
        workExperience.push(currentJob);
      }

      currentJob = {
        company: i > 0 ? experienceLines[i - 1] : '',
        position: i > 1 ? experienceLines[i - 2] : '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      };

      // Parse the date range
      const dateRange = dateMatch[0];
      if (dateRange.toLowerCase().includes('present') || dateRange.toLowerCase().includes('current')) {
        currentJob.current = true;
        const parts = dateRange.split(/[-–]/);
        currentJob.startDate = parts[0].trim();
      } else {
        const parts = dateRange.split(/[-–]/);
        if (parts.length >= 2) {
          currentJob.startDate = parts[0].trim();
          currentJob.endDate = parts[1].trim();
        }
      }

      // Collect description from the next few lines
      let description = '';
      for (let j = i + 1; j < Math.min(i + 5, experienceLines.length); j++) {
        if (!experienceLines[j].match(/\d{4}/) && !experienceLines[j].match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i)) {
          description += experienceLines[j] + ' ';
        } else {
          break;
        }
      }

      currentJob.description = description.trim();
    }
  }

  // Add the last job if it exists
  if (currentJob && (currentJob.company || currentJob.position)) {
    workExperience.push(currentJob);
  }

  return workExperience;
}

/**
 * Extract education from text
 */
function extractEducation(_text: string, lines: string[]): ResumeData['education'] {
  const education: ResumeData['education'] = [];

  // Look for education section
  const educationIndex = findSectionIndex(lines, ['education', 'academic', 'university', 'college']);
  if (educationIndex === -1) return education;

  // Find the next section after education
  const nextSectionIndex = findNextSectionIndex(lines, educationIndex);

  // Extract the education section
  const educationLines = lines.slice(educationIndex + 1, nextSectionIndex !== -1 ? nextSectionIndex : undefined);

  // Process the education section
  let currentEducation: any = null;

  for (let i = 0; i < educationLines.length; i++) {
    const line = educationLines[i].toLowerCase();

    // Look for degree keywords
    const hasDegree = line.includes('bachelor') || line.includes('master') || line.includes('phd') ||
                      line.includes('b.s.') || line.includes('b.a.') || line.includes('m.s.') ||
                      line.includes('m.a.') || line.includes('degree');

    if (hasDegree) {
      // If we find a degree, it's likely a new education entry
      if (currentEducation && currentEducation.institution) {
        education.push(currentEducation);
      }

      currentEducation = {
        institution: i > 0 ? educationLines[i - 1] : '',
        degree: educationLines[i],
        field: '',
        startDate: '',
        endDate: ''
      };

      // Look for dates
      for (let j = i; j < Math.min(i + 3, educationLines.length); j++) {
        const dateMatch = educationLines[j].match(/\d{4}\s*[-–]\s*\d{4}|\d{4}\s*[-–]\s*(Present|Current)|\d{4}/i);
        if (dateMatch) {
          const dateRange = dateMatch[0];
          if (dateRange.includes('-') || dateRange.includes('–')) {
            const parts = dateRange.split(/[-–]/);
            currentEducation.startDate = parts[0].trim();
            currentEducation.endDate = parts[1].trim();
          } else {
            // Just a single year, assume it's the end date
            currentEducation.endDate = dateRange.trim();
          }
          break;
        }
      }

      // Try to extract field of study
      if (educationLines[i].includes('in ')) {
        const parts = educationLines[i].split('in ');
        if (parts.length > 1) {
          currentEducation.field = parts[1].trim();
        }
      }
    }
  }

  // Add the last education entry if it exists
  if (currentEducation && currentEducation.institution) {
    education.push(currentEducation);
  }

  return education;
}

/**
 * Extract projects from text
 */
function extractProjects(_text: string, lines: string[]): ResumeData['projects'] {
  const projects: ResumeData['projects'] = [];

  // Look for projects section
  const projectsIndex = findSectionIndex(lines, ['projects', 'project experience', 'key projects']);
  if (projectsIndex === -1) return projects;

  // Find the next section after projects
  const nextSectionIndex = findNextSectionIndex(lines, projectsIndex);

  // Extract the projects section
  const projectLines = lines.slice(projectsIndex + 1, nextSectionIndex !== -1 ? nextSectionIndex : undefined);

  // Process the projects section
  let currentProject: any = null;

  for (let i = 0; i < projectLines.length; i++) {
    const line = projectLines[i];

    // Look for project name (usually short, starts with capital letter)
    if (line.length < 50 && /^[A-Z]/.test(line) && !line.match(/\d{4}/) && !currentProject) {
      currentProject = {
        name: line,
        description: '',
        technologies: []
      };
    } else if (currentProject) {
      // Add to description
      currentProject.description += line + ' ';

      // If we encounter a line that looks like a new project or we've collected enough description
      if ((i < projectLines.length - 1 && projectLines[i + 1].length < 50 && /^[A-Z]/.test(projectLines[i + 1]) && !projectLines[i + 1].match(/\d{4}/)) ||
          currentProject.description.length > 200) {

        // Extract technologies from description
        const techKeywords = ['javascript', 'typescript', 'python', 'java', 'react', 'angular', 'vue', 'node', 'express', 'django', 'flask', 'spring', 'html', 'css', 'aws', 'azure', 'gcp', 'firebase', 'mongodb', 'mysql', 'postgresql', 'sql'];

        techKeywords.forEach(tech => {
          if (currentProject.description.toLowerCase().includes(tech)) {
            // Capitalize the first letter
            const formattedTech = tech.charAt(0).toUpperCase() + tech.slice(1);
            if (!currentProject.technologies.includes(formattedTech)) {
              currentProject.technologies.push(formattedTech);
            }
          }
        });

        // Trim the description
        currentProject.description = currentProject.description.trim();

        // Add the project
        projects.push(currentProject);
        currentProject = null;
      }
    }
  }

  // Add the last project if it exists
  if (currentProject) {
    // Extract technologies from description
    const techKeywords = ['javascript', 'typescript', 'python', 'java', 'react', 'angular', 'vue', 'node', 'express', 'django', 'flask', 'spring', 'html', 'css', 'aws', 'azure', 'gcp', 'firebase', 'mongodb', 'mysql', 'postgresql', 'sql'];

    techKeywords.forEach(tech => {
      if (currentProject.description.toLowerCase().includes(tech)) {
        // Capitalize the first letter
        const formattedTech = tech.charAt(0).toUpperCase() + tech.slice(1);
        if (!currentProject.technologies.includes(formattedTech)) {
          currentProject.technologies.push(formattedTech);
        }
      }
    });

    // Trim the description
    currentProject.description = currentProject.description.trim();

    // Add the project
    projects.push(currentProject);
  }

  return projects;
}

/**
 * Extract certifications from text
 */
function extractCertifications(_text: string, lines: string[]): ResumeData['certifications'] {
  const certifications: ResumeData['certifications'] = [];

  // Look for certifications section
  const certIndex = findSectionIndex(lines, ['certifications', 'certificates', 'certification']);
  if (certIndex === -1) return certifications;

  // Find the next section after certifications
  const nextSectionIndex = findNextSectionIndex(lines, certIndex);

  // Extract the certifications section
  const certLines = lines.slice(certIndex + 1, nextSectionIndex !== -1 ? nextSectionIndex : undefined);

  // Process the certifications section
  let currentCert: any = null;

  for (let i = 0; i < certLines.length; i++) {
    const line = certLines[i];

    // Look for certification name (usually short, starts with capital letter)
    if (line.length < 100 && /^[A-Z]/.test(line) && !currentCert) {
      currentCert = {
        name: line,
        issuer: '',
        date: ''
      };

      // Try to extract date from the line
      const dateMatch = line.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)[\s,]+\d{4}|\d{4}/i);
      if (dateMatch) {
        currentCert.date = dateMatch[0];
      }
    } else if (currentCert && !currentCert.issuer) {
      // The next line might be the issuer
      currentCert.issuer = line;

      // If no date was found in the name, try to find it in the issuer line
      if (!currentCert.date) {
        const dateMatch = line.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)[\s,]+\d{4}|\d{4}/i);
        if (dateMatch) {
          currentCert.date = dateMatch[0];
        }
      }

      // Add the certification and reset
      certifications.push(currentCert);
      currentCert = null;
    }
  }

  // Add the last certification if it exists
  if (currentCert && currentCert.name) {
    certifications.push(currentCert);
  }

  return certifications;
}

/**
 * Extract languages from text
 */
function extractLanguages(text: string): ResumeData['languages'] {
  const languages: ResumeData['languages'] = [];
  const lowerText = text.toLowerCase();

  // Common languages to look for
  const languageKeywords = [
    'english', 'spanish', 'french', 'german', 'chinese', 'japanese', 'korean', 'russian', 'arabic', 'portuguese', 'italian', 'hindi', 'bengali', 'urdu', 'dutch', 'turkish', 'vietnamese', 'polish', 'thai'
  ];

  // Common proficiency levels
  const proficiencyKeywords = [
    'native', 'fluent', 'proficient', 'intermediate', 'beginner', 'basic', 'advanced', 'conversational', 'elementary', 'limited'
  ];

  // Check for each language
  languageKeywords.forEach(language => {
    if (lowerText.includes(language)) {
      // Try to find proficiency level
      let proficiency = 'Proficient'; // Default

      for (const level of proficiencyKeywords) {
        // Look for patterns like "English: Fluent" or "Fluent in English"
        const pattern1 = new RegExp(`${language}[:\\s]+(.*?)${level}`, 'i');
        const pattern2 = new RegExp(`${level}[:\\s]+(.*?)${language}`, 'i');

        if (lowerText.match(pattern1) || lowerText.match(pattern2)) {
          // Capitalize the first letter
          proficiency = level.charAt(0).toUpperCase() + level.slice(1);
          break;
        }
      }

      // Capitalize the first letter of the language
      const formattedLanguage = language.charAt(0).toUpperCase() + language.slice(1);

      languages.push({
        language: formattedLanguage,
        proficiency
      });
    }
  });

  return languages;
}

/**
 * Find a section in the text based on possible headers
 */
function findSection(text: string, possibleHeaders: string[]): string | null {
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

/**
 * Find the index of a section in the resume
 */
function findSectionIndex(lines: string[], keywords: string[]): number {
  for (let i = 0; i < lines.length; i++) {
    const lowerLine = lines[i].toLowerCase();
    if (keywords.some(keyword => lowerLine.includes(keyword)) && lowerLine.length < 30) {
      return i;
    }
  }
  return -1;
}

/**
 * Find the index of the next section after a given index
 */
function findNextSectionIndex(lines: string[], startIndex: number): number {
  const sectionKeywords = [
    'experience', 'education', 'skills', 'projects', 'certifications',
    'languages', 'summary', 'objective', 'profile', 'interests', 'activities'
  ];

  for (let i = startIndex + 1; i < lines.length; i++) {
    const lowerLine = lines[i].toLowerCase();
    if (sectionKeywords.some(keyword => lowerLine.includes(keyword)) && lowerLine.length < 30) {
      return i;
    }
  }

  return -1;
}
