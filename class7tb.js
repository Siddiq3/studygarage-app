import { BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from "react";

import { Card } from "react-native-shadow-cards";

const Class7tb = ({ navigation }) => {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getQuiz = async () => {
        setIsLoading(true);
        try {
            const url1 = 'https://siddiq3.github.io/Api/subject.json';
            const res = await fetch(url1);
            const data = await res.json();
            setQuestions(data.results[0]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

useEffect(() => {
    getQuiz();

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.goBack(); // Navigate back when back button is pressed
        return true; // Prevent default behavior
    });

    // ✅ Correct cleanup
    return () => backHandler.remove();
}, []);


    return (
        <View style={styles.container}>
            <ScrollView>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('telugu tb7')}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.ttb7)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('hindi tb7')}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.htb7)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('english tb7')}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.etb7)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('mathstm tb7')}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.mttb7)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('mathsem tb7')}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.metb7)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('nstm tb7')}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.nttb7)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('nsem tb7')}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.netb7)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('socialtm tb7')}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.sttb7)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('socialem tb7')}
                    >
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.setb7)}</Text>}
                    </TouchableOpacity>
                </Card>

            </ScrollView>
        </View>
    );
}


export default Class7tb;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

