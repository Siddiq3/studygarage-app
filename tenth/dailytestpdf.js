import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Dailytesttpdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='dailytesttpdf'
    />
  );
};

export default Dailytesttpdf;
