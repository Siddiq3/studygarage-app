import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Mcasem4Pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='mcasem4pdf'
    />
  );
};

export default Mcasem4Pdf;
