import { BackHandler, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Videos = ({ navigation }) => {

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
                <Text style={{ fontSize: 25, textAlign: 'center', color: '#D82148' }}>
                    Chapter Wise Video Explanation
                </Text>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Telugu')}>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}>TELUGU</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Hindi')}>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}>HINDI</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('English')}>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}>ENGLISH</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Maths em')}>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}>MATHAMATICS-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Maths tm')}>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}>MATHAMATICS-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Biology em')}>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}>BIOLOGY-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Biology tm')}>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}>BIOLOGY-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Physics em')}>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}>PHYSCICAL SCIENCE-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Physics tm')}>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}>PHYSCICAL SCIENCE-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Social tm')}>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}>SOCIAL-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Social em')}>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}>SOCIAL-EM</Text>
                    </TouchableOpacity>
                </Card>

            </ScrollView>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cbb4d4'
    },
});

export default Videos;
