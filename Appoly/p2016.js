import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const P2016 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/polycet.json'
      resultIndex={0}
      resultPath='P2016'
      screenName='p2016'
    />
  );
};

export default P2016;
