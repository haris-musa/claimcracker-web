import { ValidationError } from "./claimbuster";

// Supported file types
export const SUPPORTED_FILE_TYPES = [
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf",
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function extractFromUrl(url: string): Promise<string> {
  try {
    const response = await fetch("/api/extract/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || "Failed to extract content from URL");
    }

    const { text } = await response.json();
    return text;
  } catch (error) {
    throw new Error(`Failed to extract content: ${(error as Error).message}`);
  }
}

export async function extractFromFile(file: File): Promise<string> {
  // Validate file type
  if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
    throw new ValidationError(
      "Unsupported file type. Please upload a text or Word document."
    );
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new ValidationError("File size must not exceed 5MB.");
  }

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/extract/file", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || "Failed to extract content from file");
    }

    const { text } = await response.json();
    return text;
  } catch (error) {
    throw new Error(`Failed to extract content: ${(error as Error).message}`);
  }
}
