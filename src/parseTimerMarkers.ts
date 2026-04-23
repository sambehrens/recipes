export type TimerToken = {
  label?: string;
  displayText: string;
  minSeconds: number;
  maxSeconds: number;
  isRange: boolean;
};

export function parseStepSegments(step: string): Array<string | TimerToken> {
  const regex = /\{([^}]+)\}/g;
  const result: Array<string | TimerToken> = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(step)) !== null) {
    if (match.index > lastIndex) {
      result.push(step.slice(lastIndex, match.index));
    }

    const content = match[1];
    const pipeIndex = content.indexOf("|");

    let label: string | undefined;
    let durationText: string;

    if (pipeIndex !== -1) {
      label = content.slice(0, pipeIndex).trim();
      durationText = content.slice(pipeIndex + 1).trim();
    } else {
      durationText = content.trim();
    }

    const { minSeconds, maxSeconds, isRange } = parseDuration(durationText);
    result.push({ label, displayText: durationText, minSeconds, maxSeconds, isRange });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < step.length) {
    result.push(step.slice(lastIndex));
  }

  return result;
}

function parseDuration(text: string): { minSeconds: number; maxSeconds: number; isRange: boolean } {
  const dashRange = text.match(/^(\d+)\s*-\s*(\d+)\s*(hours?|minutes?|mins?|seconds?|secs?)$/i);
  if (dashRange) {
    return {
      minSeconds: toSeconds(parseInt(dashRange[1]), dashRange[3]),
      maxSeconds: toSeconds(parseInt(dashRange[2]), dashRange[3]),
      isRange: true,
    };
  }

  const toRange = text.match(/^(\d+)\s+to\s+(\d+)\s*(hours?|minutes?|mins?|seconds?|secs?)$/i);
  if (toRange) {
    return {
      minSeconds: toSeconds(parseInt(toRange[1]), toRange[3]),
      maxSeconds: toSeconds(parseInt(toRange[2]), toRange[3]),
      isRange: true,
    };
  }

  let totalSeconds = 0;
  const hoursMatch = text.match(/(\d+)\s*hours?/i);
  const minutesMatch = text.match(/(\d+)\s*(minutes?|mins?)/i);
  const secondsMatch = text.match(/(\d+)\s*(seconds?|secs?)/i);

  if (hoursMatch) totalSeconds += parseInt(hoursMatch[1]) * 3600;
  if (minutesMatch) totalSeconds += parseInt(minutesMatch[1]) * 60;
  if (secondsMatch) totalSeconds += parseInt(secondsMatch[1]);

  return { minSeconds: totalSeconds, maxSeconds: totalSeconds, isRange: false };
}

function toSeconds(value: number, unit: string): number {
  const u = unit.toLowerCase();
  if (u.startsWith("h")) return value * 3600;
  if (u.startsWith("m")) return value * 60;
  return value;
}

export function formatDuration(seconds: number): string {
  if (seconds <= 0) return "0 seconds";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
  if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`);
  if (secs > 0) parts.push(`${secs} ${secs === 1 ? "second" : "seconds"}`);

  return parts.join(" ");
}

export function formatCompact(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;

  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0 && mins === 0 && secs === 0) return `${hours}h`;
  if (hours > 0 && secs === 0) return `${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h ${mins}m`;
  if (mins > 0 && secs === 0) return `${mins}m`;
  return `${mins}m ${secs}s`;
}

export function getAdjustStep(seconds: number): number {
  if (seconds >= 5 * 60) return 60;
  if (seconds >= 60) return 30;
  return 15;
}

export function getMidpoint(minSeconds: number, maxSeconds: number): number {
  return Math.round((minSeconds + maxSeconds) / 2 / 60) * 60;
}
