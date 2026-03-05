import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Fa2pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='fa2pdf'
    />
  );
};

export default Fa2pdf;
