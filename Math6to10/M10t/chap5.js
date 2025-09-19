import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Linking } from 'react-native';
import React, { useState, useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Chap5t10 = ({ navigation }) => {

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
                        onPress={() => { Linking.openURL(`${questions.chap5_1t10u}`) }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.chap5_1t10)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1}
                        onPress={() => { Linking.openURL(`${questions.chap5_2t10u}`) }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.chap5_2t10)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1}
                        onPress={() => { Linking.openURL(`${questions.chap5_3t10u}`) }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.chap5_3t10)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1}
                        onPress={() => { Linking.openURL(`${questions.chap5_4t10u}`) }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.chap5_4t10)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1}
                        onPress={() => { Linking.openURL(`${questions.chap5_5t10u}`) }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.chap5_5t10)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1}
                        onPress={() => { Linking.openURL(`${questions.chap5_ex1t10u}`) }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.chap5_ex1t10)}</Text>}
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1}
                        onPress={() => { Linking.openURL(`${questions.chap5_ex2t10u}`) }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500' }}>Loading...</Text> :
                            <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center' }}>{decodeURIComponent(questions.chap5_ex2t10)}</Text>}
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

export default Chap5t10;
