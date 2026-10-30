import { FlaskConical } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function SampleBadge() {
  return (
    <Badge variant="outline" className="border-gold/40 text-gold">
      <FlaskConical aria-hidden="true" />
      Sample data
    </Badge>
  );
}
