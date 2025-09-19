import { BackHandler, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Rvtest1 = ({ navigation }) => {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack();
            return true;
        });

        return () => backHandler.remove();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={{ fontSize: 25, textAlign: 'center', color: '#D82148' }}>
                    RIVISION TEST-1 PAPERS
                </Text>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('telugu rvtest1')}>
                        <Text style={{ fontSize: 20 }}>TELUGU</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('hindi rvtest1')}>
                        <Text style={{ fontSize: 20 }}>HINDI</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('english rvtest1')}>
                        <Text style={{ fontSize: 20 }}>ENGLISH</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('maths em rvtest1')}>
                        <Text style={{ fontSize: 20 }}>MATHAMATICS-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('maths tm rvtest1')}>
                        <Text style={{ fontSize: 20 }}>MATHAMATICS-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('physics em rvtest1')}>
                        <Text style={{ fontSize: 20 }}>PS &NS-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('physics tm rvtest1')}>
                        <Text style={{ fontSize: 20 }}>PS &NS -TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('social tm rvtest1')}>
                        <Text style={{ fontSize: 20 }}>SOCIAL-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('social em rvtest1')}>
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

    },

});

export default Rvtest1;
