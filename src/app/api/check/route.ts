import {
  validateClaim,
  validateInput,
  ValidationError,
} from "@/lib/claimbuster";
import { NextResponse } from "next/server";

// Verify required environment variables
if (!process.env.MODEL_API_URL) {
  throw new Error("MODEL_API_URL environment variable is not set");
}

if (!process.env.CLAIMBUSTER_API_URL || !process.env.CLAIMBUSTER_API_KEY) {
  throw new Error("ClaimBuster API configuration is missing");
}

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Please provide text to analyze" },
        { status: 400 }
      );
    }

    try {
      // Step 1: Basic input validation
      validateInput(text);

      // Step 2: ClaimBuster validation
      await validateClaim(text);

      // Step 3: Model prediction
      const response = await fetch(`${process.env.MODEL_API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Model prediction failed");
      }

      const prediction = await response.json();
      return NextResponse.json(prediction);
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      throw error;
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
