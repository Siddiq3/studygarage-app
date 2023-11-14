import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';


import OneSignal from 'react-native-onesignal';
import { useEffect, useState } from 'react';



import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './TabNavigation';






export default function App() {











  useEffect(() => {
    // OneSignal Initialization
    OneSignal.setAppId("a03d2003-281c-41cd-875c-2cb5d8cd3907"); //  095d99d3-5a72-47e3-a8f2-f1a4d51671d6

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log("OneSignal: notification opened:", notification);
    });
  }, [])









  return (


    <NavigationContainer style={styles.container}>

      <TabNavigation />
    </NavigationContainer>

  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
