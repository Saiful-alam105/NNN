import { Container } from "@/components/layout/container";
import { LeaderboardCards } from "@/components/leaderboard/leaderboard-cards";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { PageHeader } from "@/components/shared/page-header";
import { SampleBadge } from "@/components/shared/sample-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SAMPLE_ACTIVE_LEADERBOARD, SAMPLE_LATE_JOINERS } from "@/lib/mock/leaderboard";

export const metadata = {
  title: "Leaderboard",
};

export default function LeaderboardPage() {
  return (
    <Container className="space-y-10 py-12 sm:py-16">
      <PageHeader
        eyebrow="Public leaderboard"
        title="Aliases only. No private data."
        description="Rankings are self-reported and are not independently verified. Public entries never include real names, emails, or reset history."
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Active only</Badge>
          <Badge variant="outline">Self-reported</Badge>
          <SampleBadge />
        </div>
      </PageHeader>

      <section aria-labelledby="active-heading" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="active-heading" className="font-heading text-xl font-semibold">
              Active participants
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Sorted by current streak duration, then by the earliest valid attempt start timestamp.
            </p>
          </div>
          <p className="text-xs text-muted-foreground">Showing top 10 sample participants</p>
        </div>
        <Card className="hidden py-0 md:block">
          <LeaderboardTable
            entries={SAMPLE_ACTIVE_LEADERBOARD}
            caption="Active sample participants ranked by current streak."
          />
        </Card>
        <LeaderboardCards entries={SAMPLE_ACTIVE_LEADERBOARD} />
      </section>

      <section aria-labelledby="late-heading" className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 id="late-heading" className="font-heading text-xl font-semibold">
            Late joiners
          </h2>
          <Badge variant="outline" className="border-gold/40 text-gold">
            Separate group
          </Badge>
        </div>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Late joiners are shown separately because their attempt started after the official start.
          They are not eligible for the full-month certificate.
        </p>
        <Card className="hidden py-0 md:block">
          <LeaderboardTable
            entries={SAMPLE_LATE_JOINERS}
            caption="Sample late joiners ranked within their own group."
          />
        </Card>
        <LeaderboardCards entries={SAMPLE_LATE_JOINERS} />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>How ranking works</CardTitle>
          <CardDescription>
            Published before launch and enforced by the backend later.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
          <p>
            Public entries show rank, alias, current streak, and country only if the participant
            opted in.
          </p>
          <p>
            Real names, emails, date of birth, private check-ins, and reset history are never shown.
          </p>
          <p>
            Hidden, suspended, banned, and opted-out accounts are excluded from public rankings.
          </p>
          <p>Changing a browser clock or timezone cannot change a rank.</p>
        </CardContent>
      </Card>
    </Container>
  );
}
