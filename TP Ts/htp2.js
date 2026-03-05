import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Htpts2 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Htp2ts'
      screenName='htpts2'
    />
  );
};

export default Htpts2;
