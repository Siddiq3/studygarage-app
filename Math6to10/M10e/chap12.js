import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Linking } from 'react-native';
import React, { useState, useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Chap12e10 = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getQuiz = async () => {
        setIsLoading(true);
        const url = 'https://siddiq3.github.io/Api/notes10.json';
        const res = await fetch(url);
        const data = await res.json();
        setQuestions(data.results[0]);
        setIsLoading(false);
    };

    useEffect(() => {
        getQuiz();
    }, []);

    const renderCard = (textKey, urlKey) => (
        <Card style={{ padding: 10, margin: 15 }}>
            <TouchableOpacity
                style={{ padding: 10, margin: 15 }}
                activeOpacity={1}
                onPress={() => { Linking.openURL(`${questions[urlKey]}`) }}
            >
                {isLoading ? (
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text>
                ) : (
                    questions && (
                        <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>
                            {decodeURIComponent(questions[textKey])}
                        </Text>
                    )
                )}
            </TouchableOpacity>
        </Card>
    );

    return (
        <View style={styles.container}>
            <ScrollView horizontal={false}>
                {renderCard('chap12_1e10', 'chap12_1e10u')}
                {renderCard('chap12_2e10', 'chap12_2e10u')}
                {renderCard('chap12_3e10', 'chap12_3e10u')}
                {renderCard('chap12_4e10', 'chap12_4e10u')}
                {renderCard('chap12_5e10', 'chap12_5e10u')}
                {renderCard('chap12_ex1e10', 'chap12_ex1e10u')}
                {renderCard('chap12_ex2e10', 'chap12_ex2e10u')}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Chap12e10;
