import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Fa38pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='fa38pdf'
    />
  );
};

export default Fa38pdf;
