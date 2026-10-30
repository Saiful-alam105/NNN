import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/shared/page-header";
import { SampleBadge } from "@/components/shared/sample-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SAMPLE_PROFILE } from "@/lib/mock/profile";

export const metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <Container className="max-w-4xl space-y-8 py-12 sm:py-16">
      <PageHeader
        eyebrow="Sample profile"
        title="Your profile"
        description="Public alias, private details, and privacy preferences. This preview is read-only."
      >
        <SampleBadge />
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle>Public profile</CardTitle>
              <Badge variant="outline" className="border-success/40 text-success">
                Public
              </Badge>
            </div>
            <CardDescription>These fields can appear on the public leaderboard.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="alias">Alias</Label>
              <Input id="alias" defaultValue={SAMPLE_PROFILE.alias} disabled />
              <p className="text-xs text-muted-foreground">
                Unique, case-insensitive, and shown instead of your real name.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" defaultValue={SAMPLE_PROFILE.country} disabled />
              <p className="text-xs text-muted-foreground">Only shown if you opt in.</p>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="show-leaderboard"
                defaultChecked={SAMPLE_PROFILE.showOnLeaderboard}
                disabled
              />
              <div className="space-y-1">
                <Label htmlFor="show-leaderboard">Show me on the leaderboard</Label>
                <p className="text-xs text-muted-foreground">
                  You can hide your alias from public rankings.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox id="show-country" defaultChecked={SAMPLE_PROFILE.showCountry} disabled />
              <div className="space-y-1">
                <Label htmlFor="show-country">Show my country</Label>
                <p className="text-xs text-muted-foreground">
                  Optional. Country is never required.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle>Private details</CardTitle>
              <Badge variant="outline">Private</Badge>
            </div>
            <CardDescription>Never shown on public pages or the leaderboard.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="real-name">Real name</Label>
              <Input id="real-name" defaultValue={SAMPLE_PROFILE.realName} disabled />
              <p className="text-xs text-muted-foreground">
                Stored privately and used only for account administration.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="certificate-name">Certificate display name</Label>
              <Input id="certificate-name" defaultValue={SAMPLE_PROFILE.certificateName} disabled />
              <p className="text-xs text-muted-foreground">
                Printed on your certificate. You will confirm this explicitly before issuing.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Save changes</CardTitle>
          <CardDescription>Profile editing arrives in Milestone 3.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button disabled aria-describedby="save-note" className="w-fit sm:w-auto">
            Save changes
          </Button>
          <p id="save-note" className="text-xs text-muted-foreground">
            This preview prevents accidental changes. Server-side validation and alias uniqueness
            arrive with the profile milestone.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account and privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-muted-foreground">
            Your email and real name are private. Public pages show only your alias and, if you opt
            in, your country. Reset history is never public.
          </p>
          <Separator />
          <div className="space-y-2">
            <p className="text-sm font-medium">Account deletion</p>
            <p className="text-xs leading-5 text-muted-foreground">
              A documented deletion process will be available before launch. It will remove your
              account data in line with the privacy policy.
            </p>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
