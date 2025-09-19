import { BackHandler, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Tsimp = ({ navigation }) => {

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
                <Text style={{ fontSize: 30, textAlign: 'center', color: '#D82148' }}>
                    Importent And gun Shot Questions...
                </Text>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Telugu ImpTs')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>TELUGU IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Hindi ImpTs')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>HINDI IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('English ImpTs')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>ENGLISH IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Mathstm ImpTs')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>MATHS TM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Mathsem ImpTs')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>MATHS-EM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Physicstm ImpTs')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>PS-TM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Physicsem ImpTs')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>PS-EM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Biologytm ImpTs')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>Biology-TM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Biologyem ImpTs')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>Biology-EM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Socialem ImpTs')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>Social-EM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Socialtm ImpTs')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>Social-TM IMP QUES</Text>
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

export default Tsimp;
