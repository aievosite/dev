import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function JourneyBack({ to, hash, children }: { to: "/history" | "/ai-today"; hash?: string; children: string }) {
  return (
    <Button asChild variant="ghost" className="mb-8 h-auto min-h-11 max-w-full justify-start whitespace-normal px-0 text-muted-foreground hover:bg-transparent hover:text-primary">
      <Link to={to} {...(hash ? { hash } : {})}><ArrowLeft aria-hidden />{children}</Link>
    </Button>
  );
}