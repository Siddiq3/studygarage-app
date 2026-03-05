import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Metpts1 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Metp1ts'
      screenName='metpts1'
    />
  );
};

export default Metpts1;
