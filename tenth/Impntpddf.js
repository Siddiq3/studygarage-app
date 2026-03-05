import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Impntpdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='impntpdf'
    />
  );
};

export default Impntpdf;
