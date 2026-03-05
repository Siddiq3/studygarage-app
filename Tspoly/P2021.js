import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const P2021t = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/polycet.json'
      resultIndex={0}
      resultPath='P2021t'
      screenName='p2021t'
    />
  );
};

export default P2021t;
