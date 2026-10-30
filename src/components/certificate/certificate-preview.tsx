import { Award, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatChallengeDate } from "@/lib/dates/challenge-date";
import { SAMPLE_CERTIFICATE } from "@/lib/mock/certificate";

export function CertificatePreview() {
  return (
    <article
      className="relative overflow-hidden rounded-2xl border border-gold/40 bg-card p-6 sm:p-10"
      aria-label="Sample certificate preview"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,197,66,0.12),transparent_55%)]"
        aria-hidden="true"
      />
      <div className="relative space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gold">
            <Award className="size-5" aria-hidden="true" />
            Certificate of Completion
          </div>
          <Badge variant="outline" className="border border-gold/40 bg-gold/10 text-gold">
            Sample — not valid
          </Badge>
        </div>
        <div className="space-y-3 text-center">
          <p className="text-sm text-muted-foreground">This certificate recognizes</p>
          <p className="font-heading text-3xl font-semibold tracking-tight sm:text-5xl">
            {SAMPLE_CERTIFICATE.displayName}
          </p>
          <p className="text-sm text-muted-foreground">for completing</p>
          <p className="font-heading text-xl font-semibold sm:text-2xl">
            {SAMPLE_CERTIFICATE.challengeTitle}
          </p>
        </div>
        <div className="grid gap-4 border-t border-border/70 pt-6 text-sm sm:grid-cols-3">
          <div>
            <p className="text-xs tracking-wide text-muted-foreground uppercase">Completion date</p>
            <p className="mt-1 font-medium">{formatChallengeDate(SAMPLE_CERTIFICATE.issuedAt)}</p>
          </div>
          <div>
            <p className="text-xs tracking-wide text-muted-foreground uppercase">Certificate ID</p>
            <p className="mt-1 font-mono text-xs font-medium sm:text-sm">
              {SAMPLE_CERTIFICATE.code}
            </p>
          </div>
          <div>
            <p className="text-xs tracking-wide text-muted-foreground uppercase">Verification</p>
            <p className="mt-1 text-xs font-medium">Available in Milestone 7</p>
          </div>
        </div>
        <div className="flex items-start gap-2 text-xs leading-5 text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p>
            Completion is self-reported and is not independently verified. This is a sample preview
            and cannot be used as proof of completion.
          </p>
        </div>
      </div>
    </article>
  );
}
