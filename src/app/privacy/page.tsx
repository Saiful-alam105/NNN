import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <Container className="max-w-3xl space-y-6 py-12 sm:py-16">
      <PageHeader
        eyebrow="Privacy"
        title="Privacy policy"
        description="The full privacy policy will be published before launch."
      />
      <Card>
        <CardContent className="space-y-3 pt-2 text-sm leading-6 text-muted-foreground">
          <p>
            This preview build does not collect accounts or live streaks. Public pages will show
            aliases only, never real names or email addresses.
          </p>
          <p>
            The final policy will explain what data is collected, how it is stored, how long it is
            retained, how account deletion works, and how to exercise your privacy rights.
          </p>
          <p>Reset history and private challenge information will never appear on public pages.</p>
        </CardContent>
      </Card>
    </Container>
  );
}
