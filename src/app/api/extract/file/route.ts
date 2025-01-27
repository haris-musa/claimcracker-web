import { NextResponse } from "next/server";
import { SUPPORTED_FILE_TYPES, MAX_FILE_SIZE } from "@/lib/extract";
import pdf from "pdf-parse";
import mammoth from "mammoth";

async function extractPDF(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const data = await pdf(Buffer.from(buffer));
  return data.text;
}

async function extractWord(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer: buffer });
  return result.value;
}

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
      let text: string;

      // Handle different file types
      if (file.type === "text/plain") {
        text = await file.text();
      } else if (file.type === "application/pdf") {
        text = await extractPDF(file);
      } else if (
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        text = await extractWord(file);
      } else {
        throw new Error("Unsupported file type");
      }

      // Clean up extracted text
      text = text
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .replace(/[\r\n]+/g, " ") // Replace newlines with space
        .trim(); // Remove leading/trailing whitespace

      return NextResponse.json({ text });
    } catch (error) {
      console.error("Content extraction error:", error);
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
