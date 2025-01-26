"use client";

import * as React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div
        className={cn(
          "relative flex min-h-screen flex-col bg-background font-sans antialiased"
        )}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
      </div>
    </ThemeProvider>
  );
}
