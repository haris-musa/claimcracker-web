import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DocsPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            API Documentation
          </h1>
          <p className="text-muted-foreground">
            Integrate ClaimCracker&apos;s fake news detection into your
            applications
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Base URL and rate limits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <code>https://harismusa-claimcracker.hf.space</code>
            </div>
            <p>
              All endpoints are rate-limited to protect the API. Headers
              returned with each response include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>X-RateLimit-Limit: Maximum requests allowed</li>
              <li>X-RateLimit-Remaining: Requests remaining</li>
              <li>X-RateLimit-Reset: Time until reset</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Predict Endpoint</CardTitle>
            <CardDescription>
              Main endpoint for fake news detection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="font-medium">POST /predict</p>
              <p>Analyzes text to determine if it contains fake news.</p>
            </div>

            <div className="space-y-2">
              <p className="font-medium">Request Body:</p>
              <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                {JSON.stringify({ text: "string (required)" }, null, 2)}
              </pre>
            </div>

            <div className="space-y-2">
              <p className="font-medium">Response Example:</p>
              <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                {JSON.stringify(
                  {
                    prediction: "Real",
                    confidence: 0.95,
                    probabilities: {
                      Real: 0.95,
                      Fake: 0.05,
                    },
                  },
                  null,
                  2
                )}
              </pre>
            </div>

            <div className="space-y-2">
              <p className="font-medium">Rate Limit:</p>
              <p>30 requests per minute</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Error Handling</CardTitle>
            <CardDescription>Understanding API error responses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>All errors follow a consistent format:</p>
            <pre className="rounded-md bg-muted p-4 overflow-x-auto">
              {JSON.stringify(
                {
                  detail: "Error message describing what went wrong",
                },
                null,
                2
              )}
            </pre>
            <div className="space-y-2">
              <p className="font-medium">Common Status Codes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>400: Bad Request</li>
                <li>422: Validation Error</li>
                <li>429: Rate Limit Exceeded</li>
                <li>500: Internal Server Error</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Model Performance</CardTitle>
            <CardDescription>
              Understanding the AI model capabilities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc pl-6 space-y-2">
              <li>Validation Accuracy: 96.03%</li>
              <li>F1 Score: 0.9603</li>
              <li>Inference Time: ~13.94ms/text</li>
              <li>Response Time: &lt;1s</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
