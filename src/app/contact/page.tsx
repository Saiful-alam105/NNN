import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <Container className="max-w-3xl space-y-6 py-12 sm:py-16">
      <PageHeader
        eyebrow="Contact"
        title="Contact the team"
        description="Contact details will be published before launch."
      />
      <Card>
        <CardContent className="space-y-3 pt-2 text-sm leading-6 text-muted-foreground">
          <p>
            This preview build does not provide a contact inbox or support form. Do not send
            personal or sensitive information through the preview.
          </p>
          <p>
            A monitored contact channel for privacy requests, moderation questions, and certificate
            issues will be published before the challenge opens.
          </p>
        </CardContent>
      </Card>
    </Container>
  );
}
