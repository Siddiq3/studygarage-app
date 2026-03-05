export type StreakMilestone = {
  days: number;
  bonusCoins: number;
  label?: string;
};

export const DEFAULT_STREAK_MILESTONES: StreakMilestone[] = [
  { days: 3, bonusCoins: 5, label: "Kickstart" },
  { days: 7, bonusCoins: 10, label: "Momentum" },
  { days: 10, bonusCoins: 15, label: "Consistency" },
  { days: 30, bonusCoins: 30, label: "Mastery" },
];

const sanitizeMilestone = (item: any): StreakMilestone | null => {
  if (!item || typeof item !== "object") return null;
  const days = Number(item.days);
  const bonusCoins = Number(item.bonusCoins);
  if (!Number.isFinite(days) || !Number.isFinite(bonusCoins)) return null;
  if (days <= 0 || bonusCoins < 0) return null;

  return {
    days: Math.round(days),
    bonusCoins: Math.round(bonusCoins),
    label: typeof item.label === "string" ? item.label : undefined,
  };
};

export const normalizeMilestones = (
  milestones: unknown,
  fallback: StreakMilestone[] = DEFAULT_STREAK_MILESTONES
): StreakMilestone[] => {
  const source = Array.isArray(milestones) ? milestones : fallback;
  const normalized = source
    .map(sanitizeMilestone)
    .filter((item): item is StreakMilestone => Boolean(item))
    .sort((a, b) => a.days - b.days);

  const deduped: StreakMilestone[] = [];
  for (const item of normalized) {
    if (!deduped.find((entry) => entry.days === item.days)) {
      deduped.push(item);
    }
  }

  if (!deduped.length && fallback !== DEFAULT_STREAK_MILESTONES) {
    return normalizeMilestones(DEFAULT_STREAK_MILESTONES, DEFAULT_STREAK_MILESTONES);
  }

  return deduped.length ? deduped : [...DEFAULT_STREAK_MILESTONES];
};

export const getCurrentMilestone = (
  streakDays: number,
  milestones: StreakMilestone[]
): StreakMilestone | null => {
  const safeDays = Math.max(0, Number(streakDays) || 0);
  const normalized = normalizeMilestones(milestones);
  let current: StreakMilestone | null = null;
  for (const milestone of normalized) {
    if (safeDays >= milestone.days) {
      current = milestone;
    }
  }
  return current;
};

export const getNextMilestone = (
  streakDays: number,
  milestones: StreakMilestone[]
): StreakMilestone | null => {
  const safeDays = Math.max(0, Number(streakDays) || 0);
  const normalized = normalizeMilestones(milestones);
  return normalized.find((milestone) => safeDays < milestone.days) || null;
};

export const getProgressToNext = (
  streakDays: number,
  nextMilestoneDays: number,
  currentMilestoneDays = 0
): number => {
  const safeStreak = Math.max(0, Number(streakDays) || 0);
  const safeNext = Math.max(1, Number(nextMilestoneDays) || 1);
  const safeCurrent = Math.max(0, Number(currentMilestoneDays) || 0);

  if (safeStreak >= safeNext) return 1;
  const span = Math.max(1, safeNext - safeCurrent);
  const covered = Math.max(0, safeStreak - safeCurrent);
  return Math.min(1, covered / span);
};
