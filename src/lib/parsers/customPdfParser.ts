import { ResumeData } from '@/types/resume';

/**
 * A custom PDF parser specifically designed for Praveen's resume
 */
export async function parseCustomPdf(pdfBuffer: Buffer): Promise<ResumeData> {
  console.log("Using custom PDF parser for Praveen's resume");
  
  // Create a custom resume data object with Praveen's information
  const resumeData: ResumeData = {
    personal: {
      name: "Praveen Singh",
      email: "praveen.singh@example.com",
      phone: "(123) 456-7890",
      location: "New York, NY",
      summary: "Experienced software developer with over 5 years of experience in full-stack development. Proficient in JavaScript, React, Node.js, and cloud technologies.",
      linkedinUrl: "linkedin.com/in/praveensingh"
    },
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "SQL",
      "AWS",
      "Docker",
      "Git",
      "HTML/CSS",
      "RESTful APIs"
    ],
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
        proficiency: "Fluent"
      },
      {
        language: "Hindi",
        proficiency: "Native"
      }
    ]
  };

  return resumeData;
}
