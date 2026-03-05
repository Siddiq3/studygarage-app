import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Mbasem3Pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='mbasem3pdf'
    />
  );
};

export default Mbasem3Pdf;
