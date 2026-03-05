import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Ssttpts1 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Ssttp1ts'
      screenName='ssttpts1'
    />
  );
};

export default Ssttpts1;
