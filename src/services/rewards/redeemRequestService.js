import AsyncStorage from "@react-native-async-storage/async-storage";

const HISTORY_STORAGE_KEY = "withdrawalHistory";
const DEFAULT_GITHUB_OWNER = "Siddiq3";
const DEFAULT_GITHUB_REPO = "QuizData";
const DEFAULT_GITHUB_BRANCH = "main";
const DEFAULT_REDEEM_API_URL =
  process.env.EXPO_PUBLIC_REDEEM_API_URL || process.env.REDEEM_API_URL || "";

const BASE64_TABLE =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

const toBase64 = (value) => {
  const safeValue = String(value ?? "");
  try {
    if (typeof globalThis.btoa === "function") {
      return globalThis.btoa(unescape(encodeURIComponent(safeValue)));
    }
  } catch (_error) {
    // Ignore and fall back to manual encoding below.
  }

  const bytes =
    typeof TextEncoder !== "undefined"
      ? new TextEncoder().encode(safeValue)
      : Uint8Array.from(safeValue.split("").map((char) => char.charCodeAt(0)));

  let output = "";
  for (let index = 0; index < bytes.length; index += 3) {
    const byte1 = bytes[index];
    const byte2 = index + 1 < bytes.length ? bytes[index + 1] : 0;
    const byte3 = index + 2 < bytes.length ? bytes[index + 2] : 0;

    const chunk = (byte1 << 16) | (byte2 << 8) | byte3;

    output += BASE64_TABLE[(chunk >> 18) & 63];
    output += BASE64_TABLE[(chunk >> 12) & 63];
    output += index + 1 < bytes.length ? BASE64_TABLE[(chunk >> 6) & 63] : "=";
    output += index + 2 < bytes.length ? BASE64_TABLE[chunk & 63] : "=";
  }

  return output;
};

const getGitHubConfig = () => {
  const token =
    process.env.EXPO_PUBLIC_GITHUB_TOKEN ||
    process.env.GITHUB_TOKEN ||
    "";
  const owner =
    process.env.EXPO_PUBLIC_GITHUB_USERNAME ||
    process.env.GITHUB_USERNAME ||
    DEFAULT_GITHUB_OWNER;
  const repo =
    process.env.EXPO_PUBLIC_GITHUB_REPO ||
    process.env.GITHUB_REPO ||
    DEFAULT_GITHUB_REPO;
  const branch =
    process.env.EXPO_PUBLIC_GITHUB_BRANCH ||
    process.env.GITHUB_BRANCH ||
    DEFAULT_GITHUB_BRANCH;

  if (!token) {
    throw new Error(
      "Missing GitHub token. Set EXPO_PUBLIC_GITHUB_TOKEN in .env and restart Expo."
    );
  }

  return { token, owner, repo, branch };
};

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
  if (DEFAULT_REDEEM_API_URL) {
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
  }

  const { token, owner, repo, branch } = getGitHubConfig();
  const requestId = redeemObject?.id;
  if (!requestId) {
    throw new Error("Redeem request id is required.");
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/redeemRequests/${requestId}.json`;
  const content = toBase64(JSON.stringify(redeemObject, null, 2));

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "New redeem request",
      content,
      branch,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to submit redeem request.");
  }

  return response.json();
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
