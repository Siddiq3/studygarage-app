import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Fa16pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='fa16pdf'
    />
  );
};

export default Fa16pdf;
