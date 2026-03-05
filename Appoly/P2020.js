import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const P2020 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/polycet.json'
      resultIndex={0}
      resultPath='P2020'
      screenName='p2020'
    />
  );
};

export default P2020;
