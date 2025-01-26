"use client";

import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { FileText, Globe, Upload, XCircle } from "lucide-react";
import { checkText, type PredictionResult } from "@/lib/api";
import React from "react";
import { PageSkeleton } from "@/components/page-skeleton";
import dynamic from "next/dynamic";
import { formatResultForSharing } from "@/lib/format";
import {
  extractFromUrl,
  extractFromFile,
  SUPPORTED_FILE_TYPES,
} from "@/lib/extract";
import { Input } from "@/components/ui/input";

// Constants for validation
const MIN_WORDS = 3;
const MAX_WORDS = 500;
const MIN_CHARS = 10;

// Dynamically import heavy components
const ResultDisplay = dynamic(() => import("@/components/result-display"), {
  loading: () => <ResultSkeleton />,
  ssr: false,
});

function ResultSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 bg-muted rounded-md w-1/3" />
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded-md w-full" />
        <div className="h-4 bg-muted rounded-md w-5/6" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded-md w-2/3" />
        <div className="h-4 bg-muted rounded-md w-3/4" />
        <div className="h-4 bg-muted rounded-md w-1/2" />
      </div>
    </div>
  );
}

function validateInput(text: string): string | null {
  const trimmedText = text.trim();

  if (trimmedText.length < MIN_CHARS) {
    return `Text must be at least ${MIN_CHARS} characters long.`;
  }

  const words = trimmedText.split(/\s+/);

  if (words.length < MIN_WORDS) {
    return `Text must contain at least ${MIN_WORDS} words.`;
  }

  if (words.length > MAX_WORDS) {
    return `Text must not exceed ${MAX_WORDS} words.`;
  }

  return null;
}

export default function CheckPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Frontend validation
      const validationError = validateInput(text);
      if (validationError) {
        throw new Error(validationError);
      }

      const prediction = await checkText(text);
      setResult(prediction);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);

      // Clear the error after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResults = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(formatResultForSharing(result));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy results:", err);
    }
  };

  const handleUrlSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Extract content from URL
      const extractedText = await extractFromUrl(url);

      // Frontend validation
      const validationError = validateInput(extractedText);
      if (validationError) {
        throw new Error(validationError);
      }

      const prediction = await checkText(extractedText);
      setResult(prediction);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);

      // Clear the error after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileSubmit = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Extract content from file
      const extractedText = await extractFromFile(selectedFile);

      // Frontend validation
      const validationError = validateInput(extractedText);
      if (validationError) {
        throw new Error(validationError);
      }

      const prediction = await checkText(extractedText);
      setResult(prediction);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);

      // Clear the error after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<PageSkeleton />}>
      <div className="container py-6 sm:py-10">
        <div className="mx-auto max-w-3xl space-y-4 sm:space-y-6">
          <div className="space-y-2 text-center px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
              Check for Fake News
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Enter text, paste a URL, or upload a file to analyze for
              misinformation.
            </p>
          </div>

          <Card className="mx-4 sm:mx-0">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl sm:text-2xl">
                Analysis Input
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Choose your preferred method of input for fact-checking.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="text" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="text"
                    className="space-x-2 text-xs sm:text-sm"
                  >
                    <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Text</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="url"
                    className="space-x-2 text-xs sm:text-sm"
                  >
                    <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>URL</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="file"
                    className="space-x-2 text-xs sm:text-sm"
                  >
                    <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>File</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-4">
                  <Textarea
                    placeholder="Enter or paste text to analyze..."
                    className="min-h-[150px] sm:min-h-[200px] text-sm sm:text-base"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <Button
                    className="w-full text-sm sm:text-base"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={!text || loading}
                  >
                    {loading ? "Analyzing..." : "Check Now"}
                  </Button>
                </TabsContent>

                <TabsContent value="url" className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter URL to analyze..."
                      className="text-sm sm:text-base"
                      value={url}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUrl(e.target.value)
                      }
                    />
                    <Button
                      className="shrink-0 text-sm sm:text-base"
                      onClick={handleUrlSubmit}
                      disabled={!url || loading}
                    >
                      Check
                    </Button>
                  </div>
                  <p className="text-center text-muted-foreground text-xs sm:text-sm">
                    Enter a URL to analyze its content for misinformation.
                  </p>
                </TabsContent>

                <TabsContent value="file" className="space-y-4">
                  <div className="flex flex-col gap-4">
                    <Input
                      type="file"
                      accept={SUPPORTED_FILE_TYPES.join(",")}
                      onChange={handleFileChange}
                      className="text-sm sm:text-base"
                    />
                    <Button
                      className="w-full text-sm sm:text-base"
                      onClick={handleFileSubmit}
                      disabled={!selectedFile || loading}
                    >
                      {loading ? "Analyzing..." : "Check File"}
                    </Button>
                  </div>
                  <p className="text-center text-muted-foreground text-xs sm:text-sm">
                    Upload a text, PDF, or Word document to analyze.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive" className="mx-4 sm:mx-0">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className="text-sm sm:text-base">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {loading && (
            <Card className="mx-4 sm:mx-0">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">
                  Analyzing Content
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Please wait while we process your text...
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResultSkeleton />
              </CardContent>
            </Card>
          )}

          {result && (
            <div className="mx-4 sm:mx-0">
              <ResultDisplay
                result={result}
                onCopy={handleCopyResults}
                copied={copied}
              />
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}
