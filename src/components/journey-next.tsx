import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function JourneyNext({ to, children, floating = false }: { to: "/tools" | "/ai-today" | "/about"; children: string; floating?: boolean }) {
  return (
    <div className={floating ? "fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 left-5 z-30 flex justify-end sm:left-auto" : "mt-10 flex justify-end"}>
      <Button asChild className="h-auto min-h-14 w-full max-w-full whitespace-normal rounded-full bg-gradient-accent px-5 py-5 text-lg font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 sm:w-[266px] [&_svg]:size-5">
        <Link to={to}>{children}<ArrowRight aria-hidden /></Link>
      </Button>
    </div>
  );
}
