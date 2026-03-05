import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Fa4pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='fa4pdf'
    />
  );
};

export default Fa4pdf;
