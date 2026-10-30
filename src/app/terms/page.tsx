import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Terms",
};

export default function TermsPage() {
  return (
    <Container className="max-w-3xl space-y-6 py-12 sm:py-16">
      <PageHeader
        eyebrow="Terms"
        title="Terms of use"
        description="The full terms will be published before launch."
      />
      <Card>
        <CardContent className="space-y-3 pt-2 text-sm leading-6 text-muted-foreground">
          <p>
            The challenge is voluntary and self-reported. The service cannot verify private behavior
            and does not claim that abstinence has proven health benefits.
          </p>
          <p>
            You must be 18 or older to use the service. Do not use abusive aliases, impersonate
            staff, or attempt to access another participant&apos;s private data.
          </p>
          <p>
            The final terms will cover acceptable use, account responsibilities, certificate
            limitations, and service availability.
          </p>
        </CardContent>
      </Card>
    </Container>
  );
}
