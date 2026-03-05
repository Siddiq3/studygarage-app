import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Fa18pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='fa18pdf'
    />
  );
};

export default Fa18pdf;
