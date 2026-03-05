import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Fa46pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='fa46pdf'
    />
  );
};

export default Fa46pdf;
