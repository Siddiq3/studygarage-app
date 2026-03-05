import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_SOUND_ENABLED_KEY } from './sound/SoundService';

const STORAGE_KEY = 'sg_premium_settings_v1';

export type PremiumSettings = {
  soundsEnabled: boolean;
  hapticsEnabled: boolean;
  reduceMotionOverride: 'system' | 'on' | 'off';
  demoMode: boolean;
};

const DEFAULT_SETTINGS: PremiumSettings = {
  soundsEnabled: true,
  hapticsEnabled: true,
  reduceMotionOverride: 'system',
  demoMode: false,
};

let memoryCache: PremiumSettings | null = null;

function sanitize(value: any): PremiumSettings {
  return {
    soundsEnabled:
      typeof value?.soundsEnabled === 'boolean'
        ? value.soundsEnabled
        : DEFAULT_SETTINGS.soundsEnabled,
    hapticsEnabled:
      typeof value?.hapticsEnabled === 'boolean'
        ? value.hapticsEnabled
        : DEFAULT_SETTINGS.hapticsEnabled,
    reduceMotionOverride:
      value?.reduceMotionOverride === 'on' ||
      value?.reduceMotionOverride === 'off' ||
      value?.reduceMotionOverride === 'system'
        ? value.reduceMotionOverride
        : DEFAULT_SETTINGS.reduceMotionOverride,
    demoMode:
      typeof value?.demoMode === 'boolean'
        ? value.demoMode
        : DEFAULT_SETTINGS.demoMode,
  };
}

export async function getPremiumSettings(): Promise<PremiumSettings> {
  if (memoryCache) return memoryCache;

  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      memoryCache = DEFAULT_SETTINGS;
      return DEFAULT_SETTINGS;
    }
    const parsed = JSON.parse(raw);
    memoryCache = sanitize(parsed);
    return memoryCache;
  } catch (_error) {
    memoryCache = DEFAULT_SETTINGS;
    return DEFAULT_SETTINGS;
  }
}

export async function updatePremiumSettings(
  patch: Partial<PremiumSettings>
): Promise<PremiumSettings> {
  const current = await getPremiumSettings();
  const next = sanitize({ ...current, ...patch });
  memoryCache = next;
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    if (typeof patch.soundsEnabled === 'boolean') {
      await AsyncStorage.setItem(
        APP_SOUND_ENABLED_KEY,
        patch.soundsEnabled ? '1' : '0'
      );
    }
  } catch (_error) {
    // keep in-memory value to avoid blocking UX
  }
  return next;
}

export function subscribePremiumSettings(
  callback: (next: PremiumSettings) => void
) {
  let alive = true;

  getPremiumSettings().then((next) => {
    if (alive) callback(next);
  });

  return () => {
    alive = false;
  };
}

export const premiumSettingsDefaults = DEFAULT_SETTINGS;
