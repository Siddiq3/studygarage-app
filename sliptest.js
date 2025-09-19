import { BackHandler, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState, useEffect } from "react";

const Sliptest = ({ navigation }) => {

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
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('telugu sliptest')}
                    >
                        <Text style={{ fontSize: 20 }}> TELUGU</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('hindi sliptest')}
                    >
                        <Text style={{ fontSize: 20 }}> HINDI</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('english sliptest')}
                    >
                        <Text style={{ fontSize: 20 }}> ENGLISH</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('maths em sliptest')}
                    >
                        <Text style={{ fontSize: 20 }}> MATHAMATICS-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('maths tm sliptest')}
                    >
                        <Text style={{ fontSize: 20 }}> MATHAMATICS-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('physics em sliptest')}
                    >
                        <Text style={{ fontSize: 20 }}> PS-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('physics tm sliptest')}
                    >
                        <Text style={{ fontSize: 20 }}> PS-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('ns em sliptest')}
                    >
                        <Text style={{ fontSize: 20 }}> NS-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('ns tm sliptest')}
                    >
                        <Text style={{ fontSize: 20 }}> NS -TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('social tm sliptest')}
                    >
                        <Text style={{ fontSize: 20 }}> SOCIAL-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('social em sliptest')}
                    >
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

export default Sliptest;
