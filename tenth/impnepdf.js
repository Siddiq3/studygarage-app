import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Impnepdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='impnepdf'
    />
  );
};

export default Impnepdf;
