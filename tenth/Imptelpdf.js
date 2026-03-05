import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Imptelpdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='imptelpdf'
    />
  );
};

export default Imptelpdf;
