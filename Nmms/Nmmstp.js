import React, { useState, useEffect } from "react";
import { BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-shadow-cards";

const Nmmstp = ({ navigation }) => {
  const [questions, setQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getQuiz = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://siddiq3.github.io/Api/test.json");
      const data = await res.json();
      setQuestions(data.results[0]);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuiz();

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.goBack();
        return true;
      }
    );

    return () => backHandler.remove();
  }, [navigation]);

  const testList = [
    { key: "test1", screen: "test1" },
    { key: "test2", screen: "test2" },
    { key: "test3", screen: "test3" },
    { key: "test4", screen: "test4" },
    { key: "test5", screen: "test5" },
    { key: "test6", screen: "test6" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {testList.map((item) => (
          <Card key={item.key} style={styles.card}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={() => navigation.navigate(item.screen)}
            >
              {isLoading ? (
                <Text style={styles.text}>Loading...</Text>
              ) : questions[item.key] ? (
                <Text style={styles.text}>
                  {decodeURIComponent(questions[item.key])}
                </Text>
              ) : (
                <Text style={styles.text}>No Data</Text>
              )}
            </TouchableOpacity>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 10,
    margin: 15,
  },
  button: {
    padding: 10,
    margin: 15,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default Nmmstp;
