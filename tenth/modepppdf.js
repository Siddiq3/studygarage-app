import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Modelpaperpdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='modelpaperpdf'
    />
  );
};

export default Modelpaperpdf;
