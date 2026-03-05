import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getPremiumSettings,
  type PremiumSettings,
  premiumSettingsDefaults,
  updatePremiumSettings,
} from '../services/premiumSettings';

export default function usePremiumSettings() {
  const [settings, setSettings] = useState<PremiumSettings>(premiumSettingsDefaults);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    getPremiumSettings()
      .then((value) => {
        if (mounted) {
          setSettings(value);
          setIsReady(true);
        }
      })
      .catch(() => {
        if (mounted) {
          setIsReady(true);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const update = useCallback(async (patch: Partial<PremiumSettings>) => {
    const next = await updatePremiumSettings(patch);
    setSettings(next);
    return next;
  }, []);

  const actions = useMemo(
    () => ({
      setSoundsEnabled: (value: boolean) => update({ soundsEnabled: value }),
      setHapticsEnabled: (value: boolean) => update({ hapticsEnabled: value }),
      setReduceMotionOverride: (value: PremiumSettings['reduceMotionOverride']) =>
        update({ reduceMotionOverride: value }),
      setDemoMode: (value: boolean) => update({ demoMode: value }),
    }),
    [update]
  );

  return {
    isReady,
    settings,
    update,
    ...actions,
  };
}
