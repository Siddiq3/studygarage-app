import { BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import MrecAdComponent from "./MrecAdComponent";


const Rvtest4 = ({ navigation }) => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack(); // Navigate back when back button is pressed
            return true; // Prevent default behavior
        });

        return () => backHandler.remove();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={{ fontSize: 25, textAlign: 'center', color: '#D82148' }}>
                    RIVISION TEST-4 PAPERS
                </Text>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('telugu rvtest4')}>
                        <Text style={{ fontSize: 20 }}> TELUGU</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('hindi rvtest4')}>
                        <Text style={{ fontSize: 20 }}> HINDI</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('english rvtest4')}>
                        <Text style={{ fontSize: 20 }}> ENGLISH</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('maths em rvtest4')}>
                        <Text style={{ fontSize: 20 }}> MATHAMATICS-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('maths tm rvtest4')}>
                        <Text style={{ fontSize: 20 }}> MATHAMATICS-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('physics em rvtest4')}>
                        <Text style={{ fontSize: 20 }}> PS &NS-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('physics tm rvtest4')}>
                        <Text style={{ fontSize: 20 }}> PS &NS -TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('social tm rvtest4')}>
                        <Text style={{ fontSize: 20 }}> SOCIAL-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('social em rvtest4')}>
                        <Text style={{ fontSize: 20 }}> SOCIAL-EM</Text>
                    </TouchableOpacity>
                </Card>
                      <MrecAdComponent />

            </ScrollView>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Rvtest4;
