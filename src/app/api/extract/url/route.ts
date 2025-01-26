import { NextResponse } from "next/server";
import { extract } from "@extractus/article-extractor";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Please provide a valid URL" },
        { status: 400 }
      );
    }

    try {
      // Extract article content
      const article = await extract(url);

      if (!article || !article.content) {
        throw new Error("No content found");
      }

      // Return cleaned text content
      return NextResponse.json({
        text: article.content.replace(/<[^>]*>/g, ""),
      });
    } catch {
      return NextResponse.json(
        { error: "Failed to extract content from URL" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("URL extraction error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
