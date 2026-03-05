import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Impengpdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='impengpdf'
    />
  );
};

export default Impengpdf;
