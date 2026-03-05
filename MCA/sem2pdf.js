import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Mcasem2Pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='mcasem2pdf'
    />
  );
};

export default Mcasem2Pdf;
