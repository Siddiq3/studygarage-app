import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Setpts1 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Setp1ts'
      screenName='setpts1'
    />
  );
};

export default Setpts1;
