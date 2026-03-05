import React, { useCallback, useEffect, useRef, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { OneSignal } from "react-native-onesignal";
import { LevelPlay, LevelPlayInitRequest } from "unity-levelplay-mediation";
import AppBootstrap from "./src/app/AppBootstrap";
import AnimatedBrandSplash from "./src/features/splash/AnimatedBrandSplash";
import NotificationPermissionSheet from "./src/components/notifications/NotificationPermissionSheet";
import useNotificationPermissionPrompt from "./src/hooks/useNotificationPermissionPrompt";
// import SoundService from './src/services/sound/SoundService';
import "./global.css";

const LEVELPLAY_APP_KEY = Platform.select({
  android: "252feb42d",
  ios: "YOUR_IOS_APP_KEY",
});

export default function App() {
  const [showBrandSplash, setShowBrandSplash] = useState(true);
  const [notificationSheetVisible, setNotificationSheetVisible] =
    useState(false);
  const notificationActionTimerRef = useRef(null);
  const {
    isReady: notificationPromptReady,
    shouldShow: shouldShowNotificationPrompt,
    requestPermission: requestNotificationPermission,
    dismissForNow: dismissNotificationForNow,
  } = useNotificationPermissionPrompt();

  useEffect(() => {
    // Sound effects are temporarily disabled.
    // SoundService.preload().catch(() => {});
    // if (__DEV__) {
    //   SoundService.selfTest().catch(() => {});
    // }

    // OneSignal Initialization
    OneSignal.initialize("a03d2003-281c-41cd-875c-2cb5d8cd3907");

    if (!LEVELPLAY_APP_KEY || LEVELPLAY_APP_KEY.includes("YOUR_")) {
      console.log("⚠️ LevelPlay app key is missing for this platform.");
      return;
    }

    const initLevelPlay = async () => {
      const initListener = {
        onInitSuccess: () => {
          console.log("✅ LevelPlay SDK initialized successfully");
          // Optional: LevelPlay.launchTestSuite();
        },
        onInitFailed: (error) => {
          console.log("❌ LevelPlay SDK failed to initialize:", error);
        },
      };

      await LevelPlay.setAdaptersDebug(__DEV__);
      const initRequest =
        LevelPlayInitRequest.builder(LEVELPLAY_APP_KEY).build();
      await LevelPlay.init(initRequest, initListener);
    };

    initLevelPlay().catch((error) => {
      console.log("❌ LevelPlay initialization error:", error);
    });
  }, []);

  useEffect(() => {
    if (showBrandSplash || !notificationPromptReady) {
      return;
    }

    if (shouldShowNotificationPrompt) {
      const timer = setTimeout(() => {
        setNotificationSheetVisible(true);
      }, 90);
      return () => clearTimeout(timer);
    }

    setNotificationSheetVisible(false);
    return undefined;
  }, [notificationPromptReady, shouldShowNotificationPrompt, showBrandSplash]);

  useEffect(() => {
    return () => {
      if (notificationActionTimerRef.current) {
        clearTimeout(notificationActionTimerRef.current);
      }
    };
  }, []);

  const queueNotificationAction = useCallback((fn) => {
    if (notificationActionTimerRef.current) {
      clearTimeout(notificationActionTimerRef.current);
    }
    notificationActionTimerRef.current = setTimeout(() => {
      fn().catch(() => {});
    }, 360);
  }, []);

  const handleAllowNotifications = useCallback(() => {
    setNotificationSheetVisible(false);
    queueNotificationAction(requestNotificationPermission);
  }, [queueNotificationAction, requestNotificationPermission]);

  const handleNotNowNotifications = useCallback(() => {
    setNotificationSheetVisible(false);
    queueNotificationAction(dismissNotificationForNow);
  }, [dismissNotificationForNow, queueNotificationAction]);

  return (
    <View style={styles.container}>
      {showBrandSplash ? (
        <AnimatedBrandSplash onFinish={() => setShowBrandSplash(false)} />
      ) : (
        <AppBootstrap />
      )}

      <NotificationPermissionSheet
        visible={!showBrandSplash && notificationSheetVisible}
        onAllow={handleAllowNotifications}
        onNotNow={handleNotNowNotifications}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});
