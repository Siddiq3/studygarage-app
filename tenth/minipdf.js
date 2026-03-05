import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Minipdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='minipdf'
    />
  );
};

export default Minipdf;
