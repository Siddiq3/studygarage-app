import { BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import MrecAdComponent from "../MrecAdComponent";


const Tspoly = ({ navigation }) => {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack();
            return true;
        });

        return () => backHandler.remove();
    }, [navigation]);

    const papers = [
        { year: 2022, screen: 'poly2022t' },
        { year: 2021, screen: 'poly2021t' },
        { year: 2020, screen: 'poly2020t' },
        { year: 2019, screen: 'poly2019t' },
        { year: 2018, screen: 'poly2018t' },
        { year: 2017, screen: 'poly2017t' },
        { year: 2016, screen: 'poly2016t' },
    ];

    return (
        <View style={styles.container}>
            <ScrollView>
                {papers.map((paper) => (
                    <Card key={paper.year} style={styles.card}>
                        <TouchableOpacity onPress={() => navigation.navigate(paper.screen)}>
                            <Text style={styles.cardText}>{paper.year} PAPERS</Text>
                        </TouchableOpacity>
                    </Card>
                ))}
            </ScrollView>
            <MrecAdComponent/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffafbd',
        paddingTop: 10,
    },
    card: {
        padding: 30,
        margin: 20,
    },
    cardText: {
        fontSize: 20,
    },
});

export default Tspoly;
