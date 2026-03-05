import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { DarkTheme, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SystemUI from 'expo-system-ui';
import { useFonts } from 'expo-font';
import {
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import { QuizProvider } from '../../QuizContext';

const appDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    card: '#1A1D27',
    border: 'rgba(255,255,255,0.10)',
    text: '#F5F7FF',
    primary: '#B026FF',
  },
};

export default function RootProviders({ children }) {
  const navigationRef = useNavigationContainerRef();
  const [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  useEffect(() => {
    SystemUI.setBackgroundColorAsync('#121212').catch(() => {});
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
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#121212' }}>
      <NavigationContainer ref={navigationRef} theme={appDarkTheme}>
        <QuizProvider>{children}</QuizProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
