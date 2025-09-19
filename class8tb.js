import React, { useState, useEffect } from "react";
import { BackHandler, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Card } from "react-native-shadow-cards";

const Class8tb = ({ navigation }) => {

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
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('telugu tb8')}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.ttb8)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('hindi tb8')}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.htb8)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('english tb8')}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.etb8)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('mathstm tb8')}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.mttb8)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('mathsem tb8')}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.metb8)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('nstm tb8')}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.nttb8)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('nsem tb8')}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.netb8)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('pstm tb8')}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.pttb8)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('psem tb8')}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.petb8)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('socialtm tb8')}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.sttb8)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('socialem tb8')}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.setb8)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('social3m tb8')}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.s3tb8)}</Text>}
                    </TouchableOpacity>
                </Card>

            </ScrollView>
        </View>
    );
}


export default Class8tb;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

