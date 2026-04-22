import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-display text-lg tracking-tight"
        >
          <BookOpen className="h-5 w-5" />
          LinguaPrep
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a
            href="#tests"
            className="text-muted-foreground hover:text-foreground"
          >
            Tests
          </a>
          <a
            href="#drills"
            className="text-muted-foreground hover:text-foreground"
          >
            Drills
          </a>
          <a
            href="#feedback"
            className="text-muted-foreground hover:text-foreground"
          >
            AI feedback
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Start free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
