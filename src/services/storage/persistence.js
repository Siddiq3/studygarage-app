import AsyncStorage from "@react-native-async-storage/async-storage";

export const getNumber = async (key, fallback = 0) => {
  const raw = await AsyncStorage.getItem(key);
  const num = Number(raw);
  return Number.isFinite(num) ? num : fallback;
};

export const setNumber = async (key, value) => {
  const safe = Number.isFinite(Number(value)) ? Number(value) : 0;
  await AsyncStorage.setItem(key, String(safe));
};

export const getString = async (key, fallback = "") => {
  const raw = await AsyncStorage.getItem(key);
  return raw ?? fallback;
};

export const setString = async (key, value) => {
  await AsyncStorage.setItem(key, value ?? "");
};

export const getBoolean = async (key, fallback = false) => {
  const raw = await AsyncStorage.getItem(key);
  if (raw == null) return fallback;
  return raw === "true";
};

export const setBoolean = async (key, value) => {
  await AsyncStorage.setItem(key, value ? "true" : "false");
};

export const getTodayString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getYesterdayString = (date = new Date()) => {
  const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  copy.setDate(copy.getDate() - 1);
  return getTodayString(copy);
};

export default {
  getNumber,
  setNumber,
  getString,
  setString,
  getBoolean,
  setBoolean,
  getTodayString,
  getYesterdayString,
};
