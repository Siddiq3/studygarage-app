import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Fa28pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='fa28pdf'
    />
  );
};

export default Fa28pdf;
