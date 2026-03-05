import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Fa27pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='fa27pdf'
    />
  );
};

export default Fa27pdf;
