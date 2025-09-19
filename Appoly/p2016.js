import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview'; // Make sure this package is installed

const P2016 = () => {
  const [questions, setQuestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getQuiz = async () => {
    setIsLoading(true);
    try {
      const url1 = 'https://siddiq3.github.io/Api/polycet.json';
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
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#348AC7" />
        <Text style={{ fontSize: 20, marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {questions?.P2016 ? (
        <WebView source={{ uri: questions.P2016 }} style={{ flex: 1 }} />
      ) : (
        <Text style={{ flex: 1, textAlign: 'center', marginTop: 20 }}>
          No data available
        </Text>
      )}
    </View>
  );
};

export default P2016;
