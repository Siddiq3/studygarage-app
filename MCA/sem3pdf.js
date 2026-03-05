import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Mcasem3Pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='mcasem3pdf'
    />
  );
};

export default Mcasem3Pdf;
