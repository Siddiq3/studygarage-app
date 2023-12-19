



////////////////////////////////////////////////////////////////////////////////////////////////

import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [totalScore, setTotalScore] = useState(50);
    const [updatingTotalScore, setUpdatingTotalScore] = useState(false);

    useEffect(() => {
        // Load the total score from AsyncStorage when the context provider mounts
        loadTotalScore();
    }, []);

    const loadTotalScore = async () => {
        try {
            const storedTotalScore = await AsyncStorage.getItem('totalScore');
            if (storedTotalScore !== null) {
                setTotalScore(parseInt(storedTotalScore, 10));
            }
        } catch (error) {
            console.error('Error loading total score:', error);
        }
    };




    /*const updateTotalScore = async (score) => {
        try {
            setUpdatingTotalScore(true);

            // Add the provided score to the total score
            const newTotalScore = totalScore + score;

            // Check if the user has reached a total score of 1000 for withdrawal
            if (newTotalScore >= 1000) {
                // Perform the withdrawal logic (deduct 10)
                const withdrawalAmount = 1000;
                console.log(`Withdrawal successful! Amount: ${withdrawalAmount}`);
                // Deduct the withdrawal amount from the total score
                const remainingScore = newTotalScore - withdrawalAmount;
                // Save the updated total score to AsyncStorage
                await AsyncStorage.setItem('totalScore', remainingScore.toString());
                // Update the state to reflect the change
                setTotalScore(remainingScore);
            } else {
                // Save the updated total score to AsyncStorage
                await AsyncStorage.setItem('totalScore', newTotalScore.toString());
                // Update the state to reflect the change
                setTotalScore(newTotalScore);
            }
        } catch (error) {
            console.error('Error updating total score:', error);
        } finally {
            setUpdatingTotalScore(false);
        }
    }; */
    const updateTotalScore = async (score) => {
        try {
            setUpdatingTotalScore(true);

            // Use the callback function to correctly update the state based on the previous state
            setTotalScore((prevTotalScore) => {
                const newTotalScore = prevTotalScore + score;

                if (newTotalScore >= 1000) {
                    const withdrawalAmount = 1000;
                    console.log(`Withdrawal successful! Amount: ${withdrawalAmount}`);
                    const remainingScore = newTotalScore - withdrawalAmount;

                    // Save the updated total score to AsyncStorage
                    AsyncStorage.setItem('totalScore', remainingScore.toString());

                    return remainingScore;
                } else {
                    // Save the updated total score to AsyncStorage
                    AsyncStorage.setItem('totalScore', newTotalScore.toString());

                    return newTotalScore;
                }
            });
        } catch (error) {
            console.error('Error updating total score:', error);
        } finally {
            setUpdatingTotalScore(false);
        }
    };

    return (
        <QuizContext.Provider value={{ totalScore, updateTotalScore }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuizContext = () => {
    return useContext(QuizContext);
};

