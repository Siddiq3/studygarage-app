import React, { useState, useEffect } from "react";
import { BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-shadow-cards";

const Nmmspp = ({ navigation }) => {
  const [questions, setQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getQuiz = async () => {
    setIsLoading(true);
    try {
      const url = "https://siddiq3.github.io/Api/nmms.json";
      const res = await fetch(url);
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
    { key: "nmms2023em", screen: "nmms2023em" },
    { key: "nmms2023tm", screen: "nmms2023tm" },
    { key: "nmms2022em", screen: "nmms2022em" },
    { key: "nmms2022tm", screen: "nmms2022tm" },
    { key: "nmms2019em1", screen: "nmms2019em1" },
    { key: "nmms2019em2", screen: "nmms2019em2" },
    { key: "nmms2019em3", screen: "nmms2019em3" },
    { key: "nmms2019em4", screen: "nmms2019em4" },
    { key: "nmms2019tm1", screen: "nmms2019tm1" },
    { key: "nmms2019tm2", screen: "nmms2019tm2" },
    { key: "nmms2019tm3", screen: "nmms2019tm3" },
    { key: "nmms2019tm4", screen: "nmms2019tm4" },
    { key: "nmms2018em1", screen: "nmms2018em1" },
    { key: "nmms2018em2", screen: "nmms2018em2" },
    { key: "nmms2018em3", screen: "nmms2018em3" },
    { key: "nmms2018em4", screen: "nmms2018em4" },
    { key: "nmms2018tm1", screen: "nmms2018tm1" },
    { key: "nmms2018tm2", screen: "nmms2018tm2" },
    { key: "nmms2018tm3", screen: "nmms2018tm3" },
    { key: "nmms2018tm4", screen: "nmms2018tm4" },
    { key: "nmms2017em", screen: "nmms2017em" },
    { key: "nmms2017tm", screen: "nmms2017tm" },
    { key: "nmms2016em", screen: "nmms2016em" },
    { key: "nmms2016tm", screen: "nmms2016tm" },
    { key: "nmms2015em", screen: "nmms2015em" },
    { key: "nmms2015tm", screen: "nmms2015tm" },
    { key: "nmms2014em", screen: "nmms2014em" },
    { key: "nmms2014tm", screen: "nmms2014tm" },
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

export default Nmmspp;
