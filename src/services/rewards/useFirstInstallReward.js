import { useEffect, useState } from "react";
import { localStore } from "../storage/localStore";
import {
  completeWelcomeRewardFlow,
  getPendingWelcomeRewardPayload,
  migrateRewardSchemaV1,
} from "./firstInstallRewardService";
import { defaultConfig, getConfig } from "../../config/remoteConfig";

const getDefaultPayload = (config = defaultConfig) => {
  const baseWelcomeCoins = Math.max(
    0,
    Number(config?.welcomeCoins ?? defaultConfig.welcomeCoins)
  );
  return {
    baseWelcomeCoins,
    referralBonusCoins: 0,
    totalWelcomeCoins: baseWelcomeCoins,
  };
};

export function useFirstInstallReward() {
  const [isReady, setIsReady] = useState(false);
  const [shouldShowWelcomeReward, setShouldShowWelcomeReward] = useState(false);
  const [welcomeRewardPayload, setWelcomeRewardPayload] = useState(
    getDefaultPayload()
  );

  useEffect(() => {
    let isMounted = true;

    const hydrate = async () => {
      const config = await getConfig();
      await migrateRewardSchemaV1();
      const seenWelcome = await localStore.getBool(
        localStore.keys.seenWelcome,
        false
      );
      const firstInstallBonusClaimed = await localStore.getBool(
        localStore.keys.firstInstallBonusClaimed,
        seenWelcome
      );
      const pendingWelcome = await localStore.getBool(
        localStore.keys.pendingWelcome,
        false
      );
      const payload = pendingWelcome
        ? await getPendingWelcomeRewardPayload()
        : getDefaultPayload(config);

      if (!isMounted) return;

      setWelcomeRewardPayload(payload);
      setShouldShowWelcomeReward(!firstInstallBonusClaimed || pendingWelcome);
      setIsReady(true);
    };

    hydrate().catch((error) => {
      console.error("Error hydrating first install reward:", error);
      if (isMounted) {
        setIsReady(true);
        setShouldShowWelcomeReward(false);
        setWelcomeRewardPayload(getDefaultPayload());
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const completeWelcomeReward = async (totalWelcomeCoins) => {
    await completeWelcomeRewardFlow({ totalWelcomeCoins });
    setShouldShowWelcomeReward(false);
  };

  return {
    isReady,
    shouldShowWelcomeReward,
    welcomeRewardPayload,
    completeWelcomeReward,
  };
}
