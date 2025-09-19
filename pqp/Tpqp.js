import { BackHandler, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Tpop = ({ navigation }) => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack();
            return true;
        });
        return () => backHandler.remove();
    }, [navigation]);

    const papers = [
        { label: '2022 Public paper', route: 'Telugu 2022' },
        { label: '2022-Prefinal paper', route: 'Telugu 2022p' },
        { label: 'Model Paper 2023', route: 'Telugu 2023' },
        { label: 'Blue Print for 100 marks', route: 'Telugu Blueprint' },
        { label: '2019-public paper-1', route: 'Telugu 2019p1' },
        { label: '2019-public paper-2', route: 'Telugu 2019p2' },
        { label: '2018-public paper-1', route: 'Telugu 2018p1' },
        { label: '2018-public paper-2', route: 'Telugu 2018p2' },
        { label: '2017-public paper-1', route: 'Telugu 2017p1' },
        { label: '2017-public paper-2', route: 'Telugu 2017p2' },
        { label: '2016-public paper-1', route: 'Telugu 2016p1' },
        { label: '2016-public paper-2', route: 'Telugu 2016p2' },
        { label: '2015-public paper-1', route: 'Telugu 2015p1' },
        { label: '2015-public paper-2', route: 'Telugu 2015p2' },
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

export default Tpop;
