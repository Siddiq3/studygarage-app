import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Htpts3 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Htp3ts'
      screenName='htpts3'
    />
  );
};

export default Htpts3;
