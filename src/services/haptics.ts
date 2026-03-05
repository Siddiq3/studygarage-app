import * as Haptics from 'expo-haptics';
import { getPremiumSettings } from './premiumSettings';

type HapticAction = 'tap' | 'selection' | 'success' | 'warning' | 'error' | 'longPress';

const actionMap: Record<HapticAction, () => Promise<void>> = {
  tap: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  selection: () => Haptics.selectionAsync(),
  success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  warning: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  error: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
  longPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
};

let lastImpactAt = 0;
const MIN_GAP_MS = 50;

async function canTrigger() {
  const settings = await getPremiumSettings();
  return settings.hapticsEnabled;
}

export const haptics = {
  async trigger(action: HapticAction = 'tap') {
    const now = Date.now();
    if (now - lastImpactAt < MIN_GAP_MS) {
      return;
    }

    const allowed = await canTrigger();
    if (!allowed) {
      return;
    }

    lastImpactAt = now;
    try {
      await (actionMap[action] || actionMap.tap)();
    } catch (_error) {
      // haptics not supported for this device/platform
    }
  },
};

export type { HapticAction };
