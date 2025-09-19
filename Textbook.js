import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Textbook = ({ navigation }) => {


    return (
        <View style={styles.container}>
            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('telugu textbook')}>
                        <Text style={{ fontSize: 20 }}>TELUGU</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('hindi textbook')}>
                        <Text style={{ fontSize: 20 }}>HINDI</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('english textbook')}>
                        <Text style={{ fontSize: 20 }}>ENGLISH</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('maths em textbook')}>
                        <Text style={{ fontSize: 20 }}>MATHAMATICS-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('maths tm textbook')}>
                        <Text style={{ fontSize: 20 }}>MATHAMATICS-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('biology em textbook')}>
                        <Text style={{ fontSize: 20 }}>BIOLOGY-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('biology tm textbook')}>
                        <Text style={{ fontSize: 20 }}>BIOLOGY-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('physics em textbook')}>
                        <Text style={{ fontSize: 20 }}>PHYSCICAL SCIENCE-EM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('physics tm textbook')}>
                        <Text style={{ fontSize: 20 }}>PHYSCICAL SCIENCE-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('social tm textbook')}>
                        <Text style={{ fontSize: 20 }}>SOCIAL-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('social em textbook')}>
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

export default Textbook;
