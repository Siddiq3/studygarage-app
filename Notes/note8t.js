import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Note8t = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getQuiz = async () => {
        setIsLoading(true);
        const url1 = 'https://siddiq3.github.io/Api/notes8.json';
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
                {renderCard('n8t1', 'n8t1')}
                {renderCard('n8t2', 'n8t2')}
                {renderCard('n8t3', 'n8t3')}
                {renderCard('n8t4', 'n8t4')}
                {renderCard('n8t5', 'n8t5')}
                {renderCard('n8t6', 'n8t6')}
                {renderCard('n8t7', 'n8t7')}
                {renderCard('n8t8', 'n8t8')}
                {renderCard('n8t9', 'n8t9')}
                {renderCard('n8t10', 'n8t10')}
                {renderCard('n8t11', 'n8t11')}
                {renderCard('n8t12', 'n8t12')}
                {renderCard('n8t13', 'n8t13')}
                {renderCard('n8t14', 'n8t14')}
                {renderCard('n8t15', 'n8t15')}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Note8t;
