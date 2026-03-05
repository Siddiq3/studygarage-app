import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Htsb = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/blueprint.json'
      resultIndex={0}
      resultPath='Htsb'
      screenName='htsb'
    />
  );
};

export default Htsb;
