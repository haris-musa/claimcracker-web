import { validateClaim, ValidationError } from "@/lib/claimbuster";
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
      // Log environment check
      console.log("Environment check:", {
        hasModelUrl: !!process.env.MODEL_API_URL,
        hasClaimBusterUrl: !!process.env.CLAIMBUSTER_API_URL,
        hasClaimBusterKey: !!process.env.CLAIMBUSTER_API_KEY,
      });

      // First validate with ClaimBuster
      console.log("Starting ClaimBuster validation...");
      await validateClaim(text); // This will throw if validation fails

      // If we get here, ClaimBuster validation passed
      console.log("ClaimBuster validation passed, sending to model...");

      // Then send to model for prediction
      const response = await fetch(`${process.env.MODEL_API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        console.error("Model API error:", {
          status: response.status,
          statusText: response.statusText,
          data,
          modelUrl: process.env.MODEL_API_URL,
        });
        throw new Error(
          data.error ||
            `Model prediction failed: ${response.status} ${response.statusText}`
        );
      }

      const prediction = await response.json();
      return NextResponse.json(prediction);
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        console.log("ClaimBuster validation error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      const err = error as Error;
      console.error("Detailed error:", {
        name: err.name,
        message: err.message,
        stack: err.stack,
      });
      throw error;
    }
  } catch (error: unknown) {
    const err = error as Error;
    console.error("API error:", {
      name: err.name,
      message: err.message,
      stack: err.stack,
    });
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
