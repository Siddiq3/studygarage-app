import { BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Rvtest2 = ({ navigation }) => {
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
          RIVISION TEST-2 PAPERS
        </Text>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("telugu rvtest2")}>
            <Text style={{ fontSize: 20 }}> TELUGU</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("hindi rvtest2")}>
            <Text style={{ fontSize: 20 }}> HINDI</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("english rvtest2")}>
            <Text style={{ fontSize: 20 }}> ENGLISH</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("maths em rvtest2")}>
            <Text style={{ fontSize: 20 }}> MATHEMATICS-EM</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("maths tm rvtest2")}>
            <Text style={{ fontSize: 20 }}> MATHEMATICS-TM</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("physics em rvtest2")}>
            <Text style={{ fontSize: 20 }}> PS & NS-EM</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("physics tm rvtest2")}>
            <Text style={{ fontSize: 20 }}> PS & NS-TM</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("social tm rvtest2")}>
            <Text style={{ fontSize: 20 }}> SOCIAL-TM</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("social em rvtest2")}>
            <Text style={{ fontSize: 20 }}> SOCIAL-EM</Text>
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

export default Rvtest2;
