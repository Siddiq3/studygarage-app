import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Note9t = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getQuiz = async () => {
        setIsLoading(true);
        const url1 = 'https://siddiq3.github.io/Api/notes9.json';
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
                {renderCard('n9t1', 'n9t1')}
                {renderCard('n9t2', 'n9t2')}
                {renderCard('n9t3', 'n9t3')}
                {renderCard('n9t4', 'n9t4')}
                {renderCard('n9t5', 'n9t5')}
                {renderCard('n9t6', 'n9t6')}
                {renderCard('n9t7', 'n9t7')}
                {renderCard('n9t8', 'n9t8')}
                {renderCard('n9t9', 'n9t9')}
                {renderCard('n9t10', 'n9t10')}
                {renderCard('n9t11', 'n9t11')}
                {renderCard('n9t12', 'n9t12')}
                {renderCard('n9t13', 'n9t13')}
                {renderCard('n9t14', 'n9t14')}
                {renderCard('n9t15', 'n9t15')}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Note9t;
