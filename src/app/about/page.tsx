import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            About ClaimCracker
          </h1>
          <p className="text-muted-foreground">
            Fighting misinformation with AI technology
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>What is ClaimCracker?</CardTitle>
            <CardDescription>
              An AI-powered system to detect and analyze potential fake news
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              ClaimCracker is a state-of-the-art fake news detection system that
              uses advanced machine learning to help users verify information.
              Our model achieves 96.03% accuracy in identifying potential
              misinformation.
            </p>
            <p>
              Built with modern technology and designed for ease of use,
              ClaimCracker helps users make informed decisions about the content
              they consume and share.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>
              Understanding our analysis process
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our system uses DistilBERT, a powerful language model, to analyze
              text content. The analysis process includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fast text processing (~13.94ms per analysis)</li>
              <li>Pattern recognition in potentially misleading content</li>
              <li>Confidence scoring and detailed breakdowns</li>
              <li>Actionable recommendations based on analysis results</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Responsible Usage</CardTitle>
            <CardDescription>
              Guidelines for using our tool effectively
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              While ClaimCracker provides powerful analysis capabilities, we
              recommend:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Using our tool as one of multiple fact-checking methods</li>
              <li>Always verifying information from trusted sources</li>
              <li>Understanding that no AI system is 100% accurate</li>
              <li>Considering context and timing of the content</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
