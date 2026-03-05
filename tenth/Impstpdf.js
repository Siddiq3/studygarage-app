import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Impstpdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='impstpdf'
    />
  );
};

export default Impstpdf;
