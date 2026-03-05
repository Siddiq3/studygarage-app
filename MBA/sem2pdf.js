import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Mbasem2Pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='mbasem2pdf'
    />
  );
};

export default Mbasem2Pdf;
