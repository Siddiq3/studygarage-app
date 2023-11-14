// QuizContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    // Step 1: Initialize totalScore state with AsyncStorage data or 0
    const [totalScore, setTotalScore] = useState(0);

    // Step 2: Load totalScore from AsyncStorage on component mount
    useEffect(() => {
        const loadTotalScore = async () => {
            try {
                const storedScore = await AsyncStorage.getItem('totalScore');
                if (storedScore !== null) {
                    setTotalScore(parseInt(storedScore, 10));
                }
            } catch (error) {
                console.error('Error loading total score from AsyncStorage:', error);
            }
        };

        loadTotalScore();
    }, []);

    // Step 3: Update totalScore and store in AsyncStorage
    const updateTotalScore = (score) => {
        const newTotalScore = totalScore + score;
        setTotalScore(newTotalScore);

        try {
            AsyncStorage.setItem('totalScore', newTotalScore.toString());
        } catch (error) {
            console.error('Error saving total score to AsyncStorage:', error);
        }
    };

    // Step 4: Provide the totalScore and updateTotalScore in context
    return (
        <QuizContext.Provider value={{ totalScore, updateTotalScore }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuizContext = () => useContext(QuizContext);
