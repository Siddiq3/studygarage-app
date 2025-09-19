import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import MrecAdComponent from "../MrecAdComponent";
import useInterstitialAd from "../InterstitialAdComponent";



const Weekans = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showAd } = useInterstitialAd();
const handleNavigate = (screen) => {
      showAd(); // Show interstitial before navigation
      navigation.navigate(screen);
    };

  const getQuiz = async () => {
    setIsLoading(true);
    try {
      const url = 'https://siddiq3.github.io/Api/WeekQuizapi.json';
      const res = await fetch(url);
      const data = await res.json();
      setQuestions(data.results); // store all questions in a single array
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuiz();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {isLoading ? (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>LOADING...</Text>
          </View>
        ) : (
          questions.map((q, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text style={styles.question}>Q. {decodeURIComponent(q.question)}</Text>
              <Text style={styles.answer}>Ans: {decodeURIComponent(q.correct_answer)}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.bottom}>
        <TouchableWithoutFeedback onPress={() =>handleNavigate('10th class')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>GO TO HOME</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <MrecAdComponent/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  loadingText: {
    fontSize: 32,
    fontWeight: '700',
  },
  question: {
    fontSize: 28,
    fontWeight: '700',
  },
  answer: {
    fontSize: 24,
    fontWeight: '500',
    marginTop: 5,
  },
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#e0f0ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#348AC7',
    textAlign: 'center',
  },
});

export default Weekans;
