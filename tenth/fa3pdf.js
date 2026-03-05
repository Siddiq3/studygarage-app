import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Fa3pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='fa3pdf'
    />
  );
};

export default Fa3pdf;
