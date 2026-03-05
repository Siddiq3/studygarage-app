import { useCallback, useEffect, useMemo, useState } from "react";
import { Share } from "react-native";
import { useQuizContext } from "../../QuizContext";
import {
  applyReferralCodeOnDevice,
  claimReferralRewardWithToken,
  ensureMyReferralCode,
  getReferralSnapshot,
  incrementInvitesSharedCount,
  type ApplyReferralResult,
  type ClaimReferralResult,
} from "../services/referralStorage";
import useRemoteConfig from "./useRemoteConfig";
import { defaultConfig } from "../config/remoteConfig";

export default function useReferral() {
  const { addCoins } = useQuizContext();
  const { config: remoteConfig } = useRemoteConfig();
  const referralRewardCoins = Math.max(
    0,
    Number(
      remoteConfig?.referralRewardCoins ?? defaultConfig.referralRewardCoins
    )
  );

  const [isReady, setIsReady] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [myCode, setMyCode] = useState("");
  const [invitesSharedCount, setInvitesSharedCount] = useState(0);
  const [referralsAppliedCount, setReferralsAppliedCount] = useState(0);
  const [appliedCode, setAppliedCode] = useState("");
  const [appliedAt, setAppliedAt] = useState("");
  const [claimToken, setClaimToken] = useState("");
  const [claimedTokensCount, setClaimedTokensCount] = useState(0);

  const hydrate = useCallback(async () => {
    const snapshot = await getReferralSnapshot();
    setMyCode(snapshot.myCode);
    setInvitesSharedCount(snapshot.invitesSharedCount);
    setReferralsAppliedCount(snapshot.referralsAppliedCount);
    setAppliedCode(snapshot.appliedCode);
    setAppliedAt(snapshot.appliedAt);
    setClaimToken(snapshot.claimToken);
    setClaimedTokensCount(snapshot.claimedTokens.length);
  }, []);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const ensuredCode = await ensureMyReferralCode();
      if (!mounted) return;
      setMyCode(ensuredCode);

      await hydrate();
      if (!mounted) return;
      setIsReady(true);
    })().catch(() => {
      if (mounted) {
        setIsReady(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, [hydrate]);

  const shareInvite = useCallback(async () => {
    const safeCode = myCode || (await ensureMyReferralCode());
    const message = `Join me on StudyGarage! Use my referral code ${safeCode} and earn ${referralRewardCoins} coins.\n\nReferral rewards are verified by confirmation code (offline).`;

    const shareResult = await Share.share({
      title: "StudyGarage Referral",
      message,
    });

    if (shareResult.action === Share.sharedAction) {
      const nextCount = await incrementInvitesSharedCount();
      setInvitesSharedCount(nextCount);
      return { shared: true, code: safeCode };
    }

    return { shared: false, code: safeCode };
  }, [myCode, referralRewardCoins]);

  const applyReferral = useCallback(
    async (enteredCode: string): Promise<ApplyReferralResult> => {
      setIsBusy(true);
      try {
        const result = await applyReferralCodeOnDevice(enteredCode);
        if (result.ok) {
          await addCoins({
            eventId: `referral:${result.claimToken || result.appliedCode}`,
            amount: referralRewardCoins,
            source: "referral",
            meta: {
              flow: "apply",
              appliedCode: result.appliedCode,
            },
          });
        }
        await hydrate();
        return result;
      } finally {
        setIsBusy(false);
      }
    },
    [addCoins, hydrate, referralRewardCoins]
  );

  const claimRewardByToken = useCallback(
    async (token: string): Promise<ClaimReferralResult> => {
      setIsBusy(true);
      try {
        const result = await claimReferralRewardWithToken(token);
        if (result.ok) {
          await addCoins({
            eventId: `referral:${result.token || token}`,
            amount: referralRewardCoins,
            source: "referral",
            meta: {
              flow: "claim",
              token: result.token || token,
            },
          });
        }
        await hydrate();
        return result;
      } finally {
        setIsBusy(false);
      }
    },
    [addCoins, hydrate, referralRewardCoins]
  );

  const hasAppliedCode = useMemo(() => Boolean(appliedCode), [appliedCode]);

  return {
    isReady,
    isBusy,
    myCode,
    invitesSharedCount,
    referralsAppliedCount,
    appliedCode,
    appliedAt,
    claimToken,
    claimedTokensCount,
    hasAppliedCode,
    referralRewardCoins,
    hydrate,
    shareInvite,
    applyReferral,
    claimRewardByToken,
  };
}
