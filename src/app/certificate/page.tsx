import { CertificatePreview } from "@/components/certificate/certificate-preview";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/shared/page-header";
import { SampleBadge } from "@/components/shared/sample-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatChallengeDate } from "@/lib/dates/challenge-date";
import { SAMPLE_CERTIFICATE } from "@/lib/mock/certificate";

export const metadata = {
  title: "Certificate",
};

export default function CertificatePage() {
  return (
    <Container className="max-w-4xl space-y-8 py-12 sm:py-16">
      <PageHeader
        eyebrow="Certificate preview"
        title="Your completion certificate"
        description="This is a sample preview of the certificate layout. No certificate has been issued."
      >
        <div className="flex flex-wrap gap-2">
          <SampleBadge />
          <Badge variant="outline">Not issued</Badge>
        </div>
      </PageHeader>

      <CertificatePreview />

      <Card>
        <CardHeader>
          <CardTitle>Certificate details</CardTitle>
          <CardDescription>Sample values for layout review.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <p className="text-xs tracking-wide text-muted-foreground uppercase">Printed name</p>
            <p className="mt-1 font-medium">{SAMPLE_CERTIFICATE.displayName}</p>
          </div>
          <div>
            <p className="text-xs tracking-wide text-muted-foreground uppercase">Public alias</p>
            <p className="mt-1 font-medium">{SAMPLE_CERTIFICATE.alias}</p>
          </div>
          <div>
            <p className="text-xs tracking-wide text-muted-foreground uppercase">Challenge</p>
            <p className="mt-1 font-medium">{SAMPLE_CERTIFICATE.challengeTitle}</p>
          </div>
          <div>
            <p className="text-xs tracking-wide text-muted-foreground uppercase">Completion date</p>
            <p className="mt-1 font-medium">{formatChallengeDate(SAMPLE_CERTIFICATE.issuedAt)}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Eligibility</CardTitle>
          <CardDescription>Checked on the server, never in the browser.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
          <p>
            A certificate can only be issued after the challenge end time when the server confirms
            an on-time, unbroken attempt.
          </p>
          <p>
            Late joiners and reset attempts are not eligible for the full-month certificate.
            Certificate issuance is idempotent, so repeated requests cannot create duplicates.
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <Button disabled aria-describedby="download-note">
          Download PDF
        </Button>
        <p id="download-note" className="text-xs text-muted-foreground">
          PDF generation and public verification arrive in Milestone 7.
        </p>
      </div>
    </Container>
  );
}
