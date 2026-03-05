import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Nttpts1 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Nttp1ts'
      screenName='nttpts1'
    />
  );
};

export default Nttpts1;
