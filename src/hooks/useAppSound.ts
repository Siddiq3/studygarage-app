import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SoundService, {
  APP_SOUND_ENABLED_KEY,
  type AppSoundName,
} from "../services/sound/SoundService";

export default function useAppSound() {
  const [enabled, setEnabledState] = useState(true);

  useEffect(() => {
    let mounted = true;

    const hydrate = async () => {
      try {
        const raw = await AsyncStorage.getItem(APP_SOUND_ENABLED_KEY);
        const nextEnabled = raw == null ? true : raw === "1" || raw === "true";
        if (mounted) {
          setEnabledState(nextEnabled);
        }
        await SoundService.setEnabled(nextEnabled);
      } catch (_error) {
        if (mounted) {
          setEnabledState(true);
        }
        await SoundService.setEnabled(true);
      }
      // Sound effects are temporarily disabled.
      // SoundService.preload().catch(() => {});
    };

    hydrate().catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  const setEnabled = useCallback(async (value: boolean) => {
    setEnabledState(Boolean(value));
    await SoundService.setEnabled(Boolean(value));
  }, []);

  const playSound = useCallback(async (name: AppSoundName) => {
    return SoundService.play(name);
  }, []);

  return {
    enabled,
    setEnabled,
    playSound,
  };
}
