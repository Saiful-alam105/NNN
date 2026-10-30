import { PLANNED_CHALLENGE } from "@/lib/challenge/config";

export const SAMPLE_CERTIFICATE = {
  code: "NNN-2026-SAMPLE-0001",
  displayName: "Paper Crane",
  alias: "paper_crane",
  challengeTitle: PLANNED_CHALLENGE.title,
  challengeYear: PLANNED_CHALLENGE.year,
  issuedAt: "2026-11-30T18:05:00.000Z",
  status: "sample",
} as const;
