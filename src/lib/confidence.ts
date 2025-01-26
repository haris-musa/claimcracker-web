import { AlertTriangle, ShieldCheck, AlertCircle } from "lucide-react";
import type { PredictionResult } from "./api";
import type { LucideIcon } from "lucide-react";

interface ConfidenceLevel {
  level: string;
  variant: "destructive" | "warning" | "success" | "default";
  icon: LucideIcon;
  description: string;
  tips: string[];
}

export function getConfidenceLevel(result: PredictionResult): ConfidenceLevel {
  const { prediction, confidence } = result;

  if (prediction === "Fake") {
    if (confidence > 0.8) {
      return {
        level: "High Risk",
        variant: "destructive",
        icon: AlertTriangle,
        description:
          "This content shows very strong indicators of being false or misleading.",
        tips: [
          "Do not share this content without fact-checking",
          "Check reputable news sources for verification",
          "Look for the original source of this information",
          `Confidence Score: ${(confidence * 100).toFixed(
            1
          )}% certainty of misinformation`,
        ],
      };
    } else if (confidence > 0.6) {
      return {
        level: "Medium Risk",
        variant: "warning",
        icon: AlertCircle,
        description:
          "This content has several characteristics commonly associated with misinformation.",
        tips: [
          "Exercise caution before sharing",
          "Cross-reference with trusted sources",
          "Check when this information was published",
          `Confidence Score: ${(confidence * 100).toFixed(
            1
          )}% indicates potential misinformation`,
        ],
      };
    } else {
      return {
        level: "Low Risk",
        variant: "warning",
        icon: AlertCircle,
        description:
          "This content shows some potential signs of misinformation, but with low confidence.",
        tips: [
          "Consider the source's credibility",
          "Look for additional confirming sources",
          "Check if the information is up-to-date",
          `Confidence Score: ${(confidence * 100).toFixed(
            1
          )}% suggests possible concerns`,
        ],
      };
    }
  } else {
    if (confidence > 0.7) {
      return {
        level: "Likely Real",
        variant: "success",
        icon: ShieldCheck,
        description:
          "This content appears to be reliable with good confidence.",
        tips: [
          "Content shows characteristics of reliable information",
          "Still recommended to verify from trusted sources",
          "Check for recent updates or corrections",
          `Confidence Score: ${(confidence * 100).toFixed(
            1
          )}% indicates reliability`,
        ],
      };
    }
    return {
      level: "Possibly Real",
      variant: "default",
      icon: ShieldCheck,
      description:
        "This content shows some characteristics of reliable information, but verify from trusted sources.",
      tips: [
        "Additional verification recommended",
        "Check multiple reliable sources",
        "Consider when this was published",
        `Confidence Score: ${(confidence * 100).toFixed(
          1
        )}% suggests potential reliability`,
      ],
    };
  }
}
