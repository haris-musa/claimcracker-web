import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!process.env.MODEL_API_URL) {
      throw new Error("MODEL_API_URL environment variable is not set");
    }

    // First try a GET request to the base URL
    const baseResponse = await fetch(process.env.MODEL_API_URL);
    if (!baseResponse.ok) {
      throw new Error(`Base URL not accessible: ${baseResponse.status}`);
    }

    // Then try the predict endpoint with a test request
    const response = await fetch(`${process.env.MODEL_API_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: "This is a test claim." }),
    });

    if (!response.ok) {
      throw new Error(`Predict endpoint error: ${response.status}`);
    }

    return NextResponse.json({
      status: "ok",
      modelUrl: process.env.MODEL_API_URL,
    });
  } catch (error) {
    console.error("Model health check failed:", error);
    return NextResponse.json(
      {
        error: "Model service unavailable",
        details: error instanceof Error ? error.message : "Unknown error",
        modelUrl: process.env.MODEL_API_URL,
      },
      { status: 503 }
    );
  }
}
