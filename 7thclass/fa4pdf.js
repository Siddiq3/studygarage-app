import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Fa47pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='fa47pdf'
    />
  );
};

export default Fa47pdf;
