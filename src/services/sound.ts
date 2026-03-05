import SoundService, { type AppSoundName } from "./sound/SoundService";
import { getPremiumSettings } from "./premiumSettings";

type SoundAction = "tap" | "success" | "sessionStart" | "sessionEnd";

type SoundRegistry = Partial<Record<SoundAction, () => Promise<void> | void>>;
type ActionToSoundMap = Record<SoundAction, AppSoundName>;

let registry: SoundRegistry = {};
let lastPlayAt = 0;
const MIN_GAP_MS = 90;
const SOUND_EFFECTS_DISABLED = true;
const ACTION_SOUND_MAP: ActionToSoundMap = {
  tap: "tap_soft",
  success: "coin_land",
  sessionStart: "reward_reveal",
  sessionEnd: "coin_land",
};

export function registerSoundHandlers(handlers: SoundRegistry) {
  registry = { ...registry, ...handlers };
}

export const sound = {
  async play(action: SoundAction) {
    if (SOUND_EFFECTS_DISABLED) {
      return;
    }

    const settings = await getPremiumSettings();
    if (!settings.soundsEnabled) {
      await SoundService.setEnabled(false);
      return;
    }
    await SoundService.setEnabled(true);

    const now = Date.now();
    if (now - lastPlayAt < MIN_GAP_MS) return;
    lastPlayAt = now;

    const handler = registry[action];
    if (handler) {
      try {
        await handler();
      } catch (_error) {
        // fail silently; sound is enhancement only
      }
      return;
    }

    try {
      await SoundService.play(ACTION_SOUND_MAP[action]);
    } catch (_error) {
      // fail silently; sound is enhancement only
    }
  },
};

export type { SoundAction };
