import { useCallback, useEffect, useState } from "react";
import {
  defaultConfig,
  getConfig,
  refreshConfigInBackground,
  type AppRemoteConfig,
} from "../config/remoteConfig";

export default function useRemoteConfig() {
  const [config, setConfig] = useState<AppRemoteConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const nextConfig = await refreshConfigInBackground({ force: true });
    setConfig(nextConfig);
    return nextConfig;
  }, []);

  useEffect(() => {
    let mounted = true;

    const hydrate = async () => {
      try {
        const cachedOrDefault = await getConfig();
        if (!mounted) return;
        setConfig(cachedOrDefault);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }

      refreshConfigInBackground()
        .then((nextConfig) => {
          if (mounted) {
            setConfig(nextConfig);
          }
        })
        .catch(() => {
          // silent fallback
        });
    };

    hydrate().catch(() => {
      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return {
    config,
    loading,
    refresh,
  };
}
