import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from "react";
import { Card } from "react-native-shadow-cards";

const Physicst1 = ({ navigation }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true); // simulate loading
    }, []);

    if (!loaded) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const topics = [
        { id: 1, title: '1. ఉష్ణం', route: 'Pt1' },
        { id: 2, title: '2.ఆమ్లాలు-క్షారాలు-లవణాలు', route: 'Pt2' },
        { id: 3, title: '3.సమతల ఉపరితలాల వద్ద కాంతి వక్రీభవనం', route: 'Pt3' },
        { id: 4, title: '4.వక్రతలాల వద్ద కాంతి వక్రీభవనం', route: 'Pt4' },
        { id: 5, title: '5.మానవుని కన్ను-రంగుల ప్రపంచం', route: 'Pt5' },
        { id: 6, title: '6.పరమాణు నిర్మాణం', route: 'Pt6' },
        { id: 7, title: '7.మూలకాల వర్గీకరణ – ఆవర్తన పట్టిక', route: 'Pt7' },
        { id: 8, title: '8.రసాయన బంధం', route: 'Pt8' },
        { id: 9, title: '9. విద్యుత్ ప్రవాహం', route: 'Pt9' },
        { id: 10, title: '10. విద్యుదయస్కాంతత్వం', route: 'Pt10' },
        { id: 11, title: '11. లోహ సంగ్రహణ శాస్త్రం', route: 'Pt11' },
        { id: 12, title: '12.కార్బన్– దాని సమ్మేళనాలు', route: 'Pt12' },
    ];

    return (
        <View style={styles.container}>
            <ScrollView>
                {topics.map(topic => (
                    <Card key={topic.id} style={styles.card}>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate(topic.route)}>
                            <Text style={styles.text}>{topic.title}</Text>
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
        backgroundColor: '#F7F3E9',
    },
    card: {
        padding: 30,
        margin: 20,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    },
});

export default Physicst1;
