import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatStreak } from "@/lib/leaderboard/format";
import type { LeaderboardEntry } from "@/lib/mock/leaderboard";

export function LeaderboardTable({
  entries,
  caption,
}: {
  entries: LeaderboardEntry[];
  caption: string;
}) {
  return (
    <Table>
      <TableCaption className="sr-only">{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">Rank</TableHead>
          <TableHead>Alias</TableHead>
          <TableHead>Current streak</TableHead>
          <TableHead className="text-right">Country</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => (
          <TableRow key={entry.alias}>
            <TableCell className="text-muted-foreground tabular-nums">#{entry.rank}</TableCell>
            <TableCell className="font-medium">{entry.alias}</TableCell>
            <TableCell className="tabular-nums">
              {formatStreak(entry.streakDays, entry.streakHours)}
            </TableCell>
            <TableCell className="text-right text-muted-foreground">
              {entry.country ?? "—"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
