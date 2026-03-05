import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Nset = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/impquestion.json'
      resultIndex={0}
      resultPath='nset'
      screenName='nset'
    />
  );
};

export default Nset;
