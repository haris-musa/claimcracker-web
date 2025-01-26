"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Copy, Check } from "lucide-react";
import type { PredictionResult } from "@/lib/api";
import { getConfidenceLevel } from "@/lib/confidence";
import { cn } from "@/lib/utils";
import "./result-display.css";

interface ResultDisplayProps {
  result: PredictionResult;
  onCopy: () => void;
  copied: boolean;
}

export default function ResultDisplay({
  result,
  onCopy,
  copied,
}: ResultDisplayProps) {
  const confidenceLevel = getConfidenceLevel(result);
  const realWidth = Math.round(result.probabilities.Real * 100);
  const fakeWidth = Math.round(result.probabilities.Fake * 100);

  // Round to nearest 10 for CSS classes
  const realWidthClass = `w-progress-${Math.round(realWidth / 10) * 10}`;
  const fakeWidthClass = `w-progress-${Math.round(fakeWidth / 10) * 10}`;

  return (
    <>
      <Alert variant={confidenceLevel.variant} className="space-y-3">
        {React.createElement(confidenceLevel.icon, {
          className: "h-4 w-4",
        })}
        <AlertTitle className="text-base sm:text-lg">
          {confidenceLevel.level}
        </AlertTitle>
        <AlertDescription>
          <p className="text-sm sm:text-base">{confidenceLevel.description}</p>
          <div className="mt-4">
            <p className="font-medium text-sm sm:text-base">Recommendations:</p>
            <ul className="mt-2 space-y-2">
              {confidenceLevel.tips.map((tip, i) => (
                <li key={i} className="text-xs sm:text-sm">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">
            Detailed Analysis
          </CardTitle>
          <CardDescription className="text-sm">
            Probability breakdown of the analysis results
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span>Real</span>
              <span>{realWidth}%</span>
            </div>
            <div className="progress-bar bg-muted">
              <div
                className={cn(
                  "progress-bar-fill progress-bar-fill-real",
                  realWidthClass
                )}
                role="progressbar"
                aria-label="Real probability"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span>Fake</span>
              <span>{fakeWidth}%</span>
            </div>
            <div className="progress-bar bg-muted">
              <div
                className={cn(
                  "progress-bar-fill progress-bar-fill-fake",
                  fakeWidthClass
                )}
                role="progressbar"
                aria-label="Fake probability"
              />
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full transition-all duration-200 text-sm sm:text-base"
            onClick={onCopy}
          >
            {copied ? (
              <span className="flex items-center gap-2 text-green-600">
                <Check className="h-4 w-4" />
                Copied!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Copy className="h-4 w-4" />
                Copy Results
              </span>
            )}
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
