import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Pub2023pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='pub2023pdf'
    />
  );
};

export default Pub2023pdf;
