import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultConfig } from "../config/remoteConfig";

const WALLET_STATE_STORAGE_KEY = "sg_wallet_state_v1";
const WALLET_STATE_VERSION = 1;
const MAX_LEDGER_ENTRIES = 300;
const MAX_PROCESSED_EVENT_IDS = 5000;

const LEGACY_BALANCE_KEYS = ["totalScore", "coinsBalance", "sg_coin_balance"];
const WATCH_AD_EVENT_REGEX = /^watchAd:(\d{4}-\d{2}-\d{2}):(\d+)$/;

export type WalletMutationSource =
  | "welcome_bonus"
  | "quiz_correct"
  | "daily_claim"
  | "streak_milestone"
  | "watch_ad"
  | "referral"
  | "redeem_voucher"
  | "redeem_refund"
  | "migration"
  | "manual_adjustment"
  | "legacy";

export type WalletLedgerSource =
  | "welcome"
  | "quiz"
  | "daily"
  | "streak"
  | "ad"
  | "redeem"
  | "referral"
  | "migration"
  | "admin";

export type WalletLedgerEntry = {
  id: string;
  eventId: string;
  type: "earn" | "spend";
  source: WalletLedgerSource;
  title: string;
  delta: number;
  status?: string;
  // Legacy/compat fields retained for existing screens.
  kind: "add" | "spend";
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  reason?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
};

type WalletWatchAdLimitState = {
  dateKey: string;
  claimedCount: number;
};

export type WalletState = {
  version: number;
  balance: number;
  processedEventIds: string[];
  limits: {
    watchAd: WalletWatchAdLimitState;
  };
  lastPromptDates: Record<string, string>;
  history: WalletLedgerEntry[];
};

type AddCoinsParams = {
  eventId: string;
  amount: number;
  source: WalletMutationSource | string;
  meta?: Record<string, unknown>;
};

type SpendCoinsParams = {
  eventId: string;
  amount: number;
  reason: string;
  source?: WalletMutationSource | string;
  meta?: Record<string, unknown>;
};

type RecordEventParams = {
  eventId: string;
  type: "earn" | "spend";
  source: WalletLedgerSource | WalletMutationSource | string;
  title?: string;
  delta: number;
  balanceAfter?: number;
  meta?: Record<string, unknown>;
  createdAt?: string;
  status?: string;
};

type MutationResult = {
  ok: boolean;
  applied: boolean;
  duplicate?: boolean;
  reason?: "insufficient";
  balance: number;
  entry?: WalletLedgerEntry;
};

export type WalletLedgerSnapshot = {
  balance: number;
  processedEventIds: string[];
  limits: WalletState["limits"];
  history: WalletLedgerEntry[];
};

type WalletBalanceListener = (balance: number) => void;

const createDefaultState = (balance = defaultConfig.welcomeCoins): WalletState => ({
  version: WALLET_STATE_VERSION,
  balance: Math.max(0, Number(balance) || 0),
  processedEventIds: [],
  limits: {
    watchAd: {
      dateKey: "",
      claimedCount: 0,
    },
  },
  lastPromptDates: {},
  history: [],
});

const toSafeAmount = (value: unknown, allowZero = false) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  const normalized = Math.max(0, Math.round(parsed));
  if (!allowZero && normalized <= 0) return 0;
  return normalized;
};

const toSafeEventId = (value: unknown) => String(value || "").trim();

const trimArrayTail = <T,>(value: T[], maxItems: number) => {
  if (value.length <= maxItems) return value;
  return value.slice(value.length - maxItems);
};

const normalizeWatchAdState = (
  raw: Partial<WalletWatchAdLimitState> | null | undefined
): WalletWatchAdLimitState => ({
  dateKey: typeof raw?.dateKey === "string" ? raw.dateKey : "",
  claimedCount: Math.max(0, Number(raw?.claimedCount) || 0),
});

const LEDGER_SOURCE_ALIASES: Record<string, WalletLedgerSource> = {
  welcome_bonus: "welcome",
  welcome: "welcome",
  quiz_correct: "quiz",
  quiz: "quiz",
  daily_claim: "daily",
  daily: "daily",
  streak_milestone: "streak",
  streak: "streak",
  watch_ad: "ad",
  ad: "ad",
  redeem_voucher: "redeem",
  redeem_refund: "redeem",
  redeem: "redeem",
  referral: "referral",
  migration: "migration",
  manual_adjustment: "admin",
  legacy: "admin",
  admin: "admin",
};

const toLedgerType = (kind: unknown): "earn" | "spend" =>
  kind === "spend" ? "spend" : kind === "add" ? "earn" : kind === "earn" ? "earn" : "spend";

const toLedgerKind = (type: unknown): "add" | "spend" =>
  type === "spend" ? "spend" : "add";

const normalizeLedgerSource = (
  rawSource: unknown,
  eventId: string,
  reason?: unknown
): WalletLedgerSource => {
  const sourceKey = String(rawSource || "").toLowerCase().trim();
  if (sourceKey && LEDGER_SOURCE_ALIASES[sourceKey]) {
    return LEDGER_SOURCE_ALIASES[sourceKey];
  }

  const reasonKey = String(reason || "").toLowerCase().trim();
  if (reasonKey && LEDGER_SOURCE_ALIASES[reasonKey]) {
    return LEDGER_SOURCE_ALIASES[reasonKey];
  }

  if (eventId.startsWith("quiz:")) return "quiz";
  if (eventId.startsWith("dailyClaim:")) return "daily";
  if (eventId.startsWith("streak:")) return "streak";
  if (eventId.startsWith("watchAd:")) return "ad";
  if (eventId.startsWith("redeem:") || eventId.startsWith("refund:")) {
    return "redeem";
  }
  if (eventId.startsWith("referral:")) return "referral";
  if (eventId.startsWith("welcome:")) return "welcome";
  if (eventId.startsWith("wallet_sync:")) return "migration";

  return "admin";
};

const toTitleCase = (value: string) =>
  value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const toRedeemProviderLabel = (meta?: Record<string, unknown>) => {
  const voucherType = String(meta?.voucherType || "").trim();
  if (voucherType) return voucherType;
  const provider = String(meta?.provider || "").trim();
  if (!provider) return "Voucher";
  return `${provider.charAt(0).toUpperCase()}${provider.slice(1)} Voucher`;
};

const buildLedgerTitle = ({
  type,
  source,
  amount,
  reason,
  meta,
}: {
  type: "earn" | "spend";
  source: WalletLedgerSource;
  amount: number;
  reason?: string;
  meta?: Record<string, unknown>;
}) => {
  if (typeof meta?.title === "string" && meta.title.trim()) {
    return meta.title.trim();
  }

  if (source === "welcome") return "Welcome Bonus";
  if (source === "quiz") return "Quiz Reward";
  if (source === "daily") return "Daily Claim";
  if (source === "streak") return "Streak Milestone";
  if (source === "ad") return "Watch Ad Reward";
  if (source === "referral") return "Referral Reward";
  if (source === "migration") return "Migration Adjustment";
  if (source === "admin") return "Manual Adjustment";

  if (source === "redeem") {
    if (type === "spend") {
      const amountRupees = Number(meta?.amount);
      const rupeeLabel =
        Number.isFinite(amountRupees) && amountRupees > 0
          ? ` ₹${Math.round(amountRupees)}`
          : "";
      return `Redeemed ${toRedeemProviderLabel(meta)}${rupeeLabel}`;
    }
    return "Redeem Refund";
  }

  if (reason) {
    return toTitleCase(reason);
  }

  return type === "earn" ? `Coins Earned +${amount}` : `Coins Spent -${amount}`;
};

const normalizeLedgerEntry = (raw: any): WalletLedgerEntry | null => {
  if (!raw || typeof raw !== "object") return null;
  const eventId = toSafeEventId(raw.eventId || raw.id);
  if (!eventId) return null;
  const type = toLedgerType(raw.type || raw.kind);
  const kind = toLedgerKind(type);
  const amount = toSafeAmount(raw.amount ?? Math.abs(Number(raw.delta) || 0), true);
  const balanceAfter = Math.max(
    0,
    Number(raw.balanceAfter) || Number(raw.balanceBefore) + (type === "earn" ? amount : -amount) || 0
  );
  const balanceBefore = Math.max(
    0,
    Number(raw.balanceBefore) || balanceAfter - (type === "earn" ? amount : -amount)
  );
  const delta = Number.isFinite(Number(raw.delta))
    ? Math.round(Number(raw.delta))
    : type === "earn"
      ? amount
      : -amount;
  const source = normalizeLedgerSource(raw.source, eventId, raw.reason);
  const meta =
    raw.meta && typeof raw.meta === "object"
      ? (raw.meta as Record<string, unknown>)
      : undefined;
  const title =
    typeof raw.title === "string" && raw.title.trim()
      ? raw.title.trim()
      : buildLedgerTitle({
          type,
          source,
          amount,
          reason: raw.reason ? String(raw.reason) : undefined,
          meta,
        });
  const status =
    typeof raw.status === "string" && raw.status.trim()
      ? raw.status.trim()
      : typeof meta?.status === "string" && String(meta.status).trim()
        ? String(meta.status).trim()
        : undefined;

  return {
    id: eventId,
    eventId,
    type,
    source,
    title,
    delta,
    status,
    kind,
    amount,
    balanceBefore,
    balanceAfter,
    reason: raw.reason ? String(raw.reason) : undefined,
    meta,
    createdAt:
      typeof raw.createdAt === "string" && raw.createdAt
        ? raw.createdAt
        : new Date().toISOString(),
  };
};

const normalizeWalletState = (raw: any): WalletState => {
  if (!raw || typeof raw !== "object") {
    return createDefaultState();
  }

  const processed = Array.isArray(raw.processedEventIds)
    ? raw.processedEventIds
        .map((item: unknown) => toSafeEventId(item))
        .filter(Boolean)
    : [];
  const dedupedProcessed = Array.from(new Set(processed));

  const history = Array.isArray(raw.history)
    ? raw.history.map(normalizeLedgerEntry).filter(Boolean)
    : [];
  const dedupedHistory = Array.from(
    new Map(
      (history as WalletLedgerEntry[]).map((entry) => [entry.eventId, entry])
    ).values()
  );

  return {
    version: WALLET_STATE_VERSION,
    balance: Math.max(0, Number(raw.balance) || 0),
    processedEventIds: trimArrayTail(
      dedupedProcessed as string[],
      MAX_PROCESSED_EVENT_IDS
    ),
    limits: {
      watchAd: normalizeWatchAdState(raw?.limits?.watchAd),
    },
    lastPromptDates:
      raw.lastPromptDates && typeof raw.lastPromptDates === "object"
        ? raw.lastPromptDates
        : {},
    history: trimArrayTail(dedupedHistory, MAX_LEDGER_ENTRIES),
  };
};

const makeLedgerEntry = ({
  eventId,
  kind,
  amount,
  balanceBefore,
  balanceAfter,
  source,
  reason,
  meta,
}: {
  eventId: string;
  kind: "add" | "spend";
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  source: string;
  reason?: string;
  meta?: Record<string, unknown>;
}): WalletLedgerEntry => {
  const type: "earn" | "spend" = kind === "spend" ? "spend" : "earn";
  const normalizedSource = normalizeLedgerSource(source, eventId, reason);
  const normalizedAmount = Math.max(0, Math.round(Number(amount) || 0));
  const createdAt = new Date().toISOString();
  const delta = type === "earn" ? normalizedAmount : -normalizedAmount;

  return {
    id: eventId,
    eventId,
    type,
    source: normalizedSource,
    title: buildLedgerTitle({
      type,
      source: normalizedSource,
      amount: normalizedAmount,
      reason,
      meta,
    }),
    delta,
    status:
      typeof meta?.status === "string" && String(meta.status).trim()
        ? String(meta.status).trim()
        : undefined,
    kind,
    amount: normalizedAmount,
    balanceBefore,
    balanceAfter,
    reason,
    meta,
    createdAt,
  };
};

const recordEventInState = (
  state: WalletState,
  params: {
    eventId: string;
    kind: "add" | "spend";
    amount: number;
    balanceBefore: number;
    balanceAfter: number;
    source: string;
    reason?: string;
    meta?: Record<string, unknown>;
  }
): {
  state: WalletState;
  entry?: WalletLedgerEntry;
  duplicate?: boolean;
} => {
  if (state.history.some((entry) => entry.eventId === params.eventId)) {
    return {
      state,
      duplicate: true,
    };
  }

  const entry = makeLedgerEntry(params);
  return {
    entry,
    state: {
      ...state,
      history: trimArrayTail([...state.history, entry], MAX_LEDGER_ENTRIES),
    },
  };
};

const patchWatchAdLimitFromEventId = (
  current: WalletWatchAdLimitState,
  source: string,
  eventId: string
) => {
  if (source !== "watch_ad") return current;
  const match = WATCH_AD_EVENT_REGEX.exec(eventId);
  if (!match) return current;

  const dateKey = match[1] || "";
  const claimIndex = Math.max(0, Number(match[2]) || 0);
  if (!dateKey || claimIndex <= 0) return current;

  if (current.dateKey !== dateKey) {
    return {
      dateKey,
      claimedCount: claimIndex,
    };
  }

  return {
    dateKey,
    claimedCount: Math.max(current.claimedCount, claimIndex),
  };
};

let inMemoryState: WalletState | null = null;
let mutationQueue: Promise<unknown> = Promise.resolve();
const walletBalanceListeners = new Set<WalletBalanceListener>();

const notifyWalletBalanceListeners = (balance: number) => {
  walletBalanceListeners.forEach((listener) => {
    try {
      listener(balance);
    } catch (_error) {
      // Listener failures must never break wallet writes.
    }
  });
};

const enqueueMutation = <T,>(task: () => Promise<T>): Promise<T> => {
  const run = mutationQueue.then(task, task);
  mutationQueue = run.then(
    () => undefined,
    () => undefined
  );
  return run;
};

const readLegacyBalance = async () => {
  try {
    const pairs = await AsyncStorage.multiGet(LEGACY_BALANCE_KEYS);
    for (const pair of pairs) {
      const value = Number(pair?.[1]);
      if (Number.isFinite(value) && value >= 0) {
        return Math.round(value);
      }
    }
  } catch (_error) {
    // Ignore legacy read failures.
  }
  return Math.max(0, Number(defaultConfig.welcomeCoins) || 0);
};

const loadWalletState = async (): Promise<WalletState> => {
  if (inMemoryState) return inMemoryState;

  try {
    const raw = await AsyncStorage.getItem(WALLET_STATE_STORAGE_KEY);
    if (raw) {
      inMemoryState = normalizeWalletState(JSON.parse(raw));
      return inMemoryState;
    }
  } catch (_error) {
    // Ignore malformed state and rebuild from fallback.
  }

  const fallbackBalance = await readLegacyBalance();
  const fallbackState = createDefaultState(fallbackBalance);
  await AsyncStorage.setItem(
    WALLET_STATE_STORAGE_KEY,
    JSON.stringify(fallbackState)
  );
  inMemoryState = fallbackState;
  return fallbackState;
};

const persistWalletState = async (state: WalletState) => {
  const normalized = normalizeWalletState(state);

  if (__DEV__) {
    if (normalized.balance < 0) {
      throw new Error(
        `[walletStore] Invalid negative balance detected: ${normalized.balance}`
      );
    }
    const uniqueCount = new Set(normalized.processedEventIds).size;
    if (uniqueCount !== normalized.processedEventIds.length) {
      throw new Error("[walletStore] Duplicate processed event IDs detected.");
    }
  }

  await AsyncStorage.setItem(
    WALLET_STATE_STORAGE_KEY,
    JSON.stringify(normalized)
  );
  inMemoryState = normalized;
  notifyWalletBalanceListeners(normalized.balance);
};

export function subscribeWalletBalance(
  listener: WalletBalanceListener
): () => void {
  walletBalanceListeners.add(listener);
  return () => {
    walletBalanceListeners.delete(listener);
  };
}

export async function getBalance(): Promise<number> {
  const state = await loadWalletState();
  return state.balance;
}

export async function canSpend(amount: number): Promise<boolean> {
  const safeAmount = toSafeAmount(amount);
  if (safeAmount <= 0) return true;
  const balance = await getBalance();
  return balance >= safeAmount;
}

export async function addCoins(params: AddCoinsParams): Promise<MutationResult> {
  return enqueueMutation(async () => {
    const state = await loadWalletState();
    const eventId = toSafeEventId(params.eventId);
    const amount = toSafeAmount(params.amount, true);
    if (!eventId) {
      throw new Error("[walletStore] addCoins requires a valid eventId.");
    }

    if (state.processedEventIds.includes(eventId)) {
      if (__DEV__) {
        console.log(
          `[coin-audit] duplicate-add ignored eventId=${eventId} source=${params.source}`
        );
      }
      return {
        ok: true,
        applied: false,
        duplicate: true,
        balance: state.balance,
      };
    }

    const balanceBefore = state.balance;
    const balanceAfter = balanceBefore + amount;
    const { state: stateWithLedger, entry: nextEntry } = recordEventInState(
      state,
      {
        eventId,
        kind: "add",
        amount,
        balanceBefore,
        balanceAfter,
        source: String(params.source || "legacy"),
        meta: params.meta,
      }
    );

    const nextState: WalletState = {
      ...stateWithLedger,
      balance: balanceAfter,
      processedEventIds: trimArrayTail(
        [...state.processedEventIds, eventId],
        MAX_PROCESSED_EVENT_IDS
      ),
      limits: {
        ...state.limits,
        watchAd: patchWatchAdLimitFromEventId(
          state.limits.watchAd,
          String(params.source || ""),
          eventId
        ),
      },
    };

    await persistWalletState(nextState);

    if (__DEV__) {
      console.log(
        `[coin-audit] add amount=${amount} balance=${balanceBefore}->${balanceAfter} source=${params.source} eventId=${eventId}`
      );
    }

    return {
      ok: true,
      applied: true,
      balance: balanceAfter,
      entry: nextEntry,
    };
  });
}

export async function spendCoins(
  params: SpendCoinsParams
): Promise<MutationResult> {
  return enqueueMutation(async () => {
    const state = await loadWalletState();
    const eventId = toSafeEventId(params.eventId);
    const amount = toSafeAmount(params.amount);
    if (!eventId) {
      throw new Error("[walletStore] spendCoins requires a valid eventId.");
    }
    if (amount <= 0) {
      throw new Error("[walletStore] spendCoins requires amount > 0.");
    }

    if (state.processedEventIds.includes(eventId)) {
      if (__DEV__) {
        console.log(
          `[coin-audit] duplicate-spend ignored eventId=${eventId} reason=${params.reason}`
        );
      }
      return {
        ok: true,
        applied: false,
        duplicate: true,
        balance: state.balance,
      };
    }

    if (state.balance < amount) {
      if (__DEV__) {
        console.log(
          `[coin-audit] spend-blocked insufficient amount=${amount} balance=${state.balance} eventId=${eventId} reason=${params.reason}`
        );
      }
      return {
        ok: false,
        applied: false,
        reason: "insufficient",
        balance: state.balance,
      };
    }

    const balanceBefore = state.balance;
    const balanceAfter = balanceBefore - amount;
    const { state: stateWithLedger, entry: nextEntry } = recordEventInState(
      state,
      {
        eventId,
        kind: "spend",
        amount,
        balanceBefore,
        balanceAfter,
        source: String(params.source || params.reason || "spend"),
        reason: params.reason,
        meta: params.meta,
      }
    );

    const nextState: WalletState = {
      ...stateWithLedger,
      balance: balanceAfter,
      processedEventIds: trimArrayTail(
        [...state.processedEventIds, eventId],
        MAX_PROCESSED_EVENT_IDS
      ),
    };

    await persistWalletState(nextState);

    if (__DEV__) {
      console.log(
        `[coin-audit] spend amount=${amount} balance=${balanceBefore}->${balanceAfter} reason=${params.reason} eventId=${eventId}`
      );
    }

    return {
      ok: true,
      applied: true,
      balance: balanceAfter,
      entry: nextEntry,
    };
  });
}

export async function recordEvent(
  params: RecordEventParams
): Promise<{ ok: boolean; applied: boolean; duplicate?: boolean }> {
  return enqueueMutation(async () => {
    const state = await loadWalletState();
    const eventId = toSafeEventId(params?.eventId);
    if (!eventId) {
      throw new Error("[walletStore] recordEvent requires a valid eventId.");
    }

    const alreadyLogged = state.history.some((entry) => entry.eventId === eventId);
    if (alreadyLogged) {
      return { ok: true, applied: false, duplicate: true };
    }

    const type = params.type === "spend" ? "spend" : "earn";
    const amount = toSafeAmount(Math.abs(Number(params.delta) || 0), true);
    const balanceBefore = state.balance;
    const balanceAfter = Number.isFinite(Number(params.balanceAfter))
      ? Math.max(0, Number(params.balanceAfter))
      : balanceBefore;

    const { state: nextState } = recordEventInState(state, {
      eventId,
      kind: type === "spend" ? "spend" : "add",
      amount,
      balanceBefore,
      balanceAfter,
      source: String(params.source || "admin"),
      reason: params.title,
      meta: {
        ...(params.meta || {}),
        ...(params.title ? { title: params.title } : {}),
        ...(params.status ? { status: params.status } : {}),
      },
    });

    await persistWalletState(nextState);
    return { ok: true, applied: true };
  });
}

export async function getLedger(): Promise<WalletLedgerSnapshot> {
  const state = await loadWalletState();
  return {
    balance: state.balance,
    processedEventIds: [...state.processedEventIds],
    limits: {
      watchAd: {
        ...state.limits.watchAd,
      },
    },
    history: [...state.history].sort(
      (left, right) =>
        new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
    ),
  };
}
