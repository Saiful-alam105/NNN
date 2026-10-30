import { CalendarDays, Medal, RotateCcw, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/shared/page-header";
import { SampleBadge } from "@/components/shared/sample-badge";
import { StreakTimer } from "@/components/timer/streak-timer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CHALLENGE_TIME_ZONE_LABEL, PLANNED_CHALLENGE } from "@/lib/challenge/config";
import { formatChallengeDateTime } from "@/lib/dates/challenge-date";
import { SAMPLE_DASHBOARD } from "@/lib/mock/dashboard";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <Container className="space-y-8 py-12 sm:py-16">
      <PageHeader
        eyebrow="Sample participant view"
        title={`Welcome back, ${SAMPLE_DASHBOARD.alias}`}
        description="This is a preview of the private dashboard. No account is required to view this sample."
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Sample attempt</Badge>
          <Badge variant="outline">{CHALLENGE_TIME_ZONE_LABEL}</Badge>
          <SampleBadge />
        </div>
      </PageHeader>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="pt-2">
            <StreakTimer {...SAMPLE_DASHBOARD.streak} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Challenge status</CardTitle>
              <CardDescription>Official challenge window</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Badge variant="outline" className="border-primary/40 text-primary-text">
                Upcoming
              </Badge>
              <div className="flex items-start gap-2">
                <CalendarDays
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    Starts {formatChallengeDateTime(PLANNED_CHALLENGE.startAtUtc)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Ends {formatChallengeDateTime(PLANNED_CHALLENGE.endAtUtc)}
                  </p>
                </div>
              </div>
              <p className="border-t pt-3 text-xs leading-5 text-muted-foreground">
                The timer and progress on this page are sample values for layout review.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Leaderboard rank</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <Medal className="size-8 text-gold" aria-hidden="true" />
              <div>
                <p className="font-heading text-3xl font-semibold">#{SAMPLE_DASHBOARD.rank}</p>
                <p className="text-xs text-muted-foreground">
                  of {SAMPLE_DASHBOARD.activeParticipants} active sample participants
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Official challenge progress</CardTitle>
            <CardDescription>
              Day {SAMPLE_DASHBOARD.challengeDay} of {SAMPLE_DASHBOARD.challengeDurationDays}{" "}
              (sample)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div
              className="h-2 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={SAMPLE_DASHBOARD.challengeProgressPercent}
              aria-label={`Official challenge progress: ${SAMPLE_DASHBOARD.challengeProgressPercent} percent (sample)`}
            >
              <div
                className="h-full rounded-full bg-success"
                style={{ width: `${SAMPLE_DASHBOARD.challengeProgressPercent}%` }}
              />
            </div>
            <p className="text-xs leading-5 text-muted-foreground">
              Personal streak time and official challenge progress are separate. Your streak starts
              from your own valid attempt start.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Certificate eligibility</CardTitle>
            <CardDescription>Full-month certificate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Badge variant="outline" className="text-muted-foreground">
              Not yet available
            </Badge>
            <p className="text-sm leading-6 text-muted-foreground">
              The certificate becomes available only after the challenge ends and server-side
              eligibility passes. A reset removes full-month eligibility.
            </p>
            <Button
              variant="outline"
              size="sm"
              disabled
              aria-describedby="certificate-note"
              className="w-fit"
            >
              <ShieldCheck className="size-4" aria-hidden="true" />
              View certificate
            </Button>
            <p id="certificate-note" className="text-xs text-muted-foreground">
              Certificate downloads arrive in Milestone 7. You can open the sample certificate
              preview below.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle>Reset my streak</CardTitle>
          <CardDescription>Destructive action</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-muted-foreground">
            A reset ends your current attempt and removes eligibility for the full-month
            certificate. It cannot be undone through the site. Reset history stays private.
          </p>
          <Button variant="destructive" disabled aria-describedby="reset-note" className="w-fit">
            <RotateCcw className="size-4" aria-hidden="true" />
            Reset my streak
          </Button>
          <p id="reset-note" className="text-xs text-muted-foreground">
            Reset unlocks in Milestone 5.
          </p>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        <Link
          href="/certificate"
          className="rounded-sm text-primary-text hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Open the sample certificate preview
        </Link>
      </p>
    </Container>
  );
}
