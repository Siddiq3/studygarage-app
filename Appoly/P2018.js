import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const P2018 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/polycet.json'
      resultIndex={0}
      resultPath='P2018'
      screenName='p2018'
    />
  );
};

export default P2018;
