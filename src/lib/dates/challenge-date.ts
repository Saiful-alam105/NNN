import { CHALLENGE_TIME_ZONE } from "@/lib/challenge/config";

const challengeDateFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: CHALLENGE_TIME_ZONE,
  day: "numeric",
  month: "long",
  year: "numeric",
});

const challengeDateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: CHALLENGE_TIME_ZONE,
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZoneName: "short",
});

export function formatChallengeDate(value: string | Date): string {
  return challengeDateFormatter.format(new Date(value));
}

export function formatChallengeDateTime(value: string | Date): string {
  return challengeDateTimeFormatter.format(new Date(value));
}
