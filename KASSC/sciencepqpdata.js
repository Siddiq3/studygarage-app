import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Scipqpdataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thscipqpka.json'
      destinationRoute='SciPqpPageka'
    />
  );
};

export default Scipqpdataka;
