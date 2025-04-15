export interface ResumeData {
  personal: {
    name: string;
    email: string;
    phone?: string;
    location?: string;
    website?: string;
    summary?: string;
    linkedinUrl?: string;
  };
  skills: string[];
  workExperience: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description?: string;
    achievements?: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    gpa?: number;
  }[];
  projects?: {
    name: string;
    description: string;
    url?: string;
    technologies?: string[];
  }[];
  certifications?: {
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }[];
  languages?: {
    language: string;
    proficiency: string;
  }[];
}

export interface FileUploadResponse {
  success: boolean;
  data?: ResumeData;
  error?: string;
}

export interface LinkedInParseResponse {
  success: boolean;
  data?: ResumeData;
  error?: string;
}


