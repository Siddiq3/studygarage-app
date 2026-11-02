import AsyncStorage from "@react-native-async-storage/async-storage";

const HISTORY_STORAGE_KEY = "withdrawalHistory";
// Redeem requests only ever go through the server. Never give the app a repo token.
const DEFAULT_REDEEM_API_URL = process.env.EXPO_PUBLIC_REDEEM_API_URL || "";

export const buildRedeemRequestId = () => {
  const nonce = Math.random().toString(36).slice(2, 8);
  return `${Date.now()}-${nonce}`;
};

export const createRedeemRequestPayload = ({
  id,
  name,
  email,
  phone,
  upiId,
  voucherType,
  provider,
  amount,
  coinsUsed,
}) => ({
  id,
  name,
  email,
  phone,
  voucherType,
  provider,
  amount,
  coinsUsed,
  ...(upiId ? { upiId } : {}),
  status: "pending",
  createdAt: new Date().toISOString(),
});

export const submitRedeemRequestToGitHub = async (redeemObject) => {
  if (!DEFAULT_REDEEM_API_URL) {
    throw new Error("Redeem service is not configured.");
  }

  const apiResponse = await fetch(DEFAULT_REDEEM_API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(redeemObject),
  });

  if (!apiResponse.ok) {
    const errorText = await apiResponse.text();
    throw new Error(errorText || "Failed to submit redeem request.");
  }

  const payload = await apiResponse.json().catch(() => ({}));
  if (payload?.ok === false) {
    throw new Error(payload?.message || "Failed to submit redeem request.");
  }
  return payload;
};

const parseHistory = (raw) => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_error) {
    return [];
  }
};

export const appendRedeemHistoryEntry = async ({
  id,
  provider,
  voucherType,
  amount,
  coinsUsed,
  createdAt,
  status = "pending",
}) => {
  const existingRaw = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
  const existingHistory = parseHistory(existingRaw);

  const nextEntry = {
    type: "voucher",
    id,
    provider,
    title: `${voucherType} Voucher`,
    amount,
    coinCost: coinsUsed,
    code: "PENDING",
    status: String(status || "pending").toLowerCase(),
    date: createdAt,
  };

  const nextHistory = [...existingHistory, nextEntry];
  await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(nextHistory));

  return nextEntry;
};
