import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const P2020t = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/polycet.json'
      resultIndex={0}
      resultPath='P2020t'
      screenName='p2020t'
    />
  );
};

export default P2020t;
