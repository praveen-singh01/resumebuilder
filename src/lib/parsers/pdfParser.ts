import { ResumeData } from "@/types/resume";

export async function parsePdfFile(fileBuffer: Buffer): Promise<ResumeData | null> {
  try {
    console.log("Starting PDF parsing...");
    console.log("Buffer size:", fileBuffer.length);

    // Extract the filename from the buffer (this is a mock implementation)
    const fileName = "resume.pdf";

    // Create a mock resume data based on the file
    const resumeData: ResumeData = {
      personal: {
        name: "Praveen Singh",
        email: "praveen.singh@example.com",
        phone: "(123) 456-7890",
        location: "New York, NY",
        summary: "Experienced software developer with a strong background in web development and a passion for creating elegant, efficient solutions. Skilled in JavaScript, React, and Node.js.",
        linkedinUrl: "linkedin.com/in/praveensingh"
      },
      skills: ["JavaScript", "TypeScript", "React", "Node.js", "HTML/CSS", "Git", "RESTful APIs", "MongoDB", "SQL", "AWS"],
      workExperience: [
        {
          company: "Tech Innovations Inc.",
          position: "Senior Software Developer",
          startDate: "Jan 2020",
          endDate: "",
          current: true,
          description: "Lead development of web applications using React and Node.js. Implemented CI/CD pipelines and improved application performance by 40%."
        },
        {
          company: "Digital Solutions LLC",
          position: "Software Developer",
          startDate: "Jun 2018",
          endDate: "Dec 2019",
          current: false,
          description: "Developed and maintained multiple web applications. Collaborated with cross-functional teams to deliver projects on time and within budget."
        }
      ],
      education: [
        {
          institution: "University of Technology",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2014",
          endDate: "2018"
        }
      ],
      projects: [
        {
          name: "E-commerce Platform",
          description: "Developed a full-stack e-commerce platform with payment integration",
          technologies: ["React", "Node.js", "MongoDB", "Stripe"]
        },
        {
          name: "Task Management App",
          description: "Built a collaborative task management application with real-time updates",
          technologies: ["React", "Firebase", "Material UI"]
        }
      ],
      certifications: [
        {
          name: "AWS Certified Developer",
          issuer: "Amazon Web Services",
          date: "2021"
        },
        {
          name: "React Developer Certification",
          issuer: "Meta",
          date: "2020"
        }
      ],
      languages: [
        {
          language: "English",
          proficiency: "Native"
        },
        {
          language: "Hindi",
          proficiency: "Native"
        },
        {
          language: "Spanish",
          proficiency: "Intermediate"
        }
      ]
    };

    console.log("Created mock resume data");
    return resumeData;
  } catch (error) {
    console.error("Error creating mock resume data:", error);
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
      skills: ["JavaScript", "React", "Node.js"],
      workExperience: [],
      education: [],
      projects: [],
      certifications: [],
      languages: []
    };
  }
}

function extractDataFromText(text: string): ResumeData {
  console.log("Starting data extraction from text...");

  // Clean up the text
  const cleanText = text.replace(/\s+/g, ' ').trim();
  const lines = cleanText.split("\n").filter(line => line.trim() !== "");

  console.log("Number of lines:", lines.length);
  if (lines.length > 0) {
    console.log("First line:", lines[0]);
  }

  // Extract name (usually the first line or a line with larger font)
  let fullName = "";
  if (lines.length > 0) {
    // Try to find a name-like pattern in the first few lines
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      const line = lines[i].trim();
      // Look for a line that looks like a name (2-3 words, each capitalized)
      if (/^[A-Z][a-z]+(\s[A-Z][a-z]+){1,2}$/.test(line)) {
        fullName = line;
        break;
      }
    }

    // If no name found, use the first line
    if (!fullName && lines.length > 0) {
      fullName = lines[0].trim();
    }
  }

  console.log("Extracted name:", fullName);

  // Find email using regex
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const emailMatch = text.match(emailRegex);
  const email = emailMatch ? emailMatch[0] : "";
  console.log("Extracted email:", email);

  // Find phone using regex
  const phoneRegex = /(\+\d{1,3}[-\s]?)?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}/;
  const phoneMatch = text.match(phoneRegex);
  const phone = phoneMatch ? phoneMatch[0] : "";
  console.log("Extracted phone:", phone);

  // Find LinkedIn URL
  const linkedinRegex = /linkedin\.com\/in\/[a-zA-Z0-9-]+/;
  const linkedinMatch = text.match(linkedinRegex);
  const linkedinUrl = linkedinMatch ? `https://www.${linkedinMatch[0]}` : "";
  console.log("Extracted LinkedIn URL:", linkedinUrl);

  // Find location
  const locationRegex = /([A-Z][a-zA-Z]+[,]?\s*[A-Z]{2}|[A-Z][a-zA-Z]+[,]\s*[A-Z][a-zA-Z]+)/;
  const locationMatch = text.match(locationRegex);
  const location = locationMatch ? locationMatch[0] : "";
  console.log("Extracted location:", location);

  // Extract skills
  const skillsKeywords = [
    "JavaScript", "TypeScript", "React", "Angular", "Vue", "Node.js", "Express",
    "HTML", "CSS", "SASS", "LESS", "Bootstrap", "Tailwind", "Material UI",
    "Python", "Java", "C#", "C++", "Ruby", "PHP", "Swift", "Kotlin",
    "SQL", "MongoDB", "PostgreSQL", "MySQL", "Oracle", "Firebase",
    "AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Git", "GitHub",
    "Agile", "Scrum", "Jira", "REST API", "GraphQL", "Microservices",
    "Testing", "Jest", "Mocha", "Cypress", "Selenium", "TDD", "BDD"
  ];

  const skills: string[] = [];

  // Look for skills in the text
  for (const skill of skillsKeywords) {
    const skillRegex = new RegExp(`\\b${skill}\\b`, 'i');
    if (skillRegex.test(text)) {
      skills.push(skill);
    }
  }

  console.log("Extracted skills:", skills);

  // Extract summary
  let summary = "";
  const summarySection = findSection(text, ["SUMMARY", "PROFESSIONAL SUMMARY", "OBJECTIVE", "PROFILE"]);
  if (summarySection) {
    summary = summarySection.substring(0, 300); // Limit to 300 characters
  } else {
    // If no summary section found, try to extract the first paragraph
    const paragraphs = text.split('\n\n');
    if (paragraphs.length > 1) {
      summary = paragraphs[1].trim().substring(0, 300);
    }
  }

  console.log("Extracted summary:", summary ? summary.substring(0, 50) + "..." : "None");

  // Extract education
  const educationSection = findSection(text, ["EDUCATION", "ACADEMIC", "QUALIFICATION"]);
  let education: { institute: string; degree: string; year: string }[] = [];

  if (educationSection) {
    education = parseEducation(educationSection);
  }

  console.log("Extracted education:", education.length, "items");

  // Extract work experience
  const experienceSection = findSection(text, ["EXPERIENCE", "WORK EXPERIENCE", "EMPLOYMENT", "PROFESSIONAL EXPERIENCE"]);
  let workExperience: { company: string; role: string; duration: string; description: string }[] = [];

  if (experienceSection) {
    workExperience = parseWorkExperience(experienceSection);
  }

  console.log("Extracted work experience:", workExperience.length, "items");

  // Extract projects
  const projectsSection = findSection(text, ["PROJECTS", "PROJECT EXPERIENCE", "KEY PROJECTS"]);
  let projects: { name: string; description: string; technologies: string[] }[] = [];

  if (projectsSection) {
    const projectLines = projectsSection.split('\n');
    let currentProject: { name: string; description: string; technologies: string[] } | null = null;

    for (const line of projectLines) {
      const trimmedLine = line.trim();
      if (trimmedLine.length === 0) continue;

      // If line starts with a capital letter and is short, it might be a project name
      if (/^[A-Z]/.test(trimmedLine) && trimmedLine.length < 50 && !currentProject) {
        currentProject = {
          name: trimmedLine,
          description: "",
          technologies: []
        };
      } else if (currentProject) {
        // Add to description
        currentProject.description += trimmedLine + " ";

        // Look for technologies in the line
        for (const skill of skillsKeywords) {
          const skillRegex = new RegExp(`\\b${skill}\\b`, 'i');
          if (skillRegex.test(trimmedLine) && !currentProject.technologies.includes(skill)) {
            currentProject.technologies.push(skill);
          }
        }

        // If line ends with a period and is long enough, end the project
        if (trimmedLine.endsWith(".") && currentProject.description.length > 30) {
          projects.push(currentProject);
          currentProject = null;
        }
      }
    }

    // Add the last project if it exists
    if (currentProject) {
      projects.push(currentProject);
    }
  }

  console.log("Extracted projects:", projects.length, "items");

  // Extract languages
  const languagesSection = findSection(text, ["LANGUAGES", "LANGUAGE SKILLS"]);
  const languages: { language: string; proficiency: string }[] = [];

  if (languagesSection) {
    const languageKeywords = ["English", "Spanish", "French", "German", "Chinese", "Japanese", "Korean", "Russian", "Arabic", "Portuguese", "Italian"];
    const proficiencyKeywords = ["Native", "Fluent", "Proficient", "Intermediate", "Beginner", "Basic"];

    for (const language of languageKeywords) {
      const languageRegex = new RegExp(`\\b${language}\\b`, 'i');
      if (languageRegex.test(languagesSection)) {
        let proficiency = "Proficient";

        // Try to find proficiency level
        for (const level of proficiencyKeywords) {
          const proficiencyRegex = new RegExp(`\\b${language}\\s+(?:[^\\n]*?)\\b${level}\\b|\\b${level}\\b(?:[^\\n]*?)\\b${language}\\b`, 'i');
          if (proficiencyRegex.test(languagesSection)) {
            proficiency = level;
            break;
          }
        }

        languages.push({
          language,
          proficiency
        });
      }
    }
  }

  console.log("Extracted languages:", languages.length, "items");

  // Extract certifications
  const certificationsSection = findSection(text, ["CERTIFICATIONS", "CERTIFICATES", "CERTIFICATION"]);
  const certifications: { name: string; issuer: string; date: string }[] = [];

  if (certificationsSection) {
    const certLines = certificationsSection.split('\n');
    let currentCert: { name: string; issuer: string; date: string } | null = null;

    for (const line of certLines) {
      const trimmedLine = line.trim();
      if (trimmedLine.length === 0) continue;

      // If line starts with a capital letter and is short, it might be a certification name
      if (/^[A-Z]/.test(trimmedLine) && trimmedLine.length < 100 && !currentCert) {
        currentCert = {
          name: trimmedLine,
          issuer: "",
          date: ""
        };

        // Try to extract date from the line
        const dateRegex = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)[\s,]+\d{4}|\d{4}/i;
        const dateMatch = trimmedLine.match(dateRegex);
        if (dateMatch) {
          currentCert.date = dateMatch[0];
        }
      } else if (currentCert && !currentCert.issuer) {
        // The next line might be the issuer
        currentCert.issuer = trimmedLine;
        certifications.push(currentCert);
        currentCert = null;
      }
    }

    // Add the last certification if it exists
    if (currentCert) {
      certifications.push(currentCert);
    }
  }

  console.log("Extracted certifications:", certifications.length, "items");

  return {
    personal: {
      name: fullName,
      email,
      phone,
      location,
      summary,
      linkedinUrl
    },
    skills,
    education: education.map(edu => ({
      institution: edu.institute,
      degree: edu.degree,
      field: edu.degree.split(' in ')[1] || '',
      startDate: edu.year.split('-')[0]?.trim() || '',
      endDate: edu.year.split('-')[1]?.trim() || ''
    })),
    workExperience: workExperience.map(exp => ({
      company: exp.company,
      position: exp.role,
      startDate: exp.duration.split('-')[0]?.trim() || '',
      endDate: exp.duration.split('-')[1]?.trim() || '',
      current: exp.duration.toLowerCase().includes('present'),
      description: exp.description
    })),
    certifications,
    projects,
    languages
  };
}

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
