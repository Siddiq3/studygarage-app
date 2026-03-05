import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Sa1pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='sa1pdf'
    />
  );
};

export default Sa1pdf;
