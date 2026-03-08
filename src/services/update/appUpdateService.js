import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Application from 'expo-application';

const ENV_UPDATE_CONFIG_URL =
  typeof process?.env?.EXPO_PUBLIC_APP_UPDATE_CONFIG_URL === 'string'
    ? process.env.EXPO_PUBLIC_APP_UPDATE_CONFIG_URL.trim()
    : '';
const PRIMARY_UPDATE_CONFIG_URL =
  ENV_UPDATE_CONFIG_URL ||
  'https://raw.githubusercontent.com/Siddiq3/Api/main/app-update.json';
const FALLBACK_UPDATE_CONFIG_URL =
  'https://cdn.jsdelivr.net/gh/Siddiq3/QuizData@main/app-update.json';
const LAST_OPTIONAL_DISMISS_KEY = 'sg_update_optional_last_dismissed_at';
const DEFAULT_OPTIONAL_COOLDOWN_HOURS = 12;

const toSafeString = (value, fallback = '') =>
  typeof value === 'string' && value.trim() ? value.trim() : fallback;

const toNumber = (value, fallback = 0) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};

const getVersionParts = (version) =>
  String(version || '0')
    .split('.')
    .map((part) => {
      const num = Number(part.replace(/[^0-9]/g, ''));
      return Number.isFinite(num) ? num : 0;
    });

export const compareVersions = (left, right) => {
  const a = getVersionParts(left);
  const b = getVersionParts(right);
  const len = Math.max(a.length, b.length);

  for (let i = 0; i < len; i += 1) {
    const av = a[i] || 0;
    const bv = b[i] || 0;
    if (av > bv) return 1;
    if (av < bv) return -1;
  }

  return 0;
};

const getCurrentAppVersion = () =>
  toSafeString(
    Constants?.expoConfig?.version ||
      Constants?.manifest2?.extra?.expoClient?.version ||
      Application.nativeApplicationVersion ||
      '0.0.0',
    '0.0.0'
  );

const getCurrentBuildNumber = () =>
  toNumber(
    Application.nativeBuildVersion || Constants?.expoConfig?.android?.versionCode,
    0
  );

const getDefaultStoreUrl = () => {
  const packageId = toSafeString(Application.applicationId, '');

  if (Platform.OS === 'android') {
    return packageId
      ? `market://details?id=${packageId}`
      : 'https://play.google.com/store';
  }

  return 'https://apps.apple.com/';
};

const normalizeConfig = (raw = {}) => {
  const latestVersion = toSafeString(raw.latestVersion, '');
  const minRequiredVersion = toSafeString(raw.minRequiredVersion, latestVersion);
  const latestBuildNumber = toNumber(raw.latestBuildNumber, 0);
  const minRequiredBuildNumber = toNumber(raw.minRequiredBuildNumber, latestBuildNumber);
  const optionalCooldownHours = Math.max(
    1,
    toNumber(raw.optionalCooldownHours, DEFAULT_OPTIONAL_COOLDOWN_HOURS)
  );

  return {
    latestVersion,
    minRequiredVersion,
    latestBuildNumber,
    minRequiredBuildNumber,
    title: toSafeString(raw.title, 'Update available'),
    message: toSafeString(
      raw.message,
      'A newer version of StudyGarage is available. Update now for latest improvements.'
    ),
    updateNowLabel: toSafeString(raw.updateNowLabel, 'Update now'),
    laterLabel: toSafeString(raw.laterLabel, 'Later'),
    forceUpdate: Boolean(raw.forceUpdate),
    optionalCooldownHours,
    androidStoreUrl: toSafeString(raw.androidStoreUrl, ''),
    iosStoreUrl: toSafeString(raw.iosStoreUrl, ''),
  };
};

const getStoreUrlForPlatform = (config) => {
  if (Platform.OS === 'android' && config.androidStoreUrl) return config.androidStoreUrl;
  if (Platform.OS === 'ios' && config.iosStoreUrl) return config.iosStoreUrl;
  return getDefaultStoreUrl();
};

const isOptionalDismissCooldownActive = async (cooldownHours) => {
  const raw = await AsyncStorage.getItem(LAST_OPTIONAL_DISMISS_KEY);
  const lastDismissedAt = toNumber(raw, 0);
  if (!lastDismissedAt) return false;

  const cooldownMs = cooldownHours * 60 * 60 * 1000;
  return Date.now() - lastDismissedAt < cooldownMs;
};

export const markOptionalUpdateDismissed = async () => {
  await AsyncStorage.setItem(LAST_OPTIONAL_DISMISS_KEY, String(Date.now()));
};

export const clearOptionalUpdateDismissed = async () => {
  await AsyncStorage.removeItem(LAST_OPTIONAL_DISMISS_KEY);
};

const fetchUpdateConfig = async () => {
  // Minute-level cache-buster to reduce stale CDN/browser cache while avoiding noisy URLs.
  const cacheBuster = Math.floor(Date.now() / 60000);
  const urlsToTry = [PRIMARY_UPDATE_CONFIG_URL, FALLBACK_UPDATE_CONFIG_URL].filter(Boolean);
  let lastError = null;

  for (const url of urlsToTry) {
    try {
      const separator = url.includes('?') ? '&' : '?';
      const response = await fetch(`${url}${separator}t=${cacheBuster}`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });
      if (!response.ok) {
        throw new Error(`Update config request failed with status ${response.status}`);
      }
      return response.json();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('Unable to fetch update config');
};

export const checkForAppUpdate = async () => {
  const rawConfig = await fetchUpdateConfig();
  const config = normalizeConfig(rawConfig);

  if (!config.latestVersion) {
    return { shouldShow: false, reason: 'missing_latest_version' };
  }

  const currentVersion = getCurrentAppVersion();
  const currentBuildNumber = getCurrentBuildNumber();

  const versionBehindLatest = compareVersions(currentVersion, config.latestVersion) < 0;
  const versionBelowMin =
    config.minRequiredVersion && compareVersions(currentVersion, config.minRequiredVersion) < 0;

  const buildBehindLatest =
    config.latestBuildNumber > 0 && currentBuildNumber > 0
      ? currentBuildNumber < config.latestBuildNumber
      : false;
  const buildBelowMin =
    config.minRequiredBuildNumber > 0 && currentBuildNumber > 0
      ? currentBuildNumber < config.minRequiredBuildNumber
      : false;

  const hasUpdate =
    versionBehindLatest || versionBelowMin || buildBehindLatest || buildBelowMin;
  if (!hasUpdate) {
    return { shouldShow: false, reason: 'up_to_date' };
  }

  const forceUpdate = Boolean(config.forceUpdate || versionBelowMin || buildBelowMin);

  if (!forceUpdate) {
    const cooldownActive = await isOptionalDismissCooldownActive(
      config.optionalCooldownHours
    );
    if (cooldownActive) {
      return { shouldShow: false, reason: 'optional_cooldown_active' };
    }
  }

  return {
    shouldShow: true,
    forceUpdate,
    currentVersion,
    latestVersion: config.latestVersion,
    title: config.title,
    message: config.message,
    updateNowLabel: config.updateNowLabel,
    laterLabel: config.laterLabel,
    storeUrl: getStoreUrlForPlatform(config),
    optionalCooldownHours: config.optionalCooldownHours,
  };
};
