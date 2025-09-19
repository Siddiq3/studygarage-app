import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, {  useState } from 'react';

import Title from './Title';

const Mtres = ({ navigation, route }) => {

    const { score } = route.params;

    const resultBanner =
        score >= 60
            ? "https://cdni.iconscout.com/illustration/premium/thumb/men-celebrating-victory-4587301-3856211.png"
            : "https://cdni.iconscout.com/illustration/free/thumb/concept-about-business-failure-1862195-1580189.png";

    return (
        <View style={styles.container}>
            <Title titleText='RESULTS' />
            <Text style={styles.scoreValue}>{score}</Text>
            <Image
                source={{ uri: resultBanner }}
                style={{ height: 300, width: 300, alignSelf: 'center' }}
                resizeMode="contain"
            />
            <TouchableOpacity
                onPress={() => navigation.navigate('Ap10th class')}
                style={styles.button}
            >
                <Text style={styles.buttonText}>GO TO HOME</Text>
            </TouchableOpacity>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingHorizontal: 20,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        backgroundColor: '#1A759F',
        padding: 20,
        borderRadius: 22,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ED4264',
        textAlign: 'center',
    },
    scoreValue: {
        fontSize: 24,
        fontWeight: '800',
        alignSelf: 'center',
        marginVertical: 20,
    },
    });

export default Mtres;
