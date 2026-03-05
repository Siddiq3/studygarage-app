import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Impmtpdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='impmtpdf'
    />
  );
};

export default Impmtpdf;
