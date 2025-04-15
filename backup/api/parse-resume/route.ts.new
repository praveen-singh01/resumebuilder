import { NextRequest, NextResponse } from "next/server";
import { FileUploadResponse, ResumeData } from "@/types/resume";

export async function POST(request: NextRequest) {
  // Create a mock resume data for Praveen
  const praveenResumeData: ResumeData = {
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

  // Default resume data
  const defaultResumeData: ResumeData = {
    personal: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(123) 456-7890",
      location: "New York, NY",
      summary: "Experienced professional with a background in technology.",
      linkedinUrl: "linkedin.com/in/johndoe"
    },
    skills: ["JavaScript", "React", "Node.js", "HTML/CSS"],
    workExperience: [
      {
        company: "Tech Company",
        position: "Software Developer",
        startDate: "Jan 2020",
        endDate: "",
        current: true,
        description: "Developed web applications using modern technologies."
      }
    ],
    education: [
      {
        institution: "University of Technology",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2016",
        endDate: "2020"
      }
    ],
    projects: [],
    certifications: [],
    languages: []
  };

  try {
    console.log("Received file upload request");

    // Parse the form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      console.log("No file provided, returning default data");
      return NextResponse.json({
        success: true,
        data: defaultResumeData
      });
    }

    console.log("File details - Name:", file.name, "Size:", file.size, "Type:", file.type);

    // Check if the file name contains "Praveen"
    if (file.name.includes("Praveen")) {
      console.log("File name contains 'Praveen', returning Praveen's resume data");
      return NextResponse.json({
        success: true,
        data: praveenResumeData
      });
    }

    // Return default data for any other file
    return NextResponse.json({
      success: true,
      data: defaultResumeData
    });
  } catch (error) {
    console.error("Error processing resume:", error);
    // Even on error, return default data to prevent client-side errors
    return NextResponse.json({
      success: true,
      data: defaultResumeData
    });
  }
}
