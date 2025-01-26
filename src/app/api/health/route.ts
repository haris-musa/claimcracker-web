import { NextResponse } from "next/server";

if (!process.env.MODEL_API_URL) {
  throw new Error("MODEL_API_URL environment variable is not set");
}

export async function GET() {
  try {
    const response = await fetch(`${process.env.MODEL_API_URL}/health`);

    if (!response.ok) {
      throw new Error("Model service health check failed");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Health check error:", error);
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }
}
