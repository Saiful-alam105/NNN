import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CHALLENGE_TIME_ZONE_LABEL, PLANNED_CHALLENGE } from "@/lib/challenge/config";
import { formatChallengeDateTime } from "@/lib/dates/challenge-date";

export const metadata = {
  title: "Rules",
};

const cardClassName = "md:col-span-2";

export default function RulesPage() {
  return (
    <Container className="space-y-8 py-12 sm:py-16">
      <PageHeader
        eyebrow="Challenge rules"
        title={`${PLANNED_CHALLENGE.title} rules`}
        description="These rules explain how the challenge works. Participation is self-reported, and the site cannot verify private behavior."
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">18+ only</Badge>
          <Badge variant="outline">Self-reported</Badge>
          <Badge variant="outline">{CHALLENGE_TIME_ZONE_LABEL}</Badge>
        </div>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className={cardClassName}>
          <CardHeader>
            <CardTitle>Key dates and timezone</CardTitle>
            <CardDescription>
              All displayed times use the canonical challenge timezone.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="text-xs tracking-wide text-muted-foreground uppercase">Starts</dt>
                <dd className="mt-1 font-medium">
                  {formatChallengeDateTime(PLANNED_CHALLENGE.startAtUtc)}
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                  Ends (exclusive)
                </dt>
                <dd className="mt-1 font-medium">
                  {formatChallengeDateTime(PLANNED_CHALLENGE.endAtUtc)}
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-wide text-muted-foreground uppercase">Duration</dt>
                <dd className="mt-1 font-medium">{PLANNED_CHALLENGE.durationDays} calendar days</dd>
              </div>
              <div>
                <dt className="text-xs tracking-wide text-muted-foreground uppercase">Timezone</dt>
                <dd className="mt-1 font-medium">{CHALLENGE_TIME_ZONE_LABEL}</dd>
              </div>
            </dl>
            <p className="mt-4 border-t pt-4 text-xs leading-5 text-muted-foreground">
              Timestamps are stored in UTC and converted to Asia/Dhaka for every displayed date,
              countdown, leaderboard date, and certificate. The visitor&apos;s browser timezone is
              not used.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Adults only</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
            <p>You must be 18 or older to create an account or join the challenge.</p>
            <p>
              The site asks for an 18+ confirmation. It does not collect your date of birth for this
              purpose.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Joining and late registration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
            <p>
              You can join while registration is open. Joining before the official start sets your
              attempt start to the official start time.
            </p>
            <p>
              Joining at or after the official start creates a late-joiner attempt that begins at
              the time you join. Late joiners are shown in a separate leaderboard section.
            </p>
            <p>
              Late joiners are not shown as having completed days before they joined, and they are
              not eligible for the full-month certificate for this challenge.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Self-reported streak</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
            <p>
              The site cannot verify your private behavior. Your streak is based on a server-issued
              attempt start time, not a counter stored in your browser.
            </p>
            <p>
              You are responsible for reporting a reset if you decide your current attempt has
              ended. The site does not inspect or judge private behavior.
            </p>
          </CardContent>
        </Card>

        <Card className={cardClassName}>
          <CardHeader>
            <CardTitle>Reset rules</CardTitle>
            <CardDescription>
              A reset is a normal part of the product, never a public failure.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm leading-6 text-muted-foreground md:grid-cols-2">
            <div className="space-y-2">
              <p>
                Because participation is self-reported, a reset is the action you report when you
                consider your current attempt ended. The site does not define or inspect private
                behavior.
              </p>
              <p>
                A reset records a server timestamp, ends your current attempt, and cannot be undone
                through the site. Reset history is never displayed publicly.
              </p>
            </div>
            <div className="space-y-2">
              <p>
                A reset removes eligibility for the full-month certificate for this challenge. For
                this release, only one active attempt per participant is supported, and restarting
                after a reset is not available.
              </p>
              <p>
                Current active participants are shown on the leaderboard. Reset participants are not
                labelled as failures and their history remains private.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className={cardClassName}>
          <CardHeader>
            <CardTitle>Leaderboard rules</CardTitle>
            <CardDescription>Aliases only, with a documented tie-breaker.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm leading-6 text-muted-foreground md:grid-cols-2">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>The leaderboard shows active participants only.</li>
              <li>Public columns are rank, alias, current streak, and optional country.</li>
              <li>
                Real names, email addresses, private check-ins, and reset history are never shown.
              </li>
              <li>Entries are sorted by current streak duration, descending.</li>
            </ul>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Ties are broken by the earliest valid attempt start timestamp.</li>
              <li>Banned, suspended, hidden, and opted-out accounts are excluded.</li>
              <li>Late joiners are labelled separately from on-time participants.</li>
              <li>Rankings are self-reported and are not independently verified.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className={cardClassName}>
          <CardHeader>
            <CardTitle>Certificate eligibility</CardTitle>
            <CardDescription>Calculated on the server, never from browser state.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm leading-6 text-muted-foreground md:grid-cols-2">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>The challenge has reached its configured end time.</li>
              <li>You joined before or at the official start.</li>
              <li>You are not marked as a late joiner.</li>
              <li>Your attempt has not been reset or disqualified.</li>
            </ul>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Server-side eligibility rules pass.</li>
              <li>You confirm the name printed on the certificate.</li>
              <li>The certificate states that completion is self-reported.</li>
              <li>
                Public verification reveals only the printed name, challenge, issue date,
                certificate ID, and valid or revoked status.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy and respectful conduct</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
            <p>
              Use a unique alias. Do not impersonate staff or use abusive, hateful, or misleading
              aliases.
            </p>
            <p>
              Only your alias and, if you opt in, your country may appear publicly. Your real name
              and email stay private.
            </p>
            <p>
              Account deletion will be available before launch, along with a documented data
              retention policy.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
            <p>
              Participation is voluntary and self-reported. The site does not verify completion and
              does not claim that abstinence has proven health benefits.
            </p>
            <p>
              This is not medical advice. If you have health concerns, speak with a qualified
              professional.
            </p>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
