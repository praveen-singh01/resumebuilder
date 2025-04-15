import axios from "axios";
import { ResumeData } from "@/types/resume";

export async function parseLinkedInProfile(url: string): Promise<ResumeData | null> {
  try {
    // Note: In a real-world application, you would need to use a proper LinkedIn API
    // or a third-party service like Proxycurl to scrape LinkedIn profiles.
    // This is a simplified mock implementation for demonstration purposes.

    // For a real implementation, you might use:
    // const response = await axios.get("https://api.proxycurl.com/v2/linkedin", {
    //   params: { url },
    //   headers: { "Authorization": `Bearer ${process.env.PROXYCURL_API_KEY}` }
    // });

    // Mock data for demonstration
    const mockData = generateMockLinkedInData(url);
    return mockData;
  } catch (error) {
    console.error("Error parsing LinkedIn profile:", error);
    return null;
  }
}

function generateMockLinkedInData(url: string): ResumeData {
  // Extract username from URL
  const usernameMatch = url.match(/linkedin\.com\/in\/([^\/]+)/);
  const username = usernameMatch ? usernameMatch[1] : "johndoe";

  // Generate mock data based on username
  const fullName = username
    .split("-")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return {
    personal: {
      name: fullName,
      email: `${username}@example.com`,
      phone: "+1 (555) 123-4567",
      linkedinUrl: url,
      summary: `Experienced professional with a passion for technology and innovation. Skilled in various programming languages and frameworks with a focus on delivering high-quality solutions.`
    },
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "HTML/CSS",
      "SQL",
      "Git",
      "Agile Methodologies"
    ],
    education: [
      {
        institution: "University of Technology",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2015",
        endDate: "2019"
      }
    ],
    workExperience: [
      {
        company: "Tech Innovations Inc.",
        position: "Senior Software Developer",
        startDate: "January 2022",
        endDate: "",
        current: true,
        description: "Lead development of web applications using React and Node.js. Implemented CI/CD pipelines and improved application performance by 40%."
      },
      {
        company: "Digital Solutions LLC",
        position: "Software Developer",
        startDate: "June 2019",
        endDate: "December 2021",
        description: "Developed and maintained multiple web applications. Collaborated with cross-functional teams to deliver projects on time and within budget."
      }
    ],
    certifications: [
      {
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2021"
      }
    ],
    projects: [
      {
        name: "E-commerce Platform",
        description: "Developed a full-stack e-commerce platform with payment integration",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        url: "https://github.com/example/ecommerce"
      }
    ],
    languages: [
      {
        language: "English",
        proficiency: "Native"
      },
      {
        language: "Spanish",
        proficiency: "Intermediate"
      }
    ]
  };
}
