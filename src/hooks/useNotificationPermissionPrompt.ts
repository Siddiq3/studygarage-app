import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

type NotifPermissionState = "granted" | "denied" | "undetermined";

const NOTIF_PERMISSION_KEY = "sg_notif_permission";
const NOTIF_PROMPTED_AT_KEY = "sg_notif_prompted_at";
const PROMPT_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000;

const VALID_PERMISSION_STATES: NotifPermissionState[] = [
  "granted",
  "denied",
  "undetermined",
];

const normalizePermission = (value: string | null): NotifPermissionState => {
  const next = String(value || "").toLowerCase();
  if (VALID_PERMISSION_STATES.includes(next as NotifPermissionState)) {
    return next as NotifPermissionState;
  }
  return "undetermined";
};

const mapSystemStatus = (
  status: Notifications.PermissionStatus | undefined
): NotifPermissionState => {
  if (status === "granted") return "granted";
  if (status === "denied") return "denied";
  return "undetermined";
};

export default function useNotificationPermissionPrompt() {
  const [isReady, setIsReady] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [permission, setPermission] =
    useState<NotifPermissionState>("undetermined");

  const evaluatePromptState = useCallback(async () => {
    const now = Date.now();

    const [permissionEntry, promptedAtEntry] = await AsyncStorage.multiGet([
      NOTIF_PERMISSION_KEY,
      NOTIF_PROMPTED_AT_KEY,
    ]);

    const storedPermission = normalizePermission(permissionEntry?.[1] ?? null);
    const promptedAtRaw = Number(promptedAtEntry?.[1] || 0);
    const promptedAt = Number.isFinite(promptedAtRaw) ? promptedAtRaw : 0;

    let resolvedPermission = storedPermission;

    if (resolvedPermission === "undetermined") {
      try {
        const permissionSnapshot = await Notifications.getPermissionsAsync();
        resolvedPermission = mapSystemStatus(permissionSnapshot.status);
      } catch (_error) {
        resolvedPermission = storedPermission;
      }
    }

    const hasDecision =
      resolvedPermission === "granted" || resolvedPermission === "denied";
    const isPromptExpired =
      !promptedAt || now - promptedAt >= PROMPT_INTERVAL_MS;

    setPermission(resolvedPermission);
    setShouldShow(!hasDecision || isPromptExpired);
    setIsReady(true);
  }, []);

  const persistPromptState = useCallback(
    async (nextPermission: NotifPermissionState) => {
      const timestamp = Date.now();
      const safePermission =
        nextPermission === "undetermined" ? "denied" : nextPermission;

      await AsyncStorage.multiSet([
        [NOTIF_PERMISSION_KEY, safePermission],
        [NOTIF_PROMPTED_AT_KEY, String(timestamp)],
      ]);

      setPermission(safePermission);
      setShouldShow(false);
    },
    []
  );

  const dismissForNow = useCallback(async () => {
    await persistPromptState("denied");
    return "denied" as const;
  }, [persistPromptState]);

  const requestPermission = useCallback(async () => {
    try {
      const response = await Notifications.requestPermissionsAsync();
      const mapped = mapSystemStatus(response.status);
      await persistPromptState(mapped);
      return mapped;
    } catch (_error) {
      await persistPromptState("denied");
      return "denied" as const;
    }
  }, [persistPromptState]);

  useEffect(() => {
    evaluatePromptState().catch(() => {
      setPermission("undetermined");
      setShouldShow(true);
      setIsReady(true);
    });
  }, [evaluatePromptState]);

  return {
    isReady,
    shouldShow,
    permission,
    requestPermission,
    dismissForNow,
    refresh: evaluatePromptState,
  };
}
