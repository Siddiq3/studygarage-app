import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Impmepdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='impmepdf'
    />
  );
};

export default Impmepdf;
