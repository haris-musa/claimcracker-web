import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="space-y-2">
          <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground" />
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Page Not Found
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/check">Check a Claim</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
