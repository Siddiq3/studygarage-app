import { BackHandler, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Nepop = ({ navigation }) => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack();
            return true;
        });

        return () => backHandler.remove();
    }, [navigation]);

    const papers = [
        { label: '2022 Public paper', route: 'BiologyEM 2022' },
        { label: '2022-Prefinal paper', route: 'BiologyEM 2022p' },
        { label: 'Model Paper 2023', route: 'BiologyEM 2023' },
        { label: 'Blue Print for 100 marks', route: 'ScienceEM1 Blueprint' },
        { label: '2019-public paper', route: 'BiologyEM 2019p' },
        { label: '2018-public paper', route: 'BiologyEM 2018p' },
        { label: '2017-public paper', route: 'BiologyEM 2017p' },
        { label: '2016-public paper', route: 'BiologyEM 2016p' },
        { label: '2015-public paper', route: 'BiologyEM 2015p' },
    ];

    return (
        <View style={styles.container}>
            <ScrollView>
                {papers.map((paper, index) => (
                    <Card key={index} style={styles.card}>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate(paper.route)}>
                            <Text style={styles.text}>{paper.label}</Text>
                        </TouchableWithoutFeedback>
                    </Card>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE3E1',
    },
    card: {
        padding: 30,
        margin: 20,
        backgroundColor: '#9FC8D1',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    },
});

export default Nepop;
