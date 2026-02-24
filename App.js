import React, { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { OneSignal } from 'react-native-onesignal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LevelPlay, LevelPlayInitRequest } from 'unity-levelplay-mediation';

import { QuizProvider } from "./QuizContext";
import { MainStackNavigator1 } from './StackNavigation';

const LEVELPLAY_APP_KEY = Platform.select({
  android: '252feb42d',
  ios: 'YOUR_IOS_APP_KEY',
});

export default function App() {
  useEffect(() => {
    // OneSignal Initialization
    OneSignal.initialize("a03d2003-281c-41cd-875c-2cb5d8cd3907");

    if (!LEVELPLAY_APP_KEY || LEVELPLAY_APP_KEY.includes('YOUR_')) {
      console.log('⚠️ LevelPlay app key is missing for this platform.');
      return;
    }

    const initLevelPlay = async () => {
      const initListener = {
        onInitSuccess: () => {
          console.log('✅ LevelPlay SDK initialized successfully');
          // Optional: LevelPlay.launchTestSuite();
        },
        onInitFailed: (error) => {
          console.log('❌ LevelPlay SDK failed to initialize:', error);
        },
      };

      await LevelPlay.setAdaptersDebug(__DEV__);
      const initRequest = LevelPlayInitRequest.builder(LEVELPLAY_APP_KEY).build();
      await LevelPlay.init(initRequest, initListener);
    };

    initLevelPlay().catch((error) => {
      console.log('❌ LevelPlay initialization error:', error);
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <QuizProvider>
          <View style={styles.container}>
            <MainStackNavigator1 />
          </View>
        </QuizProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
