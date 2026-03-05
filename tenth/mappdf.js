import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Mappdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='mappdf'
    />
  );
};

export default Mappdf;
