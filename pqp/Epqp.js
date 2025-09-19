import { BackHandler, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Epop = ({ navigation }) => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack();
            return true;
        });

        return () => backHandler.remove();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ScrollView>

                <Card style={styles.card}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('English 2022')}>
                        <Text style={styles.text}>2022 Public paper</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={styles.card}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('English 2022p')}>
                        <Text style={styles.text}>2022-Prefinal paper</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={styles.card}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('English 2023')}>
                        <Text style={styles.text}>Model Paper 2023</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={styles.card}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('English Blueprint')}>
                        <Text style={styles.text}>Blue Print for 100 marks</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={styles.card}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('English 2019p1')}>
                        <Text style={styles.text}>2019 Public paper - 1</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={styles.card}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('English 2019p2')}>
                        <Text style={styles.text}>2019 Public paper - 2</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={styles.card}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('English 2018p1')}>
                        <Text style={styles.text}>2018 Public paper - 1</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={styles.card}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('English 2018p2')}>
                        <Text style={styles.text}>2018 Public paper - 2</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={styles.card}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('English 2017p1')}>
                        <Text style={styles.text}>2017 Public paper - 1</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={styles.card}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('English 2017p2')}>
                        <Text style={styles.text}>2017 Public paper - 2</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={styles.card}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('English 2016p1')}>
                        <Text style={styles.text}>2016 Public paper - 1</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={styles.card}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('English 2016p2')}>
                        <Text style={styles.text}>2016 Public paper - 2</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={styles.card}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('English 2015p1')}>
                        <Text style={styles.text}>2015 Public paper - 1</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={styles.card}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('English 2015p2')}>
                        <Text style={styles.text}>2015 Public paper - 2</Text>
                    </TouchableWithoutFeedback>
                </Card>

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

export default Epop;
