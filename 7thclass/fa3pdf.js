import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Fa37pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='fa37pdf'
    />
  );
};

export default Fa37pdf;
