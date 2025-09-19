import { BackHandler, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Socttpts = ({ navigation }) => {

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

                <Card style={{ padding: 25, margin: 15 }}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('socialtm ts tp1')}>
                        <Text style={{ fontSize: 20 }}>TestPaper-1</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 25, margin: 15 }}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('socialtm ts tp2')}>
                        <Text style={{ fontSize: 20 }}>TestPaper-2</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 25, margin: 15 }}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('socialtm ts tp3')}>
                        <Text style={{ fontSize: 20 }}>TestPaper-3</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 25, margin: 15 }}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('socialtm ts tp4')}>
                        <Text style={{ fontSize: 20 }}>TestPaper-4</Text>
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

export default Socttpts;
