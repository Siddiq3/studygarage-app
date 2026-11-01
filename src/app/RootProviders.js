import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { DefaultTheme, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SystemUI from 'expo-system-ui';
import { useFonts } from 'expo-font';
import { BricolageGrotesque_700Bold } from '@expo-google-fonts/bricolage-grotesque';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { QuizProvider } from '../../QuizContext';

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F6F1E7',
    card: '#FFFCF5',
    border: 'rgba(29,42,36,0.12)',
    text: '#1D2A24',
    primary: '#17694F',
  },
};

export default function RootProviders({ children }) {
  const navigationRef = useNavigationContainerRef();
  const [fontsLoaded] = useFonts({
    BricolageGrotesque_700Bold,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  useEffect(() => {
    SystemUI.setBackgroundColorAsync('#F6F1E7').catch(() => {});
  }, []);

  useEffect(() => {
    const hardwareBackSubscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!navigationRef.isReady()) {
        return false;
      }

      if (navigationRef.canGoBack()) {
        navigationRef.goBack();
        return true;
      }

      const currentRouteName = navigationRef.getCurrentRoute()?.name;
      if (currentRouteName && currentRouteName !== 'SecondPage') {
        try {
          navigationRef.navigate('SecondPage');
          return true;
        } catch (_error) {
          // swallow and consume back press to prevent accidental app exit
        }
      }

      return true;
    });

    return () => hardwareBackSubscription.remove();
  }, [navigationRef]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#F6F1E7' }}>
      <NavigationContainer ref={navigationRef} theme={appTheme}>
        <QuizProvider>{children}</QuizProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
