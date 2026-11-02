import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyJobsData } from "./jobsRemote";

const URL =
  process.env.EXPO_PUBLIC_JOBS_DATA_URL ||
  "https://raw.githubusercontent.com/Siddiq3/Api/main/jobs-data.json";
const CACHE_KEY = "job_remote_data_v1";
const TIMEOUT_MS = 10000;

// The last good copy first, so offline students still see updated dates. Calls onChange after each update.
export const loadJobsData = async (onChange) => {
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    if (cached && applyJobsData(JSON.parse(cached))) onChange();
  } catch (_error) {}

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(URL, { signal: controller.signal });
    if (!response.ok) return;
    const text = await response.text();
    if (applyJobsData(JSON.parse(text))) {
      await AsyncStorage.setItem(CACHE_KEY, text);
      onChange();
    }
  } catch (_error) {
    // Offline, or a broken file: the app keeps what it already has.
  } finally {
    clearTimeout(timer);
  }
};
