import AsyncStorage from "@react-native-async-storage/async-storage";
import { localStore } from "../services/storage/localStore";
import { toLocalDateKey } from "../utils/dateKey";
import { requestReviewOrOpenStore } from "../components/review/requestReviewOrOpenStore";

const MIN_OPEN_COUNT_FOR_PROMPT = 4;
const PROMPT_COOLDOWN_DAYS = 14;
const LAST_RATED_AT_KEY = "sg_review_last_rated_at";
export const LAST_SELECTED_RATING_KEY = "sg_review_last_selected_rating";
const PLAY_STORE_APP_URL =
  "https://play.google.com/store/apps/details?id=siddiqkolimidev.tenth_app&hl=en_IN";

function addDaysToDateKey(dateKey, daysToAdd) {
  const [year, month, day] = String(dateKey)
    .split("-")
    .map((chunk) => Number(chunk));

  if (!year || !month || !day) {
    return toLocalDateKey();
  }

  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + daysToAdd);
  return toLocalDateKey(date);
}

export default function useReviewPrompt() {
  const shouldQueueReviewPrompt = async ({
    hasEngagement = false,
  } = {}) => {
    const today = toLocalDateKey();

    const [completed, openCount, lastShownDate, remindAfterDate, lastRatedAt] =
      await Promise.all([
        localStore.getBool(localStore.keys.reviewPromptCompleted, false),
        localStore.getNumber(localStore.keys.reviewPromptOpenCount, 0),
        localStore.getString(localStore.keys.reviewPromptLastShownDate, ""),
        localStore.getString(localStore.keys.reviewPromptRemindAfterDate, ""),
        AsyncStorage.getItem(LAST_RATED_AT_KEY),
      ]);

    if (completed) return false;

    if (
      lastRatedAt &&
      addDaysToDateKey(lastRatedAt, PROMPT_COOLDOWN_DAYS) > today
    ) {
      return false;
    }

    const nextOpenCount = openCount + 1;
    await localStore.setNumber(localStore.keys.reviewPromptOpenCount, nextOpenCount);

    if (!hasEngagement || nextOpenCount < MIN_OPEN_COUNT_FOR_PROMPT) {
      return false;
    }

    if (lastShownDate === today) {
      return false;
    }

    if (remindAfterDate && remindAfterDate > today) {
      return false;
    }

    await localStore.setString(localStore.keys.reviewPromptLastShownDate, today);
    return true;
  };

  const submitRating = async (stars) => {
    const today = toLocalDateKey();
    const rating = Math.max(0, Math.min(5, Number(stars) || 0));
    await Promise.all([
      AsyncStorage.setItem(LAST_RATED_AT_KEY, today),
      AsyncStorage.setItem(LAST_SELECTED_RATING_KEY, String(rating)),
    ]);

    if (rating >= 4) {
      const reviewResult = await requestReviewOrOpenStore(PLAY_STORE_APP_URL);

      if (reviewResult.openedStore) {
        await Promise.all([
          localStore.setBool(localStore.keys.reviewPromptCompleted, true),
          localStore.setString(localStore.keys.reviewPromptRemindAfterDate, ""),
          localStore.setString(localStore.keys.reviewPromptLastShownDate, today),
        ]);
        return { openedStore: true, snoozedUntil: "" };
      }

      const snoozedUntil = addDaysToDateKey(today, PROMPT_COOLDOWN_DAYS);
      await Promise.all([
        localStore.setString(
          localStore.keys.reviewPromptRemindAfterDate,
          snoozedUntil
        ),
        localStore.setString(localStore.keys.reviewPromptLastShownDate, today),
      ]);
      return { openedStore: false, snoozedUntil };
    }

    const snoozedUntil = addDaysToDateKey(today, PROMPT_COOLDOWN_DAYS);
    await Promise.all([
      localStore.setString(
        localStore.keys.reviewPromptRemindAfterDate,
        snoozedUntil
      ),
      localStore.setString(localStore.keys.reviewPromptLastShownDate, today),
    ]);
    return { openedStore: false, snoozedUntil };
  };

  const dismissForLater = async () => {
    const today = toLocalDateKey();
    const snoozedUntil = addDaysToDateKey(today, PROMPT_COOLDOWN_DAYS);

    await Promise.all([
      localStore.setString(
        localStore.keys.reviewPromptRemindAfterDate,
        snoozedUntil
      ),
      localStore.setString(localStore.keys.reviewPromptLastShownDate, today),
    ]);

    return snoozedUntil;
  };

  return {
    shouldQueueReviewPrompt,
    submitRating,
    dismissForLater,
  };
}
