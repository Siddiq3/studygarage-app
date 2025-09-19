import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Note6e = ({ navigation }) => {
  const [questions, setQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getQuiz = async () => {
    try {
      setIsLoading(true);
      const url1 = 'https://siddiq3.github.io/Api/notes6.json';
      const res = await fetch(url1);
      const data = await res.json();
      setQuestions(data.results[0] || {});
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuiz();
  }, []);

  const renderCard = (key, screen) => (
    <Card key={key} style={{ padding: 10, margin: 15 }}>
      <TouchableOpacity
        style={{ padding: 10, margin: 15 }}
        activeOpacity={0.8}
        onPress={() => navigation.navigate(screen)}
      >
        {isLoading ? (
          <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text>
        ) : (
          questions[key] && (
            <Text style={{ textAlign: 'center', fontSize: 20 }}>
              {decodeURIComponent(questions[key])}
            </Text>
          )
        )}
      </TouchableOpacity>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {renderCard("n6e1", "n6e1")}
        {renderCard("n6e2", "n6e2")}
        {renderCard("n6e3", "n6e3")}
        {renderCard("n6e4", "n6e4")}
        {renderCard("n6e5", "n6e5")}
        {renderCard("n6e6", "n6e6")}
        {renderCard("n6e7", "n6e7")}
        {renderCard("n6e8", "n6e8")}
        {renderCard("n6e9", "n6e9")}
        {renderCard("n6e10", "n6e10")}
        {renderCard("n6e11", "n6e11")}
        {renderCard("n6e12", "n6e12")}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default Note6e;
