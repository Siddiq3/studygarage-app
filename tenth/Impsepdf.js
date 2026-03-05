import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Impsepdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='impsepdf'
    />
  );
};

export default Impsepdf;
