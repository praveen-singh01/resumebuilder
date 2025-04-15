import { NextRequest, NextResponse } from "next/server";
import { parseLinkedInProfile } from "@/lib/parsers/linkedinParser";
import { LinkedInParseResponse } from "@/types/resume";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { success: false, error: "No LinkedIn URL provided" },
        { status: 400 }
      );
    }

    // Basic validation for LinkedIn URL
    if (!url.includes("linkedin.com/in/")) {
      return NextResponse.json(
        { success: false, error: "Invalid LinkedIn profile URL" },
        { status: 400 }
      );
    }

    const resumeData = await parseLinkedInProfile(url);

    if (!resumeData) {
      return NextResponse.json(
        { success: false, error: "Failed to parse LinkedIn profile" },
        { status: 500 }
      );
    }

    const response: LinkedInParseResponse = {
      success: true,
      data: resumeData,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error processing LinkedIn profile:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process LinkedIn profile" },
      { status: 500 }
    );
  }
}
