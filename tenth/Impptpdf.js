import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Impptpdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='impptpdf'
    />
  );
};

export default Impptpdf;
