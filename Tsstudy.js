import { BackHandler, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Tsstudy = ({ navigation }) => {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack(); // Navigate back when back button is pressed
            return true; // Prevent default behavior
        });

        return () => backHandler.remove();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('telugu tsm')}>
                        <Text style={{ fontSize: 20 }}>TELUGU</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('hindi tsm')}>
                        <Text style={{ fontSize: 20 }}>HINDI</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('english tsm')}>
                        <Text style={{ fontSize: 20 }}>ENGLISH</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('maths em tsm')}>
                        <Text style={{ fontSize: 20 }}>MATHAMATICS-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('maths tm tsm')}>
                        <Text style={{ fontSize: 20 }}>MATHAMATICS-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('biology em tsm')}>
                        <Text style={{ fontSize: 20 }}>BIOLOGY-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('biology tm tsm')}>
                        <Text style={{ fontSize: 20 }}>BIOLOGY-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('physics em tsm')}>
                        <Text style={{ fontSize: 20 }}>PHYSCICAL SCIENCE-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('physics tm tsm')}>
                        <Text style={{ fontSize: 20 }}>PHYSCICAL SCIENCE-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('social tm tsm')}>
                        <Text style={{ fontSize: 20 }}>SOCIAL-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('social em tsm')}>
                        <Text style={{ fontSize: 20 }}>SOCIAL-EM</Text>
                    </TouchableOpacity>
                </Card>

            </ScrollView>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffafbd'
    },
});

export default Tsstudy;
