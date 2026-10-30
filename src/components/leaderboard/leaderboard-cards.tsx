import { formatStreak } from "@/lib/leaderboard/format";
import type { LeaderboardEntry } from "@/lib/mock/leaderboard";

export function LeaderboardCards({ entries }: { entries: LeaderboardEntry[] }) {
  return (
    <ul className="space-y-2">
      {entries.map((entry) => (
        <li key={entry.alias} className="rounded-xl bg-card p-4 ring-1 ring-foreground/10">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-medium">{entry.alias}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {entry.country ?? "Country not shown"}
              </p>
            </div>
            <span className="text-sm text-muted-foreground tabular-nums">#{entry.rank}</span>
          </div>
          <div className="mt-3 flex items-baseline justify-between gap-3">
            <span className="text-xs tracking-wide text-muted-foreground uppercase">
              Current streak
            </span>
            <span className="font-heading text-lg font-semibold tabular-nums">
              {formatStreak(entry.streakDays, entry.streakHours)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
