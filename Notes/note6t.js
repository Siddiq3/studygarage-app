import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Note6t = ({ navigation }) => {
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
        {renderCard("n6t1", "n6t1")}
        {renderCard("n6t2", "n6t2")}
        {renderCard("n6t3", "n6t3")}
        {renderCard("n6t4", "n6t4")}
        {renderCard("n6t5", "n6t5")}
        {renderCard("n6t6", "n6t6")}
        {renderCard("n6t7", "n6t7")}
        {renderCard("n6t8", "n6t8")}
        {renderCard("n6t9", "n6t9")}
        {renderCard("n6t10", "n6t10")}
        {renderCard("n6t11", "n6t11")}
        {renderCard("n6t12", "n6t12")}
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

export default Note6t;
