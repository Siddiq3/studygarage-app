import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import ScreenLayoutContainer from "./src/design-system/components/ScreenLayoutContainer";
import SGCard from "./src/design-system/components/SGCard";
import SGButton from "./src/design-system/components/SGButton";
import AnimatedActionCard from "./src/design-system/components/AnimatedActionCard";
import ShimmerSkeleton from "./src/components/ui/ShimmerSkeleton";

const Mocktest = ({ navigation }) => {
  const [questions, setQuestions] = useState(null);
  const [ques, setQues] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const generateOptionsAndShuffle = (_question) => {
    const nextOptions = [..._question.incorrect_answers];
    nextOptions.push(_question.correct_answer);
    shuffleArray(nextOptions);
    return nextOptions;
  };

  const getQuiz = async () => {
    setIsLoading(true);
    const url = "https://siddiq3.github.io/Api/mocktest.json";
    const res = await fetch(url);
    const data = await res.json();

    setQuestions(data.results);
    setOptions(generateOptionsAndShuffle(data.results[0]));
    setIsLoading(false);
  };

  useEffect(() => {
    getQuiz();
  }, []);

  const handleShowResult = () => {
    navigation.navigate("mocktest Result", {
      score,
    });
  };

  const handleNextPress = () => {
    if (ques < questions.length - 1) {
      setQues(ques + 1);
      setOptions(generateOptionsAndShuffle(questions[ques + 1]));
      return;
    }
    handleShowResult();
  };

  const handlSelectedOption = (_option) => {
    if (_option === questions[ques].correct_answer) {
      setScore(score + 1);
    }
    if (ques < questions.length - 1) {
      setQues(ques + 1);
      setOptions(generateOptionsAndShuffle(questions[ques + 1]));
      return;
    }
    handleShowResult();
  };

  return (
    <ScreenLayoutContainer variant="home" contentClassName="px-4" scroll>
      <Animated.View entering={FadeInDown.duration(220)}>
        <SGCard className="mb-4">
          <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-sg-muted dark:text-sgd-muted">
            Mock Test
          </Text>
          <Text className="mt-1 text-[28px] font-extrabold leading-[32px] text-sg-text dark:text-sgd-text">
            Practice Mode
          </Text>

          {isLoading ? (
            <View className="py-4">
              <ShimmerSkeleton height={124} borderRadius={20} />
              <View className="mt-4">
                {[0, 1, 2, 3].map((idx) => (
                  <View key={`mock-loader-${idx}`} className="mb-3">
                    <ShimmerSkeleton height={64} borderRadius={18} />
                  </View>
                ))}
              </View>
            </View>
          ) : questions ? (
            <>
              <View className="mt-4 rounded-[20px] border border-sg-border bg-sg-surface/86 px-4 py-4 dark:border-sgd-border dark:bg-sgd-surface/86">
                <Text className="text-[15px] font-bold text-sg-text dark:text-sgd-text">
                  Q{ques + 1}/{questions.length}
                </Text>
                <Text className="mt-2 text-[19px] font-bold leading-[26px] text-sg-text dark:text-sgd-text">
                  {decodeURIComponent(questions[ques].question)}
                </Text>
              </View>

              <View className="mt-4">
                {options.map((opt, index) => (
                  <AnimatedActionCard
                    key={`${opt}-${index}`}
                    onPress={() => handlSelectedOption(opt)}
                    className="mb-3"
                  >
                    <View className="rounded-[18px] border border-sg-border bg-sg-surface/84 px-4 py-4 dark:border-sgd-border dark:bg-sgd-surface/84">
                      <Text className="text-[15px] font-semibold text-sg-text dark:text-sgd-text">
                        {decodeURIComponent(opt)}
                      </Text>
                    </View>
                  </AnimatedActionCard>
                ))}
              </View>

              <SGButton
                label={ques < questions.length - 1 ? "Skip" : "Show Results"}
                onPress={
                  ques < questions.length - 1
                    ? handleNextPress
                    : handleShowResult
                }
                className="mt-3"
              />
            </>
          ) : null}
        </SGCard>
      </Animated.View>
    </ScreenLayoutContainer>
  );
};

export default Mocktest;
