import Link from "next/link";

import { Container } from "@/components/layout/container";
import { PLANNED_CHALLENGE } from "@/lib/challenge/config";

const footerLinks = [
  { href: "/rules", label: "Rules" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t">
      <Container className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-heading text-base font-semibold">NNN Challenge</p>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            A self-reported, privacy-conscious challenge for adults. We cannot verify private
            behavior, and participation is not medical advice.
          </p>
          <p className="text-xs text-muted-foreground">Adults only (18+).</p>
        </div>
        <nav aria-label="Footer navigation" className="space-y-2">
          <p className="text-sm font-medium">Explore</p>
          <ul className="space-y-1.5">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-2">
          <p className="text-sm font-medium">Privacy</p>
          <p className="text-sm leading-6 text-muted-foreground">
            Public pages show aliases only. Never your real name or email.
          </p>
          <p className="text-xs text-muted-foreground">© {PLANNED_CHALLENGE.year} NNN Challenge</p>
        </div>
      </Container>
    </footer>
  );
}
