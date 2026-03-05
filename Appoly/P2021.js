import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const P2021 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/polycet.json'
      resultIndex={0}
      resultPath='P2021'
      screenName='p2021'
    />
  );
};

export default P2021;
