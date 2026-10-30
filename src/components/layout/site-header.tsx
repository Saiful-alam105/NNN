import { Flame } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/rules", label: "Rules" },
  { href: "/dashboard", label: "Dashboard" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <Container>
        <div className="flex min-h-16 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-2">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Flame className="size-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-heading text-base font-semibold tracking-tight">
                NNN Challenge
              </span>
              <span className="mt-1 text-xs text-muted-foreground">No Nut November 2026</span>
            </span>
          </Link>
          <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
