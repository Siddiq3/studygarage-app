import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Imp6pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='imp6pdf'
    />
  );
};

export default Imp6pdf;
