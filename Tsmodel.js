import { BackHandler, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Tsmodel = ({ navigation }) => {

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

                <Text style={{ fontSize: 25, textAlign: 'center', color: '#D82148' }}> MODEL PAPERS</Text>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('telugu testpapersTS')}>
                        <Text style={{ fontSize: 20 }}> TELUGU</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('hindi testpapersTS')}>
                        <Text style={{ fontSize: 20 }}> HINDI</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('english testpapersTS')}>
                        <Text style={{ fontSize: 20 }}> ENGLISH</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('maths em testpapersTS')}>
                        <Text style={{ fontSize: 20 }}> MATHAMATICS-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('maths tm testpapersTS')}>
                        <Text style={{ fontSize: 20 }}> MATHAMATICS-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('physics em testpapersTS')}>
                        <Text style={{ fontSize: 20 }}> PS-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('physics tm testpapersTS')}>
                        <Text style={{ fontSize: 20 }}> PS-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('ns em testpapersTS')}>
                        <Text style={{ fontSize: 20 }}> NS-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('ns tm testpapersTS')}>
                        <Text style={{ fontSize: 20 }}> NS-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('social tm testpapersTS')}>
                        <Text style={{ fontSize: 20 }}> SOCIAL-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('social em testpapersTS')}>
                        <Text style={{ fontSize: 20 }}> SOCIAL-EM</Text>
                    </TouchableOpacity>
                </Card>

            </ScrollView>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Tsmodel;
