import { StyleSheet, Text, View } from 'react-native';
import React from "react";

const Socialee = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>UPLOADED SHORTLY...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
  },
});

export default Socialee;
