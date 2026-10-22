import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function JourneyNext({ to, children, floating = false }: { to: "/tools" | "/ai-today" | "/about"; children: string; floating?: boolean }) {
  const button = (
    <Button asChild className="h-auto min-h-14 w-full max-w-full whitespace-normal rounded-full bg-gradient-accent px-5 py-5 text-lg font-semibold text-primary-foreground opacity-80 shadow-glow transition hover:opacity-100 sm:w-[266px] [&_svg]:size-5">
      <Link to={to}>{children}<ArrowRight aria-hidden /></Link>
    </Button>
  );
  if (floating) {
    return (
      <div className="fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-30 sm:bottom-16">
        <div className="mx-auto flex w-full max-w-6xl justify-end px-5">{button}</div>
      </div>
    );
  }
  return <div className="mt-10 flex justify-end">{button}</div>;
}
