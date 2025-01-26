import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function PageSkeleton() {
  return (
    <div className="container py-10 animate-in fade-in-50 duration-500">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Title Skeleton */}
        <div className="space-y-4 text-center">
          <div className="h-8 bg-muted rounded-md w-2/3 mx-auto" />
          <div className="h-4 bg-muted rounded-md w-1/2 mx-auto" />
        </div>

        {/* Main Card Skeleton */}
        <Card>
          <CardHeader>
            <div className="space-y-2">
              <div className="h-5 bg-muted rounded-md w-1/4" />
              <div className="h-4 bg-muted rounded-md w-2/3" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded-md w-full" />
              <div className="h-4 bg-muted rounded-md w-5/6" />
              <div className="h-4 bg-muted rounded-md w-4/5" />
            </div>
            <div className="h-10 bg-muted rounded-md w-full" />
          </CardContent>
        </Card>

        {/* Results Card Skeleton */}
        <Card>
          <CardHeader>
            <div className="space-y-2">
              <div className="h-5 bg-muted rounded-md w-1/3" />
              <div className="h-4 bg-muted rounded-md w-1/2" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-4 bg-muted rounded-md w-16" />
                <div className="h-4 bg-muted rounded-md w-12" />
              </div>
              <div className="h-2 bg-muted rounded-full w-full" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-4 bg-muted rounded-md w-16" />
                <div className="h-4 bg-muted rounded-md w-12" />
              </div>
              <div className="h-2 bg-muted rounded-full w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
