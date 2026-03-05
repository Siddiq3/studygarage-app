import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Ttpts1 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Ttp1ts'
      screenName='ttpts1'
    />
  );
};

export default Ttpts1;
