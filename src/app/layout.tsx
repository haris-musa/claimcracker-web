import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ErrorBoundary } from "@/components/error-boundary";
import { Footer } from "@/components/layout/footer";

// font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// Theme color configuration
export const themeColor = [
  { media: "(prefers-color-scheme: light)", color: "white" },
  { media: "(prefers-color-scheme: dark)", color: "black" },
];

// Metadata for SEO and performance
export const metadata: Metadata = {
  title: "ClaimCracker - Fake News Detection",
  description: "Modern AI-powered fake news detection system",
  keywords: ["fake news", "AI", "machine learning", "fact checking"],
  authors: [{ name: "Haris Musa" }],
  openGraph: {
    title: "ClaimCracker - Fake News Detection",
    description: "Modern AI-powered fake news detection system",
    type: "website",
    url: "https://claimcracker.site",
    locale: "en_US",
    siteName: "ClaimCracker",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              {children}
              <Footer />
            </div>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
