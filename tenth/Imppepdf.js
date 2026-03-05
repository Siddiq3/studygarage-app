import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Imppepdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='imppepdf'
    />
  );
};

export default Imppepdf;
