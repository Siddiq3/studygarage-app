import React, { useState, useEffect } from "react";
import { BackHandler, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Card } from "react-native-shadow-cards";

const Class6tb = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getQuiz = async () => {
    setIsLoading(true);
    try {
      const url1 = 'https://siddiq3.github.io/Api/subject.json';
      const res = await fetch(url1);
      const data = await res.json();
      setQuestions(data.results[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuiz();

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true; // Prevent default behavior
    });

    return () => {
      backHandler.remove(); // ✅ proper cleanup
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={{ padding: 10, margin: 15 }}>
          <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('telugu tb6')}>
            {isLoading ? (
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text>
            ) : (
              questions && <Text style={{ textAlign: 'center', fontSize: 20 }}>{decodeURIComponent(questions.ttb6)}</Text>
            )}
          </TouchableOpacity>
        </Card>

        {/* repeat same structure for other subjects */}
        <Card style={{ padding: 10, margin: 15 }}>
          <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('hindi tb6')}>
            {isLoading ? (
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text>
            ) : (
              questions && <Text style={{ textAlign: 'center', fontSize: 20 }}>{decodeURIComponent(questions.htb6)}</Text>
            )}
          </TouchableOpacity>
        </Card>

        {/* Continue for english, maths, science, social ... */}
      </ScrollView>
    </View>
  );
};

export default Class6tb;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

