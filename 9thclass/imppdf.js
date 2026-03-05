import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Imp9pdf = ({ route }) => {
  return (
    <ModernContentWebView
      route={route}
      routeParamKey='url'
      screenName='imp9pdf'
    />
  );
};

export default Imp9pdf;
