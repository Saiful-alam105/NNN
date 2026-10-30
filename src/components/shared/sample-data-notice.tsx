import { Info } from "lucide-react";

import { Container } from "@/components/layout/container";

export function SampleDataNotice() {
  return (
    <div className="border-b border-gold/20 bg-gold/10">
      <Container className="flex items-start gap-2 py-2.5">
        <Info className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
        <p className="text-xs leading-5 text-gold sm:text-sm">
          Preview build: all participant data is sample data. Accounts, live streaks, and
          certificates are not active yet.
        </p>
      </Container>
    </div>
  );
}
