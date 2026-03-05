import { useCallback } from "react";
import useModalQueueManager from "./useModalQueueManager";

export const REWARD_MODALS = {
  DAILY: "dailyReward",
  STREAK_INTRO: "streakIntro",
  STREAK_INCREASED: "streakIncreased",
  REVIEW: "reviewPrompt",
};

export function useRewardModalManager() {
  const { activeModal, requestModal, closeActiveModal, dismissQueuedModal } =
    useModalQueueManager();

  const queueDailyRewardOnOpen = useCallback(() => {
    requestModal(REWARD_MODALS.DAILY, { priority: 1 });
  }, [requestModal]);

  const queueStreakIntro = useCallback(
    (delayMs = 30000) => {
      requestModal(REWARD_MODALS.STREAK_INTRO, { priority: 2, delayMs });
    },
    [requestModal]
  );

  const triggerStreakIncreased = useCallback(() => {
    requestModal(REWARD_MODALS.STREAK_INCREASED, { priority: 3 });
  }, [requestModal]);

  const queueReviewPrompt = useCallback(
    (delayMs = 1200) => {
      requestModal(REWARD_MODALS.REVIEW, { priority: 4, delayMs });
    },
    [requestModal]
  );

  return {
    activeModal,
    closeActiveModal,
    dismissQueuedModal,
    queueDailyRewardOnOpen,
    queueStreakIntro,
    triggerStreakIncreased,
    queueReviewPrompt,
    isDailyVisible: activeModal === REWARD_MODALS.DAILY,
    isStreakIntroVisible: activeModal === REWARD_MODALS.STREAK_INTRO,
    isStreakIncreasedVisible: activeModal === REWARD_MODALS.STREAK_INCREASED,
    isReviewVisible: activeModal === REWARD_MODALS.REVIEW,
  };
}

export default useRewardModalManager;
