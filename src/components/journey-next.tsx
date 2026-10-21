import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function JourneyNext({ to, children }: { to: "/tools" | "/ai-today" | "/about"; children: string }) {
  return (
    <div className="mt-10 flex justify-end">
      <Button asChild className="h-auto min-h-14 w-full max-w-full whitespace-normal rounded-full bg-gradient-accent px-10 py-5 text-lg font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 sm:w-auto sm:min-w-[560px] [&_svg]:size-5">
        <Link to={to}>{children}<ArrowRight aria-hidden /></Link>
      </Button>
    </div>
  );
}