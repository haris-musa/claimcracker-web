// Input validation constants
const MIN_WORDS = 3;
const MAX_WORDS = 500;
const MIN_CHARS = 10;

export interface ClaimBusterResponse {
  results: Array<{
    score: number;
    text: string;
  }>;
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

// Basic input validation that can run on client
export function validateInput(text: string): void {
  const words = text.trim().split(/\s+/);

  if (text.length < MIN_CHARS) {
    throw new ValidationError(
      `Text must be at least ${MIN_CHARS} characters long.`
    );
  }

  if (words.length < MIN_WORDS) {
    throw new ValidationError(`Text must contain at least ${MIN_WORDS} words.`);
  }

  if (words.length > MAX_WORDS) {
    throw new ValidationError(`Text must not exceed ${MAX_WORDS} words.`);
  }
}

// Server-side only validation
export async function validateClaim(text: string): Promise<boolean> {
  if (!process.env.CLAIMBUSTER_API_URL || !process.env.CLAIMBUSTER_API_KEY) {
    throw new Error("ClaimBuster API configuration is missing");
  }

  try {
    validateInput(text);

    const response = await fetch(
      `${process.env.CLAIMBUSTER_API_URL}/score/text/${encodeURIComponent(
        text
      )}`,
      {
        method: "GET",
        headers: {
          "x-api-key": process.env.CLAIMBUSTER_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to validate claim");
    }

    const data: ClaimBusterResponse = await response.json();
    const isValid = data.results.some((result) => result.score > 0.5);

    if (!isValid) {
      throw new ValidationError(
        "This doesn't appear to be a checkable claim. Please provide a statement that makes a specific claim or assertion."
      );
    }

    return true;
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    console.error("ClaimBuster validation error:", error);
    throw new Error("Unable to validate claim. Please try again.");
  }
}
