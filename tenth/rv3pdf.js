import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Rv3pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='rv3pdf'
    />
  );
};

export default Rv3pdf;
