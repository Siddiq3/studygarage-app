import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LegacyCompatibilityStack from './LegacyCompatibilityStack';
import { RootRoutes } from './routeNames';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName={RootRoutes.LEGACY_APP} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RootRoutes.LEGACY_APP} component={LegacyCompatibilityStack} />
    </Stack.Navigator>
  );
}
