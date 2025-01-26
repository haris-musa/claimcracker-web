import { z } from "zod";

// Response schemas
const PredictionResponse = z.object({
  prediction: z.enum(["Real", "Fake"]),
  confidence: z.number(),
  probabilities: z.object({
    Real: z.number(),
    Fake: z.number(),
  }),
});

export type PredictionResult = z.infer<typeof PredictionResponse>;

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function checkText(text: string): Promise<PredictionResult> {
  try {
    // First send to our API route for ClaimBuster validation
    const response = await fetch("/api/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status,
        data.error || `API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return PredictionResponse.parse(data);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error("Failed to check text: " + (error as Error).message);
  }
}

export async function getHealth(): Promise<{ status: string }> {
  const response = await fetch("/api/health");
  if (!response.ok) {
    throw new ApiError(response.status, "Health check failed");
  }
  return response.json();
}
