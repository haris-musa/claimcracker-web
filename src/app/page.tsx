import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, BarChart } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-10 md:py-20">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Detect Fake News with
          <span className="text-primary block mt-2">AI Precision</span>
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-[700px] mx-auto">
          Advanced machine learning model trained on vast datasets to identify
          misinformation with high accuracy.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="text-base sm:text-lg">
            <Link href="/check">
              Try Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-base sm:text-lg"
          >
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mt-16 md:mt-20 px-4">
        <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
          <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
          <h3 className="text-lg sm:text-xl font-semibold">96.03% Accuracy</h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            State-of-the-art model trained on diverse datasets
          </p>
        </div>
        <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
          <Zap className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
          <h3 className="text-lg sm:text-xl font-semibold">Fast Analysis</h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            Results in milliseconds with efficient processing
          </p>
        </div>
        <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors sm:col-span-2 md:col-span-1">
          <BarChart className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
          <h3 className="text-lg sm:text-xl font-semibold">
            Detailed Insights
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            Comprehensive analysis with confidence scores and recommendations
          </p>
        </div>
      </div>
    </div>
  );
}
