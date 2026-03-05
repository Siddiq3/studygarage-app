import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Blueprintpdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='blueprintpdf'
    />
  );
};

export default Blueprintpdf;
