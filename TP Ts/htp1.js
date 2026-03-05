import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Htpts1 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Htp1ts'
      screenName='htpts1'
    />
  );
};

export default Htpts1;
