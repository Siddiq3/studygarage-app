import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Fa17pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='fa17pdf'
    />
  );
};

export default Fa17pdf;
