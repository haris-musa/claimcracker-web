"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              ClaimCracker
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/check"
              className="transition-colors hover:text-foreground/80"
            >
              Check Claim
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-foreground/80"
            >
              About
            </Link>
            <Link
              href="/docs"
              className="transition-colors hover:text-foreground/80"
            >
              API Docs
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden",
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-48" : "max-h-0"
        )}
      >
        <nav className="container py-4 flex flex-col space-y-4 text-sm font-medium border-t">
          <Link
            href="/check"
            className="transition-colors hover:text-foreground/80"
            onClick={() => setIsOpen(false)}
          >
            Check Claim
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-foreground/80"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/docs"
            className="transition-colors hover:text-foreground/80"
            onClick={() => setIsOpen(false)}
          >
            API Docs
          </Link>
        </nav>
      </div>
    </header>
  );
}
