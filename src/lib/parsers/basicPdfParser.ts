import { ResumeData } from '@/types/resume';

/**
 * A very basic PDF parser that uses simple regex patterns to extract information
 * This avoids any complex dependencies or regex issues
 */
export async function parseBasicPdf(pdfBuffer: Buffer): Promise<ResumeData> {
  console.log("Using basic PDF parser");
  
  try {
    // Extract text using basic decoder
    const text = new TextDecoder().decode(pdfBuffer);
    console.log("Extracted text length:", text.length);
    
    // Clean up the text
    const cleanedText = text.replace(/[\x00-\x09\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, '');
    
    // Split into lines
    const lines = cleanedText.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
    
    // Extract basic information
    const personal = extractPersonalInfo(cleanedText, lines);
    const skills = extractSkills(cleanedText);
    const workExperience = extractWorkExperience(cleanedText, lines);
    const education = extractEducation(cleanedText, lines);
    
    return {
      personal,
      skills,
      workExperience,
      education,
      projects: [],
      certifications: [],
      languages: []
    };
  } catch (error) {
    console.error("Error in basic PDF parser:", error);
    
    // Return an empty structure
    return {
      personal: {
        name: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
        linkedinUrl: ''
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
 * Extract personal information using simple regex patterns
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
  
  // Extract email using a simple regex
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    personal.email = emailMatch[0];
  }
  
  // Extract phone using a simple regex
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
  
  return personal;
}

/**
 * Extract skills using simple keyword matching
 */
function extractSkills(text: string): string[] {
  const skills: string[] = [];
  const lowerText = text.toLowerCase();
  
  // Common skills to look for
  const commonSkills = [
    'javascript', 'typescript', 'python', 'java', 'cplusplus', 'csharp', 'ruby', 'php',
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
      skills.push(skill);
    }
  });
  
  return skills;
}

/**
 * Extract work experience using simple patterns
 */
function extractWorkExperience(text: string, lines: string[]): ResumeData['workExperience'] {
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
 * Extract education using simple patterns
 */
function extractEducation(text: string, lines: string[]): ResumeData['education'] {
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
    }
  }
  
  // Add the last education entry if it exists
  if (currentEducation && currentEducation.institution) {
    education.push(currentEducation);
  }
  
  return education;
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
