import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import { getPremiumSettings } from '../services/premiumSettings';

export default function useReducedMotionPreference() {
  const [reducedMotionEnabled, setReducedMotionEnabled] = useState(false);
  const [overrideMode, setOverrideMode] = useState('system');

  useEffect(() => {
    let mounted = true;

    getPremiumSettings()
      .then((settings) => {
        if (mounted) {
          setOverrideMode(settings.reduceMotionOverride || 'system');
        }
      })
      .catch(() => {});

    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (mounted) {
          setReducedMotionEnabled(Boolean(enabled));
        }
      })
      .catch(() => {});

    const listener = AccessibilityInfo.addEventListener('reduceMotionChanged', (enabled) => {
      setReducedMotionEnabled(Boolean(enabled));
    });

    return () => {
      mounted = false;
      listener?.remove?.();
    };
  }, []);

  if (overrideMode === 'on') return true;
  if (overrideMode === 'off') return false;
  return reducedMotionEnabled;
}
