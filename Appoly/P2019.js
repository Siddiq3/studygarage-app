import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const P2019 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/polycet.json'
      resultIndex={0}
      resultPath='P2019'
      screenName='p2019'
    />
  );
};

export default P2019;
