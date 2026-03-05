import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Mcasem1Pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='mcasem1pdf'
    />
  );
};

export default Mcasem1Pdf;
