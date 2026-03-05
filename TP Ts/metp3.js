import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Metpts3 = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/testpapers.json'
      resultIndex={0}
      resultPath='Metp3ts'
      screenName='metpts3'
    />
  );
};

export default Metpts3;
