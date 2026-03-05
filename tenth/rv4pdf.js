import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Rv4pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='rv4pdf'
    />
  );
};

export default Rv4pdf;
