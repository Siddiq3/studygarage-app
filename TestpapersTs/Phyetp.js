import { BackHandler, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Phyetpts = ({ navigation }) => {

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

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('phyem ts tp1')}>
                        <Text style={{ fontSize: 20 }}> TestPaper-1</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('phyem ts tp2')}>
                        <Text style={{ fontSize: 20 }}> TestPaper-2</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('phyem ts tp3')}>
                        <Text style={{ fontSize: 20 }}> TestPaper-3</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('phyem ts tp4')}>
                        <Text style={{ fontSize: 20 }}> TestPaper-4</Text>
                    </TouchableWithoutFeedback>
                </Card>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Phyetpts;
