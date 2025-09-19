import { BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Rivision = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack(); // Navigate back when back button is pressed
      return true; // Prevent default behavior
    });

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{ fontSize: 25, textAlign: "center", color: "#D82148", marginVertical: 20 }}>
          RIVISION TEST PAPERS
        </Text>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("rivisiontest11")}>
            <Text style={{ fontSize: 20 }}>RIVISION TEST-1</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("rivisiontest21")}>
            <Text style={{ fontSize: 20 }}>RIVISION TEST-2</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("rivisiontest31")}>
            <Text style={{ fontSize: 20 }}>RIVISION TEST-3</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("rivisiontest41")}>
            <Text style={{ fontSize: 20 }}>RIVISION TEST-4</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
});

export default Rivision;
