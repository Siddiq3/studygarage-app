import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Rv1pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='rv1pdf'
    />
  );
};

export default Rv1pdf;
