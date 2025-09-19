import React, { useEffect } from "react";
import { BackHandler, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { Card } from "react-native-shadow-cards";

const Kapqp = ({ navigation }) => {

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack(); // Navigate back when back button is pressed
      return true; // Prevent default behavior

    return () => backHandler.remove();
  
    });
    return () => backHandler.remove();}, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{ fontSize: 25, textAlign: "center", color: "#D82148" }}>
          Previous Year 2015-2023 Question Papers
        </Text>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("kanada ka")}>
            <Text style={{ fontSize: 20 }}>KANADA</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("hindi ka")}>
            <Text style={{ fontSize: 20 }}>HINDI</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("english ka")}>
            <Text style={{ fontSize: 20 }}>ENGLISH</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("maths ka")}>
            <Text style={{ fontSize: 20 }}>MATHAMATICS- EM & KM</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("biology ka")}>
            <Text style={{ fontSize: 20 }}>SCIENCE EM & KM</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ padding: 30, margin: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("social ka")}>
            <Text style={{ fontSize: 20 }}>SOCIAL-EM & KM</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </View>
  );
};


export default Kapqp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffafbd",
  },
  });

