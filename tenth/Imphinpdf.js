import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Imphinpdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='imphinpdf'
    />
  );
};

export default Imphinpdf;
