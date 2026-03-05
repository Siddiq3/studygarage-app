import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Prefinalpdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='prefinalpdf'
    />
  );
};

export default Prefinalpdf;
