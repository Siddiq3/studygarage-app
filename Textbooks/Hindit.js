import React from 'react';
import ModernContentWebView from '../components/ModernContentWebView';

const Hindit = () => {
  return (
    <ModernContentWebView
      fetchUrl='https://siddiq3.github.io/Api/impquestion.json'
      resultIndex={0}
      resultPath='hindit'
      screenName='hindit'
    />
  );
};

export default Hindit;
