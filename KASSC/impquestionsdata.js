import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Impquestiondataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thimpka.json'
      destinationRoute='imppqpPageka'
    />
  );
};

export default Impquestiondataka;
