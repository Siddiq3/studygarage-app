import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Linking } from 'react-native';
import * as Haptics from 'expo-haptics';
import AppUpdatePrompt from '../../components/update/AppUpdatePrompt';
import {
  checkForAppUpdate,
  markOptionalUpdateDismissed,
} from '../../services/update/appUpdateService';

export default function AppUpdateGate() {
  const [updateInfo, setUpdateInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      try {
        const result = await checkForAppUpdate();
        if (!mounted) return;

        if (result?.shouldShow) {
          setUpdateInfo(result);
        } else {
          setUpdateInfo(null);
        }
      } catch (_error) {
        if (!mounted) return;
        setUpdateInfo(null);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    const timer = setTimeout(check, 650);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  const handleLater = useCallback(async () => {
    if (!updateInfo || updateInfo.forceUpdate) return;

    await markOptionalUpdateDismissed();
    setUpdateInfo(null);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  }, [updateInfo]);

  const handleUpdateNow = useCallback(async () => {
    if (!updateInfo?.storeUrl) return;

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
      () => {}
    );

    const canOpen = await Linking.canOpenURL(updateInfo.storeUrl);
    if (!canOpen) {
      Alert.alert('Update', 'Unable to open store link right now.');
      return;
    }

    await Linking.openURL(updateInfo.storeUrl);

    if (!updateInfo.forceUpdate) {
      setUpdateInfo(null);
    }
  }, [updateInfo]);

  if (loading) return null;

  return (
    <AppUpdatePrompt
      visible={Boolean(updateInfo)}
      forceUpdate={Boolean(updateInfo?.forceUpdate)}
      title={updateInfo?.title}
      message={updateInfo?.message}
      currentVersion={updateInfo?.currentVersion}
      latestVersion={updateInfo?.latestVersion}
      updateNowLabel={updateInfo?.updateNowLabel}
      laterLabel={updateInfo?.laterLabel}
      onPressUpdate={handleUpdateNow}
      onPressLater={handleLater}
    />
  );
}
