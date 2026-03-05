import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Metpts2 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Metp2ts'
      screenName='metpts2'
    />
  );
};

export default Metpts2;
