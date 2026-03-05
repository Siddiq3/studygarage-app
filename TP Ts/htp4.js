import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Htpts4 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Htp4ts'
      screenName='htpts4'
    />
  );
};

export default Htpts4;
