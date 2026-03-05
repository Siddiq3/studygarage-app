import React from 'react';
import RootProviders from './RootProviders';
import RootNavigator from '../navigation/RootNavigator';
import AppUpdateGate from '../features/update/AppUpdateGate';

export default function AppBootstrap() {
  return (
    <RootProviders>
      <RootNavigator />
      <AppUpdateGate />
    </RootProviders>
  );
}
