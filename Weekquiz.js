import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ScreenLayoutContainer from './src/design-system/components/ScreenLayoutContainer';
import ScreenHeader from './src/design-system/components/ScreenHeader';
import SGButton from './src/design-system/components/SGButton';
import SGEmptyState from './src/design-system/components/SGEmptyState';
import QuizLoadingSkeleton from './src/components/quiz/QuizLoadingSkeleton';
import { useQuizContext } from "./QuizContext"; // Import the context hook

const WeekQues = ({ navigation }) => {
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const [questions, setQuestions] = useState([]);
    const [ques, setQues] = useState(0);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const getQuiz = async () => {
        setIsLoading(true);
        const url = 'https://siddiq3.github.io/Api/WeekQuizapi.json';
        try {
            const res = await fetch(url);
            const data = await res.json();
            setQuestions(data.results);
            setOptions(generateOptionsAndShuffle(data.results[0]));
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching quiz data:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getQuiz();
    
        return () => backHandler.remove();
    }, []);

    const generateOptionsAndShuffle = (_question) => {
        const options = [..._question.incorrect_answers];
        options.push(_question.correct_answer);
        shuffleArray(options);
        return options;
    };

    const handleNextPress = () => {
        if (questions && ques < questions.length - 1) {
            const nextQues = ques + 1;
            setQues(nextQues);
            setOptions(generateOptionsAndShuffle(questions[nextQues]));
        }
    };

    const handlSelectedOption = (_option) => {
        if (_option === questions[ques].correct_answer) {
            setScore(score + 10);
        }

        if (ques < questions.length - 1) {
            const nextQues = ques + 1;
            setQues(nextQues);
            setOptions(generateOptionsAndShuffle(questions[nextQues]));
        } else {
            handleShowResult();
        }
    };

    const handleShowResult = () => {
        navigation.navigate('Weekly Result', {
            score: score
        });
    };

    return (
        <ScreenLayoutContainer variant="board" contentClassName="px-4" scroll={false}>
            <ScreenHeader board eyebrow="Weekly test" title={questions.length ? `Question ${ques + 1}` : 'Weekly test'} subtitle={questions.length ? `of ${questions.length}` : undefined} className="mb-5" />
            {isLoading ? (
                <QuizLoadingSkeleton />
            ) : questions.length > 0 ? (
                <View className="flex-1">
                    <Text className="mb-5 text-[21px] leading-[29px] font-sg-semibold text-[#F4EFE2]">{decodeURIComponent(questions[ques].question)}</Text>
                    <View className="flex-1">
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handlSelectedOption(option)}
                                className="mb-2.5 min-h-[56px] justify-center rounded-[14px] border border-[#F4EFE2]/16 bg-[#1C4336] px-4 py-3"
                            >
                                <Text className="text-[16px] leading-[22px] font-sg-medium text-[#F4EFE2]">{decodeURIComponent(option)}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {ques !== questions.length - 1 ? (
                        <SGButton label="Skip" variant="boardGhost" onPress={handleNextPress} />
                    ) : (
                        <SGButton label="Show results" variant="board" onPress={handleShowResult} />
                    )}
                </View>
            ) : (
                <SGEmptyState board title="No questions available" subtitle="Please try again in a while." />
            )}
        </ScreenLayoutContainer>
    );
};

export default WeekQues;
