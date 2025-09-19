import { BackHandler, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards"; // Import Card properly

const Iiit = ({ navigation }) => {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack(); // Navigate back when back button is pressed
            return true; // Prevent default behavior
        });

        // Cleanup on unmount
        return () => backHandler.remove();
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>

                <Card style={{ padding: 5, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('syllabus')}>
                        <Text style={{ textAlign: 'center', fontSize: 20 }}>IIIT SYLLABUS</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 5, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('im')}>
                        <Text style={{ textAlign: 'center', fontSize: 20 }}>IIIT MATHEMATICS</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 5, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('ip')}>
                        <Text style={{ textAlign: 'center', fontSize: 20 }}>IIIT PHYSICS</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 5, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('ib')}>
                        <Text style={{ textAlign: 'center', fontSize: 20 }}>IIIT BIOLOGY</Text>
                    </TouchableOpacity>
                </Card>

            </ScrollView>
        </View>
    );
}

export default Iiit;
