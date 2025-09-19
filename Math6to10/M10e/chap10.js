import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Linking } from 'react-native';
import React, { useState, useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Chap10e10 = ({ navigation }) => {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getQuiz = async () => {
        setIsLoading(true);
        const url1 = 'https://siddiq3.github.io/Api/notes10.json';
        const res = await fetch(url1);
        const data = await res.json();

        setQuestions(data.results[0]);
        setIsLoading(false);
    };

    useEffect(() => {
        getQuiz();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView horizontal={false}>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1}
                        onPress={() => { Linking.openURL(`${questions.chap10_1e10u}`) }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.chap10_1e10)}</Text>)}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1}
                        onPress={() => { Linking.openURL(`${questions.chap10_2e10u}`) }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.chap10_2e10)}</Text>)}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1}
                        onPress={() => { Linking.openURL(`${questions.chap10_3e10u}`) }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.chap10_3e10)}</Text>)}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1}
                        onPress={() => { Linking.openURL(`${questions.chap10_4e10u}`) }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.chap10_4e10)}</Text>)}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1}
                        onPress={() => { Linking.openURL(`${questions.chap10_5e10u}`) }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.chap10_5e10)}</Text>)}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1}
                        onPress={() => { Linking.openURL(`${questions.chap10_ex1e10u}`) }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.chap10_ex1e10)}</Text>)}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1}
                        onPress={() => { Linking.openURL(`${questions.chap10_ex2e10u}`) }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.chap10_ex2e10)}</Text>)}
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

export default Chap10e10;
