import AsyncStorage from "@react-native-async-storage/async-storage";
import { toLocalDateKey } from "../../utils/dateKey";
import { getLedger } from "../../wallet/walletStore";

const DAILY_AD_LOCK_KEY = "sg_rewarded_ad_lock";
const DAILY_AD_NEXT_AVAILABLE_AT_KEY = "sg_rewarded_ad_next_available_at";
const LOCK_STALE_MS = 5 * 60 * 1000;

type LockState = {
  active: boolean;
  ts: number;
};

type DailyAdStatus = {
  dateKey: string;
  claimedCount: number;
  remaining: number;
  lockActive: boolean;
  nextAvailableAt: number;
  cooldownRemainingMs: number;
};

type AcquireResult = DailyAdStatus & {
  ok: boolean;
  reason?: "limit_reached" | "locked" | "cooldown";
};

const parseTimestamp = (value: string | null) => {
  const next = Number(value);
  return Number.isFinite(next) && next > 0 ? Math.floor(next) : 0;
};

const parseLock = (raw: string | null): LockState => {
  if (!raw) return { active: false, ts: 0 };
  try {
    const parsed = JSON.parse(raw);
    return {
      active: parsed?.active === true,
      ts: Number(parsed?.ts) || 0,
    };
  } catch (_error) {
    return { active: false, ts: 0 };
  }
};

const isLockActive = (lock: LockState) => {
  if (!lock.active) return false;
  const age = Date.now() - (lock.ts || 0);
  return age >= 0 && age < LOCK_STALE_MS;
};

const setLock = async (active: boolean) => {
  const payload: LockState = { active, ts: Date.now() };
  await AsyncStorage.setItem(DAILY_AD_LOCK_KEY, JSON.stringify(payload));
};

const getClaimCountFromLedger = async (dateKey: string) => {
  const ledger = await getLedger();
  const watchAdLimit = ledger?.limits?.watchAd;
  if (watchAdLimit?.dateKey === dateKey) {
    return Math.max(0, Number(watchAdLimit.claimedCount) || 0);
  }

  const prefix = `watchAd:${dateKey}:`;
  const processed = Array.isArray(ledger?.processedEventIds)
    ? ledger.processedEventIds
    : [];
  return processed.reduce((count, eventId) => {
    return eventId.startsWith(prefix) ? count + 1 : count;
  }, 0);
};

export async function getDailyAdStatus(maxPerDay = 2): Promise<DailyAdStatus> {
  const today = toLocalDateKey();
  const [storedLockRaw, storedNextAvailableAtRaw, claimedCountRaw] =
    await Promise.all([
      AsyncStorage.getItem(DAILY_AD_LOCK_KEY),
      AsyncStorage.getItem(DAILY_AD_NEXT_AVAILABLE_AT_KEY),
      getClaimCountFromLedger(today),
    ]);

  const claimedCount = Math.min(
    Math.max(0, Number(claimedCountRaw) || 0),
    maxPerDay
  );
  const lock = parseLock(storedLockRaw);
  const lockActive = isLockActive(lock);
  const now = Date.now();
  const parsedNextAvailableAt = parseTimestamp(storedNextAvailableAtRaw);
  const cooldownRemainingMs = Math.max(0, parsedNextAvailableAt - now);
  const nextAvailableAt = cooldownRemainingMs > 0 ? parsedNextAvailableAt : 0;

  const cleanupTasks: Promise<any>[] = [];
  if (!lockActive && lock.active) cleanupTasks.push(setLock(false));
  if (parsedNextAvailableAt > 0 && nextAvailableAt === 0) {
    cleanupTasks.push(
      AsyncStorage.removeItem(DAILY_AD_NEXT_AVAILABLE_AT_KEY).catch(() => {})
    );
  }
  if (cleanupTasks.length > 0) {
    await Promise.all(cleanupTasks);
  }

  return {
    dateKey: today,
    claimedCount,
    remaining: Math.max(0, maxPerDay - claimedCount),
    lockActive,
    nextAvailableAt,
    cooldownRemainingMs,
  };
}

export async function acquireDailyAdLock(maxPerDay = 2): Promise<AcquireResult> {
  const status = await getDailyAdStatus(maxPerDay);
  if (status.cooldownRemainingMs > 0) {
    return { ...status, ok: false, reason: "cooldown" };
  }
  if (status.lockActive) {
    return { ...status, ok: false, reason: "locked" };
  }
  if (status.remaining <= 0) {
    return { ...status, ok: false, reason: "limit_reached" };
  }

  await setLock(true);
  return { ...status, ok: true, lockActive: true };
}

export async function releaseDailyAdLock() {
  await setLock(false);
}

export async function setRewardedAdNextAvailableAfter(durationMs: number) {
  const safeDuration = Math.max(0, Number(durationMs) || 0);
  if (safeDuration <= 0) {
    await AsyncStorage.removeItem(DAILY_AD_NEXT_AVAILABLE_AT_KEY);
    return 0;
  }
  const nextAvailableAt = Date.now() + safeDuration;
  await AsyncStorage.setItem(
    DAILY_AD_NEXT_AVAILABLE_AT_KEY,
    String(nextAvailableAt)
  );
  return nextAvailableAt;
}

export async function clearRewardedAdNextAvailableAt() {
  await AsyncStorage.removeItem(DAILY_AD_NEXT_AVAILABLE_AT_KEY);
}

export async function incrementDailyAdClaim(maxPerDay = 2): Promise<DailyAdStatus> {
  // Claimed count is derived from wallet event IDs (watchAd:YYYY-MM-DD:<index>),
  // so coin credit and count progression are atomically tied to one transaction.
  await setLock(false);
  return getDailyAdStatus(maxPerDay);
}
