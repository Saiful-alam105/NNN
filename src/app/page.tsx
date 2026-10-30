import { ArrowRight, CalendarDays, Flag, Timer, UserPlus } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SampleBadge } from "@/components/shared/sample-badge";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CHALLENGE_TIME_ZONE_LABEL, PLANNED_CHALLENGE } from "@/lib/challenge/config";
import { formatChallengeDateTime } from "@/lib/dates/challenge-date";
import { formatStreak } from "@/lib/leaderboard/format";
import { SAMPLE_ACTIVE_LEADERBOARD, SAMPLE_STATS } from "@/lib/mock/leaderboard";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: UserPlus,
    title: "Create a private account",
    description:
      "Choose a unique public alias. Your real name and email stay private and never appear on public pages.",
  },
  {
    icon: Flag,
    title: "Join the challenge",
    description:
      "Confirm the rules and join. On-time participants are eligible for the full-month certificate if their attempt stays unbroken.",
  },
  {
    icon: Timer,
    title: "Track a self-reported streak",
    description:
      "Your timer is derived from a server timestamp. Reset at any time; resets are private and end full-month eligibility.",
  },
];

export default function Home() {
  const topFive = SAMPLE_ACTIVE_LEADERBOARD.slice(0, 5);

  return (
    <div className="pb-16">
      <section className="relative overflow-hidden border-b">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.18),transparent_45%)]"
          aria-hidden="true"
        />
        <Container className="relative grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary-text">
              18+ · Self-reported challenge
            </Badge>
            <div className="space-y-4">
              <p className="text-sm font-semibold tracking-[0.2em] text-primary-text uppercase">
                No Nut November {PLANNED_CHALLENGE.year}
              </p>
              <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                A focused challenge. A private identity. A public alias.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Track a self-reported streak, compare aliases on a privacy-first leaderboard, and
                earn a certificate if you meet the published rules.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="h-11 px-5 text-base"
                disabled
                aria-describedby="join-note"
              >
                Join the challenge
              </Button>
              <Link
                href="/rules"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 px-5 text-base",
                )}
              >
                Read the rules
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <p id="join-note" className="text-xs text-muted-foreground">
              Registration opens in a later milestone. This preview is read-only.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-3.5" aria-hidden="true" />
                Starts {formatChallengeDateTime(PLANNED_CHALLENGE.startAtUtc)}
              </span>
              <span className="flex items-center gap-1.5">
                <Flag className="size-3.5" aria-hidden="true" />
                Ends {formatChallengeDateTime(PLANNED_CHALLENGE.endAtUtc)}
              </span>
              <span>{CHALLENGE_TIME_ZONE_LABEL}</span>
            </div>
          </div>

          <Card className="bg-card/80">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle>Challenge status</CardTitle>
                <Badge variant="outline" className="border-primary/40 text-primary-text">
                  Upcoming
                </Badge>
              </div>
              <CardDescription>Official challenge window</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs tracking-wide text-muted-foreground uppercase">Starts</p>
                <p className="font-medium">
                  {formatChallengeDateTime(PLANNED_CHALLENGE.startAtUtc)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs tracking-wide text-muted-foreground uppercase">
                  Ends (exclusive)
                </p>
                <p className="font-medium">{formatChallengeDateTime(PLANNED_CHALLENGE.endAtUtc)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs tracking-wide text-muted-foreground uppercase">Timezone</p>
                <p className="font-medium">{CHALLENGE_TIME_ZONE_LABEL}</p>
              </div>
              <p className="border-t pt-4 text-xs leading-5 text-muted-foreground">
                Timestamps are stored in UTC and displayed in the challenge timezone. Your browser
                timezone is not used.
              </p>
            </CardContent>
          </Card>
        </Container>
      </section>

      <Container className="space-y-16 py-12 sm:py-16">
        <section aria-labelledby="stats-heading" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="stats-heading" className="font-heading text-xl font-semibold">
              Sample challenge statistics
            </h2>
            <SampleBadge />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              label="Registered participants"
              value={String(SAMPLE_STATS.registered)}
              hint="Sample data"
            />
            <StatCard
              label="Active participants"
              value={String(SAMPLE_STATS.active)}
              hint="Sample data"
            />
            <StatCard
              label="Certificates issued"
              value={String(SAMPLE_STATS.certificates)}
              hint="Available after the challenge ends"
            />
          </div>
        </section>

        <section aria-labelledby="leaderboard-preview-heading" className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="leaderboard-preview-heading" className="font-heading text-xl font-semibold">
                Top aliases
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                A preview of the public, alias-only leaderboard.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <SampleBadge />
              <Link
                href="/leaderboard"
                className="rounded-sm text-sm font-medium text-primary-text hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                View leaderboard
              </Link>
            </div>
          </div>
          <Card>
            <CardContent>
              <div className="divide-y divide-border">
                {topFive.map((entry) => (
                  <div
                    key={entry.alias}
                    className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="w-6 text-sm text-muted-foreground tabular-nums">
                        #{entry.rank}
                      </span>
                      <span className="truncate font-medium">{entry.alias}</span>
                      {entry.country ? (
                        <span className="hidden text-xs text-muted-foreground sm:inline">
                          {entry.country}
                        </span>
                      ) : null}
                    </div>
                    <span className="font-heading text-sm font-semibold tabular-nums">
                      {formatStreak(entry.streakDays, entry.streakHours)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="how-it-works-heading" className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 id="how-it-works-heading" className="font-heading text-2xl font-semibold">
              How it works
            </h2>
            <p className="text-sm text-muted-foreground">Three steps, no public real names.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Card key={step.title}>
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary-text">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <CardTitle className="mt-2">
                      {index + 1}. {step.title}
                    </CardTitle>
                    <CardDescription className="leading-6">{step.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>
      </Container>
    </div>
  );
}
