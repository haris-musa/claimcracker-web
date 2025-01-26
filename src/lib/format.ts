import type { PredictionResult } from "./api";
import { getConfidenceLevel } from "./confidence";

export function formatResultForSharing(result: PredictionResult): string {
  const confidenceLevel = getConfidenceLevel(result);
  const timestamp = new Date().toLocaleString();

  return `ClaimCracker Analysis Results
Time: ${timestamp}

Risk Level: ${confidenceLevel.level}
${confidenceLevel.description}

Analysis Details:
- Prediction: ${result.prediction}
- Confidence: ${(result.confidence * 100).toFixed(2)}%
- Real Probability: ${(result.probabilities.Real * 100).toFixed(2)}%
- Fake Probability: ${(result.probabilities.Fake * 100).toFixed(2)}%

Recommendations:
${confidenceLevel.tips.map((tip) => `• ${tip}`).join("\n")}

Generated by ClaimCracker`;
}
