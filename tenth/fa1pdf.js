import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Fa1pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='fa1pdf'
    />
  );
};

export default Fa1pdf;
