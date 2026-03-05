import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const P2017 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/polycet.json'
      resultIndex={0}
      resultPath='P2017'
      screenName='p2017'
    />
  );
};

export default P2017;
