export type LeaderboardEntry = {
  rank: number;
  alias: string;
  streakDays: number;
  streakHours: number;
  country?: string;
};

export const SAMPLE_ACTIVE_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, alias: "midnight_fox", streakDays: 29, streakHours: 17, country: "Bangladesh" },
  { rank: 2, alias: "northstar", streakDays: 28, streakHours: 22, country: "Japan" },
  { rank: 3, alias: "quiet_river", streakDays: 27, streakHours: 11 },
  { rank: 4, alias: "ember_leaf", streakDays: 24, streakHours: 6, country: "Ireland" },
  { rank: 5, alias: "atlas_7", streakDays: 21, streakHours: 19, country: "Germany" },
  { rank: 6, alias: "solstice", streakDays: 18, streakHours: 3 },
  { rank: 7, alias: "paper_crane", streakDays: 12, streakHours: 8, country: "Bangladesh" },
  { rank: 8, alias: "deep_blue", streakDays: 9, streakHours: 14 },
  { rank: 9, alias: "morning_rain", streakDays: 6, streakHours: 1, country: "Ireland" },
  { rank: 10, alias: "cobalt", streakDays: 3, streakHours: 20 },
];

export const SAMPLE_LATE_JOINERS: LeaderboardEntry[] = [
  { rank: 1, alias: "late_comet", streakDays: 9, streakHours: 2, country: "Ireland" },
  { rank: 2, alias: "nov_runner", streakDays: 5, streakHours: 11 },
  { rank: 3, alias: "new_leaf", streakDays: 2, streakHours: 4, country: "Bangladesh" },
];

export const SAMPLE_STATS = {
  registered: 13,
  active: 13,
  certificates: 0,
} as const;
