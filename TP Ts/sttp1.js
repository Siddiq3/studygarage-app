import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Sttpts1 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Sttp1ts'
      screenName='sttpts1'
    />
  );
};

export default Sttpts1;
