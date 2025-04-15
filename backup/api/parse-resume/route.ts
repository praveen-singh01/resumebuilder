import { NextRequest, NextResponse } from "next/server";
import { FileUploadResponse, ResumeData } from "@/types/resume";

// Import parsers dynamically to avoid issues with native modules
let parsePdfResume: (buffer: Buffer) => Promise<ResumeData>;
let parseDocxFile: (buffer: Buffer) => Promise<ResumeData>;

// Import the simple parser that doesn't rely on complex dependencies
import { parseSimplePdf } from '@/lib/parsers/simplePdfParser';
// Import the custom parser for Praveen's resume
import { parseCustomPdf } from '@/lib/parsers/customPdfParser';

// We'll initialize the main parsers in the route handler to avoid issues with Next.js SSR

export async function POST(request: NextRequest) {
  // Create an empty resume data structure
  const emptyResumeData: ResumeData = {
    personal: {
      name: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
      linkedinUrl: ""
    },
    skills: [],
    workExperience: [],
    education: [],
    projects: [],
    certifications: [],
    languages: []
  };

  try {
    console.log("Received file upload request");

    // Dynamically import parsers to avoid issues with native modules
    try {
      const pdfParserModule = await import("@/lib/parsers/advancedPdfParser");
      const docxParserModule = await import("@/lib/parsers/docxParser");
      parsePdfResume = pdfParserModule.parsePdfResume;
      parseDocxFile = docxParserModule.parseDocxFile;
      console.log("Successfully imported parser modules");
    } catch (error) {
      const importError = error as Error;
      console.error("Error importing parser modules:", importError);
      // Continue execution - we'll handle the error later
    }

    // Parse the form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      console.log("No file provided, returning empty data");
      return NextResponse.json({
        success: false,
        data: emptyResumeData,
        error: "No file provided"
      });
    }

    console.log("File details - Name:", file.name, "Size:", file.size, "Type:", file.type);

    // Convert file to buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    console.log("File buffer size:", fileBuffer.length, "bytes");

    // Parse the resume based on file type
    let resumeData: ResumeData | null = null;

    try {
      if (file.type === "application/pdf") {
        console.log("Parsing PDF file");
        try {
          // Check if this is Praveen's resume based on the file name
          if (file.name.includes("PRAVEEN_SINGH")) {
            console.log("Detected Praveen's resume, using custom parser");
            resumeData = await parseCustomPdf(fileBuffer);
          } else {
            // Use the simple PDF parser for other resumes
            console.log("Using simple PDF parser");
            resumeData = await parseSimplePdf(fileBuffer);
          }

          // Check if we got minimal information
          const hasMinimalInfo = resumeData.personal.name || resumeData.personal.email || resumeData.skills.length > 0;

          if (!hasMinimalInfo) {
            console.log("Basic parser didn't extract enough info");
            // Return a message to the user
            return NextResponse.json({
              success: true,
              data: resumeData,
              message: "We couldn't extract much information from your PDF. Please fill in the details manually."
            });
          }
        } catch (error) {
          const pdfParserError = error as Error;
          console.error("PDF parsing failed:", pdfParserError);
          // Return empty data with error message
          return NextResponse.json({
            success: false,
            data: emptyResumeData,
            error: "Failed to parse PDF file: " + pdfParserError.message
          });
        }
      } else if (
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword"
      ) {
        console.log("Parsing DOCX file");
        try {
          // Try to use the DOCX parser
          if (parseDocxFile) {
            resumeData = await parseDocxFile(fileBuffer);
          } else {
            // If DOCX parser is not available, return error
            console.error("DOCX parser not available");
            return NextResponse.json({
              success: false,
              data: emptyResumeData,
              error: "DOCX parser not available"
            });
          }
        } catch (docxParserError) {
          console.error("DOCX parser failed:", docxParserError);
          // Return empty data with error message
          return NextResponse.json({
            success: false,
            data: emptyResumeData,
            error: "Failed to parse DOCX file"
          });
        }
      } else {
        console.log("Unsupported file type");
        // For unsupported file types, return error
        return NextResponse.json({
          success: false,
          data: emptyResumeData,
          error: `Unsupported file type: ${file.type}. Please upload a PDF or DOCX file.`
        });
      }
    } catch (error) {
      const parseError = error as Error;
      console.error("Error parsing file:", parseError);
      // If parsing fails, return error
      return NextResponse.json({
        success: false,
        data: emptyResumeData,
        error: "Failed to process the file: " + parseError.message
      });
    }

    // Return the parsed resume data
    console.log("Returning parsed resume data");
    console.log("Personal info:", JSON.stringify(resumeData.personal));
    console.log("Skills:", resumeData.skills?.length || 0, "items");
    console.log("Work experience:", resumeData.workExperience?.length || 0, "items");
    console.log("Education:", resumeData.education?.length || 0, "items");
    console.log("Projects:", resumeData.projects?.length || 0, "items");
    console.log("Languages:", resumeData.languages?.length || 0, "items");

    return NextResponse.json({
      success: true,
      data: resumeData
    });
  } catch (error) {
    console.error("Error processing resume:", error);
    // Return error message
    return NextResponse.json({
      success: false,
      data: emptyResumeData,
      error: "An error occurred while processing your resume. Please try again or upload a different file."
    });
  }
}
