import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Mttpts1 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Mttp1ts'
      screenName='mttpts1'
    />
  );
};

export default Mttpts1;
