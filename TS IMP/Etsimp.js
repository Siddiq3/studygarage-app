import { Text, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import MrecAdComponent from "../MrecAdComponent";


const Etsimp = () => {
    const [questions, setQuestions] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getQuiz = async () => {
        try {
            const url1 = 'https://siddiq3.github.io/Api/blueprint.json';
            const res = await fetch(url1);
            const data = await res.json();
            setQuestions(data.results[0]);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getQuiz();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            {questions && (
                <WebView
                    source={{ uri: questions.Etsimp }}
                    style={{ flex: 1 }}
                />
            )}
            <MrecAdComponent/>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 24,
        fontWeight: '500',
    },
});

export default Etsimp;
