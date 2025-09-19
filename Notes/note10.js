import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Note10 = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getQuiz = async () => {
        setIsLoading(true);
        const url1 = 'https://siddiq3.github.io/Api/notes10.json';
        const res = await fetch(url1);
        const data = await res.json();
        setQuestions(data.results[0]);
        setIsLoading(false);
    };

    useEffect(() => {
        getQuiz();
    }, []);

    const renderCard = (key, nav) => (
        <Card style={{ padding: 10, margin: 15 }} key={key}>
            <TouchableOpacity
                style={{ padding: 10, margin: 15 }}
                activeOpacity={1}
                onPress={() => navigation.navigate(nav)}
            >
                {isLoading ? (
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text>
                ) : (
                    questions && (
                        <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>
                            {decodeURIComponent(questions[key])}
                        </Text>
                    )
                )}
            </TouchableOpacity>
        </Card>
    );

    return (
        <View style={styles.container}>
            <ScrollView horizontal={false}>
                {renderCard('n10e1', 'n10e1')}
                {renderCard('n10e2', 'n10e2')}
                {renderCard('n10e3', 'n10e3')}
                {renderCard('n10e4', 'n10e4')}
                {renderCard('n10e5', 'n10e5')}
                {renderCard('n10e6', 'n10e6')}
                {renderCard('n10e7', 'n10e7')}
                {renderCard('n10e8', 'n10e8')}
                {renderCard('n10e9', 'n10e9')}
                {renderCard('n10e10', 'n10e10')}
                {renderCard('n10e11', 'n10e11')}
                {renderCard('n10e12', 'n10e12')}
                {renderCard('n10e13', 'n10e13')}
                {renderCard('n10e14', 'n10e14')}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Note10;
