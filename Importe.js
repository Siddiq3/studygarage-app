import { BackHandler, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Importe = ({ navigation }) => {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack(); // Navigate back when back button is pressed
            return true; // Prevent default behavior

        return () => backHandler.remove();
    
    });
    return () => backHandler.remove();}, [navigation]);

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={{ fontSize: 30, textAlign: 'center', color: '#D82148', marginVertical: 20 }}>
                    Importent And Gun Shot Questions...
                </Text>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Telugu Imp')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>TELUGU IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Hindi Imp')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>HINDI IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('English Imp')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>ENGLISH IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Mathstm Imp')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>MATHS TM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Mathsem Imp')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>MATHS EM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Physicstm Imp')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>PS TM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Physicsem Imp')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>PS EM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Biologytm Imp')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>BIOLOGY TM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Biologyem Imp')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>BIOLOGY EM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Socialem Imp')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>SOCIAL EM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Socialtm Imp')}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>SOCIAL TM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

            </ScrollView>
        </View>
    );
}


export default Importe;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    });

