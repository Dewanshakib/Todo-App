import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-auto mt-20 flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md animate-fade-in">
        <div className="flex justify-center mb-4">
          <Ghost className="h-16 w-16 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold mb-2">Oops! Page not found.</h1>
        <p className="text-muted-foreground mb-6">
          We couldn&rsquo;t find the page you&rsquo;re looking for. It might have been removed or doesn&rsquo;t exist.
        </p>
        <Button asChild>
          <Link href="/home">← Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
}