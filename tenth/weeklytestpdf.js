import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Weeklytestpdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='weeklytestpdf'
    />
  );
};

export default Weeklytestpdf;
