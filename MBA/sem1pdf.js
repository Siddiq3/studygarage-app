import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Mbasem1Pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='mbasem1pdf'
    />
  );
};

export default Mbasem1Pdf;
