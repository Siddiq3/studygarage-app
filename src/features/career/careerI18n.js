import { useEffect, useSyncExternalStore } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import te from "./i18n/te.json";
import kn from "./i18n/kn.json";
import ta from "./i18n/ta.json";
import hi from "./i18n/hi.json";

export const CAREER_LANGUAGES = [
  { key: "en", label: "English" },
  { key: "te", label: "తెలుగు" },
  { key: "kn", label: "ಕನ್ನಡ" },
  { key: "ta", label: "தமிழ்" },
  { key: "hi", label: "हिन्दी" },
];

const DICTIONARIES = { te, kn, ta, hi };
const STORAGE_KEY = "career_language";
const DEFAULT_BY_BOARD = {
  "Andhra Pradesh": "te",
  Telangana: "te",
  Karnataka: "kn",
};

// Module store: every career screen must switch together, and they sit on separate routes.
let language = null;
let hydrated = false;
const listeners = new Set();
const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const setStoreLanguage = (next) => {
  language = next;
  listeners.forEach((listener) => listener());
};

export const translate = (lang, text, vars) => {
  // Anything without a translation, such as exam names, stays in English.
  const template = DICTIONARIES[lang]?.[text] ?? text;
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? "");
};

export default function useCareerLanguage(stateBoard) {
  const current = useSyncExternalStore(subscribe, () => language);

  useEffect(() => {
    if (hydrated) return;
    hydrated = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (language) return;
        const known = CAREER_LANGUAGES.some((item) => item.key === saved);
        setStoreLanguage(known ? saved : DEFAULT_BY_BOARD[stateBoard] || "en");
      })
      .catch(() => setStoreLanguage(DEFAULT_BY_BOARD[stateBoard] || "en"));
  }, [stateBoard]);

  const lang = current || DEFAULT_BY_BOARD[stateBoard] || "en";

  return {
    lang,
    t: (text, vars) => translate(lang, text, vars),
    setLanguage: (next) => {
      setStoreLanguage(next);
      AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
    },
  };
}
