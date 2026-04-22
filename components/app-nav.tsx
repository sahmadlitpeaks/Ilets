"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LayoutDashboard, LogOut, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tests/ielts", label: "Tests", icon: Target },
  { href: "/drills/grammar", label: "Drills", icon: Zap },
];

export function AppNav({ email }: { email?: string | null }) {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 font-display text-lg tracking-tight"
          >
            <BookOpen className="h-5 w-5" />
            LinguaPrep
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {ITEMS.map((item) => {
              const active =
                pathname === item.href ||
                pathname.startsWith(item.href.replace(/\/[^/]+$/, ""));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md px-3 py-1.5 transition-colors",
                    active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {email && (
            <span className="hidden sm:inline text-sm text-muted-foreground truncate max-w-[180px]">
              {email}
            </span>
          )}
          <ThemeToggle />
          <form action="/auth/signout" method="post">
            <Button type="submit" variant="ghost" size="icon" aria-label="Sign out">
              <LogOut className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
