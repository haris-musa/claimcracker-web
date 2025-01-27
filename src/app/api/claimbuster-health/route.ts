import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!process.env.CLAIMBUSTER_API_URL || !process.env.CLAIMBUSTER_API_KEY) {
      throw new Error("ClaimBuster configuration missing");
    }

    const response = await fetch(
      `${process.env.CLAIMBUSTER_API_URL}/score/text/test`,
      {
        headers: {
          "x-api-key": process.env.CLAIMBUSTER_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`ClaimBuster API error: ${response.status}`);
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("ClaimBuster health check failed:", error);
    return NextResponse.json(
      { error: "ClaimBuster service unavailable" },
      { status: 503 }
    );
  }
}
