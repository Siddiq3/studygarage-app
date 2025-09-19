import { BackHandler, StyleSheet, Text, TouchableOpacity, View,ScrollView} from 'react-native';
import React, { useEffect, useState } from "react";
import { Card } from "react-native-shadow-cards";

const Quiz = ({ navigation }) => {
      useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack(); // Navigate back when back button is pressed
            return true; // Prevent default behavior
        });

        // ✅ proper cleanup
        return () => backHandler.remove();
    }, []);
    return (

        <View style={styles.container}>
            <ScrollView>

                <Card style={{ padding: 5, margin: 20 }}>
                    <TouchableOpacity color='#5F939A' title='BIOLOGY-TM' activeOpacity={1} onPress={() =>
                        navigation.navigate('Biology tmq')}
                    >
                        <Text style={{ fontSize: 25, textAlign: 'center' }}> BIOLOGY-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 5, margin: 20 }}>
                    <TouchableOpacity color='#5F939A' title='PHYSICAL SCIENCE-TM' activeOpacity={1} onPress={() =>
                        navigation.navigate('Physics tmq')}
                    >
                        <Text style={{ fontSize: 25, textAlign: 'center' }}> PHYSCICAL SCIENCE-TM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 5, margin: 20 }}>
                    <TouchableOpacity color='#5F939A' title='PHYSICAL SCIENCE-TM' activeOpacity={1} onPress={() =>
                        navigation.navigate('Physics emq')}
                    >
                        <Text style={{ fontSize: 25, textAlign: 'center' }}> PHYSCICAL SCIENCE-EM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 5, margin: 20 }}>
                    <TouchableOpacity color='#5F939A' title='SOCIAL-TM' activeOpacity={1} onPress={() =>
                        navigation.navigate('Social tmq')}
                    >
                        <Text style={{ fontSize: 25, textAlign: 'center' }}> SOCIAL-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Text style={{ fontSize: 25, textAlign: 'center', color: '#D82148' }}>      Reaming subhects uploaded soon...</Text>

            </ScrollView>

            </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bdfff3'

    }

});

export default Quiz;
