import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Rv2pdfka = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='rv2pdfka'
    />
  );
};

export default Rv2pdfka;
