import React, { useState, useEffect } from "react";
import { BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-shadow-cards";

const Nmmssm = ({ navigation }) => {
  const [questions, setQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getQuiz = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://siddiq3.github.io/Api/nmms.json");
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

  const questionList = [
    { key: "nmmsme", screen: "nmmsme" },
    { key: "nmmsmt", screen: "nmmsmt" },
    { key: "nmmspe", screen: "nmmsse" }, // Adjusted based on your code
    { key: "nmmspt", screen: "nmmsst" },
    { key: "nmmsse", screen: "nmmsse" },
    { key: "nmmsst", screen: "nmmsst" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {questionList.map((item) => (
          <Card key={item.key} style={styles.card}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => navigation.navigate(item.screen)}
            >
              {isLoading ? (
                <Text style={styles.text}>Loading...</Text>
              ) : questions && questions[item.key] ? (
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

export default Nmmssm;
