import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const P2022 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/polycet.json'
      resultIndex={0}
      resultPath='P2022'
      screenName='p2022'
    />
  );
};

export default P2022;
