import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Mbasem4Pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='mbasem4pdf'
    />
  );
};

export default Mbasem4Pdf;
