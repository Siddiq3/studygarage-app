import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Fa26pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='fa26pdf'
    />
  );
};

export default Fa26pdf;
