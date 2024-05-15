import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import OneSignal from 'react-native-onesignal';

import { QuizProvider } from "./QuizContext";

import { MainStackNavigator1 } from './StackNavigation';

export default function App() {
  useEffect(() => {
    // OneSignal Initialization
    OneSignal.setAppId("a03d2003-281c-41cd-875c-2cb5d8cd3907");

    // Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log("OneSignal: notification opened:", notification);
    });
  }, []);

  return (

    <NavigationContainer>
      <QuizProvider>

        <View style={styles.container}>
          <MainStackNavigator1 />
        </View>

      </QuizProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
