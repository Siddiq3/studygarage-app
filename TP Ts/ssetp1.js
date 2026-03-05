import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Ssetpts1 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Ssetp1ts'
      screenName='ssetpts1'
    />
  );
};

export default Ssetpts1;
