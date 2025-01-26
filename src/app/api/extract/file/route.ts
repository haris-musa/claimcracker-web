import { NextResponse } from "next/server";
import { SUPPORTED_FILE_TYPES, MAX_FILE_SIZE } from "@/lib/extract";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Please provide a file" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Unsupported file type. Please upload a text, PDF, or Word document.",
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size must not exceed 5MB." },
        { status: 400 }
      );
    }

    try {
      // For now, just handle text files
      // In production, you'd want to add PDF and Word document support
      if (file.type === "text/plain") {
        const text = await file.text();
        return NextResponse.json({ text });
      }

      throw new Error("File type not yet supported");
    } catch {
      return NextResponse.json(
        { error: "Failed to extract content from file" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("File extraction error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
