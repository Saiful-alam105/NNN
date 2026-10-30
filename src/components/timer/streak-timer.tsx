import { SampleBadge } from "@/components/shared/sample-badge";

export function StreakTimer({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) {
  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-sm font-medium">Current streak</h2>
        <SampleBadge />
      </div>
      <div
        className="grid grid-cols-4 gap-2 sm:gap-3"
        role="group"
        aria-label={`Sample current streak: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`}
      >
        {units.map((unit) => (
          <div key={unit.label} className="rounded-lg bg-muted/60 px-1 py-4 text-center sm:py-6">
            <span className="block font-heading text-2xl font-semibold tabular-nums sm:text-4xl lg:text-5xl">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="mt-1 block text-[0.65rem] tracking-wide text-muted-foreground uppercase sm:text-xs">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">Live timer behavior arrives in Milestone 4.</p>
    </div>
  );
}
