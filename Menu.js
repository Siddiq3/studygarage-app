import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";

const Menu = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getQuiz = async () => {
        setIsLoading(true);
        const url1 = 'https://siddiq3.github.io/Api/Cardapi.json';
        const res = await fetch(url1);
        const data = await res.json();

        setQuestions(data.results[0]);
        setIsLoading(false);
    };

    useEffect(() => {
        getQuiz();
    }, []);

    return (
        <ScrollView style={styles.container}>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Importent1')}>
                {isLoading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <Text style={styles.buttonText}>{decodeURIComponent(questions.impq)}</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('sliptest1')}>
                {isLoading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <Text style={styles.buttonText}>{decodeURIComponent(questions.slip)}</Text>
                )}
            </TouchableOpacity>



            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Prev Papers1')}>
                {isLoading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <Text style={styles.buttonText}>{decodeURIComponent(questions.prevpapers)}</Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ssc1')}>
                {isLoading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <Text style={styles.buttonText}>{decodeURIComponent(questions.ssc)}</Text>
                )}
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('testpapers1')}>
                {isLoading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <Text style={styles.buttonText}>{decodeURIComponent(questions.modelpapers)}</Text>
                )}
            </TouchableOpacity>




            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('apblueprint1')}>
                {isLoading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <Text style={styles.buttonText}>{decodeURIComponent(questions.apblue)}</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('sliptest1')}>
                {isLoading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <Text style={styles.buttonText}>{decodeURIComponent(questions.sliptest)}</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('weeklytest1')}>
                {isLoading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <Text style={styles.buttonText}>{decodeURIComponent(questions.weeklytest)}</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('grandtest1')}>
                {isLoading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <Text style={styles.buttonText}>{decodeURIComponent(questions.grandtest)}</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('mini1')}>
                {isLoading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <Text style={styles.buttonText}>{decodeURIComponent(questions.mini)}</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('FA11')}>
                {isLoading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <Text style={styles.buttonText}>{decodeURIComponent(questions.fa1)}</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('FA21')}>
                {isLoading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <Text style={styles.buttonText}>{decodeURIComponent(questions.fa2)}</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('FA31')}>
                {isLoading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <Text style={styles.buttonText}>{decodeURIComponent(questions.fa3)}</Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('FA41')}>
                {isLoading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <Text style={styles.buttonText}>{decodeURIComponent(questions.fa4)}</Text>
                )}
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('SA11')}>
                {isLoading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <Text style={styles.buttonText}>{decodeURIComponent(questions.sa1)}</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('rivision1')}>
                {isLoading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <Text style={styles.buttonText}>{decodeURIComponent(questions.revision)}</Text>
                )}
            </TouchableOpacity>



            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('prefinal1')}>
                {isLoading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <Text style={styles.buttonText}>{decodeURIComponent(questions.prefinal)}</Text>
                )}
            </TouchableOpacity>




            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Textbook1')}>
                {isLoading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <Text style={styles.buttonText}>{decodeURIComponent(questions.textbook)}</Text>
                )}
            </TouchableOpacity>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#000000',
        padding: 10,
    },
    button: {
        width: '100%',
        height: 65,
        backgroundColor: '#ADA2FF',
        marginVertical: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#000000',
    },
    loadingText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#ffffff',
    },
});

export default Menu;
