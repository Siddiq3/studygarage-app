import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Fa18pdfka = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='fa18pdfka'
    />
  );
};

export default Fa18pdfka;
