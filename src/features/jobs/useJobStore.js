import { useEffect, useSyncExternalStore } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadJobsData } from "./jobsRemoteLoader";

const PROFILE_KEY = "job_profile_v1";
const GOALS_KEY = "job_goals_v1";
const FOLLOWED_KEY = "job_followed_v1";

// Module store: every jobs screen shares it, and they sit on separate routes.
let state = { ready: false, profile: null, goals: {}, followed: [], dataVersion: 0 };
let loading = false;
const listeners = new Set();
const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const setState = (next) => {
  state = { ...state, ...next };
  listeners.forEach((listener) => listener());
};

const parse = (raw, fallback) => {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch (_error) {
    return fallback;
  }
};

const saveGoals = (goals) => {
  setState({ goals });
  AsyncStorage.setItem(GOALS_KEY, JSON.stringify(goals)).catch(() => {});
};

// Each goal keeps its own progress and quiz history; coins stay in the shared wallet.
const newGoal = () => ({ addedAt: new Date().toISOString(), topicsDone: {}, quizHistory: [] });
const QUIZ_HISTORY_LIMIT = 100;

export const recordJobQuiz = (examId, result) => {
  const goal = state.goals[examId];
  // Practising must not add a goal the student never chose.
  if (!goal) return;
  const quizHistory = [...goal.quizHistory, { ...result, at: new Date().toISOString() }].slice(-QUIZ_HISTORY_LIMIT);
  saveGoals({ ...state.goals, [examId]: { ...goal, quizHistory } });
};

export default function useJobStore() {
  const current = useSyncExternalStore(subscribe, () => state);

  useEffect(() => {
    if (state.ready || loading) return;
    loading = true;
    loadJobsData(() => setState({ dataVersion: state.dataVersion + 1 }));
    AsyncStorage.multiGet([PROFILE_KEY, GOALS_KEY, FOLLOWED_KEY])
      .then(([[, profile], [, goals], [, followed]]) => {
        setState({ ready: true, profile: parse(profile, null), goals: parse(goals, {}), followed: parse(followed, []) });
      })
      .catch(() => setState({ ready: true }))
      .finally(() => {
        loading = false;
      });
  }, []);

  return {
    ...current,
    saveProfile: (profile) => {
      setState({ profile });
      AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile)).catch(() => {});
    },
    toggleFollow: (jobId) => {
      const followed = state.followed.includes(jobId)
        ? state.followed.filter((id) => id !== jobId)
        : [...state.followed, jobId];
      setState({ followed });
      AsyncStorage.setItem(FOLLOWED_KEY, JSON.stringify(followed)).catch(() => {});
      return followed;
    },
    addGoal: (examId) => {
      if (!state.goals[examId]) saveGoals({ ...state.goals, [examId]: newGoal() });
    },
    removeGoal: (examId) => {
      const { [examId]: _removed, ...rest } = state.goals;
      saveGoals(rest);
    },
    toggleTopic: (examId, key) => {
      const goal = state.goals[examId] || newGoal();
      const topicsDone = { ...goal.topicsDone };
      if (topicsDone[key]) delete topicsDone[key];
      else topicsDone[key] = true;
      saveGoals({ ...state.goals, [examId]: { ...goal, topicsDone } });
    },
  };
}
