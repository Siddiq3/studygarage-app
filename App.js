import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { OneSignal } from 'react-native-onesignal';
import AppLovinMAX  from 'react-native-applovin-max';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import { QuizProvider } from "./QuizContext";
import { MainStackNavigator1 } from './StackNavigation';

export default function App() {
  useEffect(() => {
    // OneSignal Initialization
    OneSignal.initialize("a03d2003-281c-41cd-875c-2cb5d8cd3907");

    // AppLovin Initialization (SDK only)
    AppLovinMAX.initialize("3aJJKWgaQTgZde8w5N44QkpCvr6SMt765p2cfGqud3ptQetb13k4mRaBinCbT6Ow0h5fmm76GHgkDOfTT2BTTh").then((conf) => {
  // SDK is initialized, start loading ads
}).catch(error => {
  // Failed to initialize SDK
  return error 
});
AppLovinMAX.loadInterstitial("YOUR_INTERSTITIAL_AD_UNIT_ID");
        AppLovinMAX.loadRewardedAd("YOUR_REWARDED_AD_UNIT_ID");
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
