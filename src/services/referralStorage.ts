import AsyncStorage from '@react-native-async-storage/async-storage';

export const REFERRAL_STORAGE_KEYS = {
  myCode: 'sg_referral_my_code',
  invitesSharedCount: 'sg_referral_invites_shared_count',
  referralsAppliedCount: 'sg_referral_referrals_applied_count',
  appliedCode: 'sg_referral_applied_code',
  appliedAt: 'sg_referral_applied_at',
  claimToken: 'sg_referral_claim_token',
  claimedTokens: 'sg_referral_claimed_tokens',
  invalidClaimAttempts: 'sg_referral_invalid_claim_attempts',
  claimCooldownUntil: 'sg_referral_claim_cooldown_until',
} as const;

export const REFERRAL_CODE_REGEX = /^SG[A-Z0-9]{6,8}$/;
export const CLAIM_TOKEN_REGEX = /^[A-Za-z0-9_-]{20,48}$/;

const CLAIM_ATTEMPT_LIMIT = 5;
const CLAIM_COOLDOWN_MS = 30 * 1000;

const safeParseNumber = (value: string | null, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const safeParseStringArray = (value: string | null) => {
  if (!value) return [] as string[];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((item) => typeof item === 'string')
      : [];
  } catch {
    return [];
  }
};

const randomFromCharset = (length: number, charset: string) => {
  let output = '';
  for (let i = 0; i < length; i += 1) {
    const idx = Math.floor(Math.random() * charset.length);
    output += charset[idx];
  }
  return output;
};

const getNowIso = () => new Date().toISOString();

export const formatReferralCode = (value: string) =>
  String(value || '').trim().toUpperCase();

export const formatClaimToken = (value: string) => String(value || '').trim();

export const generateReferralCode = () => {
  const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const codeLength = 8;
  return `SG${randomFromCharset(codeLength, charset)}`;
};

export const generateClaimToken = () => {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  return randomFromCharset(24, charset);
};

export const ensureMyReferralCode = async () => {
  const existing = formatReferralCode(
    await AsyncStorage.getItem(REFERRAL_STORAGE_KEYS.myCode)
  );

  if (REFERRAL_CODE_REGEX.test(existing)) {
    return existing;
  }

  const nextCode = generateReferralCode();
  await AsyncStorage.setItem(REFERRAL_STORAGE_KEYS.myCode, nextCode);
  return nextCode;
};

export const getReferralSnapshot = async () => {
  const [
    myCode,
    invitesSharedCount,
    referralsAppliedCount,
    appliedCode,
    appliedAt,
    claimToken,
    claimedTokens,
  ] = await Promise.all([
    ensureMyReferralCode(),
    AsyncStorage.getItem(REFERRAL_STORAGE_KEYS.invitesSharedCount),
    AsyncStorage.getItem(REFERRAL_STORAGE_KEYS.referralsAppliedCount),
    AsyncStorage.getItem(REFERRAL_STORAGE_KEYS.appliedCode),
    AsyncStorage.getItem(REFERRAL_STORAGE_KEYS.appliedAt),
    AsyncStorage.getItem(REFERRAL_STORAGE_KEYS.claimToken),
    AsyncStorage.getItem(REFERRAL_STORAGE_KEYS.claimedTokens),
  ]);

  return {
    myCode,
    invitesSharedCount: safeParseNumber(invitesSharedCount, 0),
    referralsAppliedCount: safeParseNumber(referralsAppliedCount, 0),
    appliedCode: appliedCode || '',
    appliedAt: appliedAt || '',
    claimToken: claimToken || '',
    claimedTokens: safeParseStringArray(claimedTokens),
  };
};

export const incrementInvitesSharedCount = async () => {
  const current = safeParseNumber(
    await AsyncStorage.getItem(REFERRAL_STORAGE_KEYS.invitesSharedCount),
    0
  );
  const next = current + 1;
  await AsyncStorage.setItem(
    REFERRAL_STORAGE_KEYS.invitesSharedCount,
    String(next)
  );
  return next;
};

export const incrementReferralsAppliedCount = async () => {
  const current = safeParseNumber(
    await AsyncStorage.getItem(REFERRAL_STORAGE_KEYS.referralsAppliedCount),
    0
  );
  const next = current + 1;
  await AsyncStorage.setItem(
    REFERRAL_STORAGE_KEYS.referralsAppliedCount,
    String(next)
  );
  return next;
};

export type ApplyReferralResult =
  | { ok: true; appliedCode: string; appliedAt: string; claimToken: string }
  | {
      ok: false;
      reason: 'invalid' | 'self_referral' | 'already_applied';
      message: string;
    };

export const applyReferralCodeOnDevice = async (
  enteredCode: string
): Promise<ApplyReferralResult> => {
  const normalizedCode = formatReferralCode(enteredCode);

  if (!REFERRAL_CODE_REGEX.test(normalizedCode)) {
    return {
      ok: false,
      reason: 'invalid',
      message: 'Invalid code format. Use SG + 6 to 8 letters/numbers.',
    };
  }

  const [myCode, appliedCode] = await Promise.all([
    ensureMyReferralCode(),
    AsyncStorage.getItem(REFERRAL_STORAGE_KEYS.appliedCode),
  ]);

  if (normalizedCode === myCode) {
    return {
      ok: false,
      reason: 'self_referral',
      message: 'You cannot apply your own referral code.',
    };
  }

  if (appliedCode) {
    return {
      ok: false,
      reason: 'already_applied',
      message: 'Referral already used on this device.',
    };
  }

  const appliedAt = getNowIso();
  const claimToken = generateClaimToken();

  await AsyncStorage.multiSet([
    [REFERRAL_STORAGE_KEYS.appliedCode, normalizedCode],
    [REFERRAL_STORAGE_KEYS.appliedAt, appliedAt],
    [REFERRAL_STORAGE_KEYS.claimToken, claimToken],
  ]);

  return {
    ok: true,
    appliedCode: normalizedCode,
    appliedAt,
    claimToken,
  };
};

const recordInvalidClaimAttempt = async () => {
  const attempts = safeParseNumber(
    await AsyncStorage.getItem(REFERRAL_STORAGE_KEYS.invalidClaimAttempts),
    0
  );
  const nextAttempts = attempts + 1;

  if (nextAttempts >= CLAIM_ATTEMPT_LIMIT) {
    const cooldownUntil = String(Date.now() + CLAIM_COOLDOWN_MS);
    await AsyncStorage.multiSet([
      [REFERRAL_STORAGE_KEYS.invalidClaimAttempts, '0'],
      [REFERRAL_STORAGE_KEYS.claimCooldownUntil, cooldownUntil],
    ]);
    return {
      cooldown: true,
      retryAfterSeconds: Math.ceil(CLAIM_COOLDOWN_MS / 1000),
    };
  }

  await AsyncStorage.setItem(
    REFERRAL_STORAGE_KEYS.invalidClaimAttempts,
    String(nextAttempts)
  );

  return {
    cooldown: false,
    retryAfterSeconds: 0,
  };
};

const clearClaimThrottle = async () => {
  await AsyncStorage.multiSet([
    [REFERRAL_STORAGE_KEYS.invalidClaimAttempts, '0'],
    [REFERRAL_STORAGE_KEYS.claimCooldownUntil, '0'],
  ]);
};

export type ClaimReferralResult =
  | { ok: true; token: string }
  | {
      ok: false;
      reason: 'invalid' | 'already_claimed' | 'cooldown';
      message: string;
      retryAfterSeconds?: number;
    };

export const claimReferralRewardWithToken = async (
  tokenInput: string
): Promise<ClaimReferralResult> => {
  const token = formatClaimToken(tokenInput);

  const cooldownUntil = safeParseNumber(
    await AsyncStorage.getItem(REFERRAL_STORAGE_KEYS.claimCooldownUntil),
    0
  );
  const now = Date.now();
  if (cooldownUntil > now) {
    return {
      ok: false,
      reason: 'cooldown',
      message: 'Too many invalid attempts. Please wait and try again.',
      retryAfterSeconds: Math.ceil((cooldownUntil - now) / 1000),
    };
  }

  if (!CLAIM_TOKEN_REGEX.test(token)) {
    const invalidState = await recordInvalidClaimAttempt();
    if (invalidState.cooldown) {
      return {
        ok: false,
        reason: 'cooldown',
        message: 'Too many invalid attempts. Please wait and try again.',
        retryAfterSeconds: invalidState.retryAfterSeconds,
      };
    }

    return {
      ok: false,
      reason: 'invalid',
      message: 'Invalid confirmation token.',
    };
  }

  const claimedTokens = safeParseStringArray(
    await AsyncStorage.getItem(REFERRAL_STORAGE_KEYS.claimedTokens)
  );

  if (claimedTokens.includes(token)) {
    return {
      ok: false,
      reason: 'already_claimed',
      message: 'This confirmation token was already claimed.',
    };
  }

  const nextClaimedTokens = [...claimedTokens, token].slice(-250);
  await AsyncStorage.multiSet([
    [REFERRAL_STORAGE_KEYS.claimedTokens, JSON.stringify(nextClaimedTokens)],
  ]);

  await Promise.all([clearClaimThrottle(), incrementReferralsAppliedCount()]);

  return {
    ok: true,
    token,
  };
};
