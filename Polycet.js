import { BackHandler, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Polycet = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack(); // Navigate back when back button is pressed
      return true; // Prevent default behavior
    });

    // ✅ cleanup properly when component unmounts
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('appoly')}>
            <Text style={{ fontSize: 20 }}>AP POLYCET Previous PAPERS</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('IIItp')}>
            <Text style={{ fontSize: 20 }}>IIIT 2023 PREPARATION</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('tspoly')}>
            <Text style={{ fontSize: 20 }}>TS POLYCET Previous PAPERS</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('polypre')}>
            <Text style={{ fontSize: 20 }}>AP & TS POLYCET 2023 PREPARATION</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('polymock')}>
            <Text style={{ fontSize: 20 }}>MOCK TESTS</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffafbd',
  },
});

export default Polycet;
