import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Rv2pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='rv2pdf'
    />
  );
};

export default Rv2pdf;
