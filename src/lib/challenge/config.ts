export const CHALLENGE_TIME_ZONE = "Asia/Dhaka";
export const CHALLENGE_TIME_ZONE_LABEL = "Asia/Dhaka (UTC+6)";

export const PLANNED_CHALLENGE = {
  slug: "nnn-2026",
  title: "No Nut November 2026",
  year: 2026,
  startAtUtc: "2026-10-31T18:00:00.000Z",
  endAtUtc: "2026-11-30T18:00:00.000Z",
  timezone: CHALLENGE_TIME_ZONE,
  durationDays: 30,
  status: "upcoming",
} as const;

export type ChallengeStatus = "upcoming" | "active" | "completed";
