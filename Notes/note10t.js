import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Note10t = ({ navigation }) => {
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
            <ScrollView>
                {renderCard('n10t1', 'n10t1')}
                {renderCard('n10t2', 'n10t2')}
                {renderCard('n10t3', 'n10t3')}
                {renderCard('n10t4', 'n10t4')}
                {renderCard('n10t5', 'n10t5')}
                {renderCard('n10t6', 'n10t6')}
                {renderCard('n10t7', 'n10t7')}
                {renderCard('n10t8', 'n10t8')}
                {renderCard('n10t9', 'n10t9')}
                {renderCard('n10t10', 'n10t10')}
                {renderCard('n10t11', 'n10t11')}
                {renderCard('n10t12', 'n10t12')}
                {renderCard('n10t13', 'n10t13')}
                {renderCard('n10t14', 'n10t14')}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Note10t;
