import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeModules } from "react-native";

export const APP_SOUND_ENABLED_KEY = "sg_sound_enabled";
const SOUND_THROTTLE_MS = 150;
// Sound effects are temporarily disabled by product decision.
const SOUND_EFFECTS_DISABLED = true;

export type AppSoundName =
  | "reward_reveal"
  | "coin_land"
  | "welcome_reward"
  | "daily_claim"
  | "streak_reward"
  | "tap_soft";

type SoundInstance = {
  setVolume?: (value: number) => void;
  setCurrentTime?: (value: number) => void;
  isLoaded?: () => boolean;
  stop?: (onStop?: () => void) => void;
  play?: (onEnd?: (success: boolean) => void) => void;
  release?: () => void;
};

type SoundConstructor = {
  MAIN_BUNDLE?: string;
  setCategory?: (category: string) => void;
  new (
    filename: string,
    basePath: string | undefined,
    callback: (error?: unknown) => void
  ): SoundInstance;
};

const SOUND_BASE_NAME: Record<AppSoundName, string> = {
  reward_reveal: "reward_reveal_premium",
  coin_land: "coin_land_premium",
  welcome_reward: "welcome_reward_premium",
  daily_claim: "daily_claim_premium",
  streak_reward: "streak_reward_premium",
  tap_soft: "tap_soft_premium",
};

const SOUND_VOLUME: Record<AppSoundName, number> = {
  reward_reveal: 0.62,
  coin_land: 0.72,
  welcome_reward: 0.62,
  daily_claim: 0.68,
  streak_reward: 0.66,
  tap_soft: 0.44,
};

const soundCache = new Map<AppSoundName, SoundInstance | null>();
const loadingCache = new Map<AppSoundName, Promise<SoundInstance | null>>();
const playTsByName = new Map<AppSoundName, number>();

let engine: SoundConstructor | null = null;
let engineResolved = false;
let enabled = true;
let enabledHydrated = false;

function getSoundEngine(): SoundConstructor | null {
  if (SOUND_EFFECTS_DISABLED) {
    engine = null;
    engineResolved = true;
    return null;
  }

  if (engineResolved) return engine;
  engineResolved = true;

  try {
    const hasLegacyModule = Boolean(NativeModules?.RNSound);
    const hasTurbo = typeof global.__turboModuleProxy === "function";
    if (!hasLegacyModule && !hasTurbo) {
      engine = null;
      return engine;
    }

    const loaded = require("react-native-sound");
    const resolved = (loaded?.default || loaded) as SoundConstructor | null;
    if (!resolved) {
      engine = null;
      return engine;
    }

    if (typeof resolved.setCategory === "function") {
      try {
        resolved.setCategory("Playback");
      } catch (_error) {
        // no-op
      }
    }

    engine = resolved;
  } catch (_error) {
    engine = null;
  }

  return engine;
}

function loadOne(name: AppSoundName): Promise<SoundInstance | null> {
  if (loadingCache.has(name)) {
    return loadingCache.get(name)!;
  }

  const promise = new Promise<SoundInstance | null>((resolve) => {
    const Sound = getSoundEngine();
    if (!Sound) {
      soundCache.set(name, null);
      resolve(null);
      return;
    }

    if (soundCache.has(name)) {
      resolve(soundCache.get(name) ?? null);
      return;
    }

    try {
      const baseName = SOUND_BASE_NAME[name];
      const instance = new Sound(
        baseName,
        Sound.MAIN_BUNDLE,
        (error?: unknown) => {
          if (error) {
            soundCache.set(name, null);
            resolve(null);
            return;
          }
          soundCache.set(name, instance);
          resolve(instance);
        }
      );
    } catch (_error) {
      soundCache.set(name, null);
      resolve(null);
    }
  }).finally(() => {
    loadingCache.delete(name);
  });

  loadingCache.set(name, promise);
  return promise;
}

async function hydrateEnabledFromStorage() {
  if (enabledHydrated) return enabled;
  enabledHydrated = true;
  try {
    const raw = await AsyncStorage.getItem(APP_SOUND_ENABLED_KEY);
    if (raw == null) {
      enabled = true;
      return enabled;
    }
    enabled = raw === "1" || raw === "true";
  } catch (_error) {
    enabled = true;
  }
  return enabled;
}

const SoundService = {
  async preload(names?: AppSoundName[]) {
    if (SOUND_EFFECTS_DISABLED) {
      return;
    }

    await hydrateEnabledFromStorage();
    const targets = names && names.length > 0 ? names : (Object.keys(
      SOUND_BASE_NAME
    ) as AppSoundName[]);
    await Promise.all(targets.map((name) => loadOne(name)));
  },

  async setEnabled(value: boolean) {
    if (SOUND_EFFECTS_DISABLED) {
      enabled = false;
      enabledHydrated = true;
      try {
        await AsyncStorage.setItem(APP_SOUND_ENABLED_KEY, "0");
      } catch (_error) {
        // no-op
      }
      return;
    }

    enabled = Boolean(value);
    enabledHydrated = true;
    try {
      await AsyncStorage.setItem(APP_SOUND_ENABLED_KEY, enabled ? "1" : "0");
    } catch (_error) {
      // no-op
    }
  },

  async isEnabled() {
    if (SOUND_EFFECTS_DISABLED) {
      return false;
    }

    await hydrateEnabledFromStorage();
    return enabled;
  },

  async play(name: AppSoundName) {
    if (SOUND_EFFECTS_DISABLED) {
      return false;
    }

    await hydrateEnabledFromStorage();
    if (!enabled) return false;

    const now = Date.now();
    const lastPlay = playTsByName.get(name) ?? 0;
    if (now - lastPlay < SOUND_THROTTLE_MS) {
      return false;
    }
    playTsByName.set(name, now);

    const sound = await loadOne(name);
    if (!sound) return false;

    try {
      if (typeof sound.isLoaded === "function" && !sound.isLoaded()) {
        return false;
      }

      sound.setVolume?.(SOUND_VOLUME[name] ?? 0.6);
      // NOTE: calling stop() has caused native crashes on some Android builds
      // (Sound.kt stop path). Resetting current time is safer for short SFX.
      sound.setCurrentTime?.(0);
      sound.play?.(() => {});
      return true;
    } catch (_error) {
      return false;
    }
  },

  async selfTest() {
    if (SOUND_EFFECTS_DISABLED) {
      return {
        engineReady: false,
        enabled: false,
        loaded: Object.keys(SOUND_BASE_NAME).reduce(
          (acc, soundName) => ({ ...acc, [soundName]: false }),
          {} as Record<string, boolean>
        ),
      };
    }

    const status = {
      engineReady: Boolean(getSoundEngine()),
      enabled: await this.isEnabled(),
      loaded: {} as Record<string, boolean>,
    };

    const names = Object.keys(SOUND_BASE_NAME) as AppSoundName[];
    for (const name of names) {
      const instance = await loadOne(name);
      status.loaded[name] = Boolean(instance);
    }

    if (__DEV__) {
      console.log("[SoundService.selfTest]", status);
    }

    await this.play("tap_soft");
    return status;
  },

  releaseAll() {
    soundCache.forEach((instance) => {
      try {
        instance?.release?.();
      } catch (_error) {
        // no-op
      }
    });
    soundCache.clear();
    loadingCache.clear();
    playTsByName.clear();
  },
};

export default SoundService;
