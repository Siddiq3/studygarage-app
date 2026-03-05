import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Setpts2 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Setp2ts'
      screenName='setpts2'
    />
  );
};

export default Setpts2;
