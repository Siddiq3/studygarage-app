import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking } from "react-native";
import { Card } from "react-native-shadow-cards";





const News = ({ navigation }) => {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const getQuiz = async () => {
        setIsLoading(true)
        const url1 = 'https://siddiq3.github.io/Api/news.json';
        const res = await fetch(url1);
        const data = await res.json();

        setQuestions(data.results[0]);

        setIsLoading(false)

    };

    useEffect(() => {
        getQuiz();
    }, []);

    return (


        <View style={{ flex: 1, }}>
            <ScrollView>




                <View>
                    <Text style={{ fontSize: 30, marginTop: 10, color: '#ef233c' }}> LATEST UPDATES</Text>
                </View>


                <View >
                    <Card style={{ marginLeft: 5, color: '#772262', borderRadius: 20, height: 150, width: 400, marginTop: 25 }}>


                        <TouchableOpacity activeOpacity={1} style={{ marginTop: 20 }} onPress={() =>
                            Linking.openURL(`${questions.news1}`)}>
                            {isLoading ? <Text style={{ fontSize: 30, fontWeight: '500', color: '##ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', color: '##ffffff' }} >Q. {decodeURIComponent(questions.news1t)}?</Text>)}
                        </TouchableOpacity>

                    </Card>

                    <Card style={{ marginLeft: 5, color: '#772262', borderRadius: 20, height: 150, width: 400, marginTop: 30 }}>


                        <TouchableOpacity activeOpacity={1} style={{ marginTop: 20 }} onPress={() =>
                            Linking.openURL(`${questions.news2}`)}>
                            {isLoading ? <Text style={{ fontSize: 30, fontWeight: '500', color: '##ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', color: '##ffffff' }} >Q. {decodeURIComponent(questions.news2t)}?</Text>)}
                        </TouchableOpacity>

                    </Card>



                    <Card style={{ marginLeft: 5, color: '#772262', borderRadius: 20, height: 150, width: 400, marginTop: 30 }}>


                        <TouchableOpacity activeOpacity={1} style={{ marginTop: 20 }} onPress={() =>
                            Linking.openURL(`${questions.news3}`)}>
                            {isLoading ? <Text style={{ fontSize: 30, fontWeight: '500', color: '##ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', color: '##ffffff' }} >Q. {decodeURIComponent(questions.news3t)}?</Text>)}
                        </TouchableOpacity>

                    </Card>

                    <Card style={{ marginLeft: 5, color: '#772262', borderRadius: 20, height: 150, width: 400, marginTop: 30 }}>


                        <TouchableOpacity activeOpacity={1} style={{ marginTop: 20 }} onPress={() =>
                            Linking.openURL(`${questions.news4}`)}>
                            {isLoading ? <Text style={{ fontSize: 30, fontWeight: '500', color: '##ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', color: '##ffffff' }} >Q. {decodeURIComponent(questions.news4t)}?</Text>)}
                        </TouchableOpacity>

                    </Card>

                    <Card style={{ marginLeft: 5, color: '#772262', borderRadius: 20, height: 150, width: 400, marginTop: 30 }}>


                        <TouchableOpacity activeOpacity={1} style={{ marginTop: 20 }} onPress={() =>
                            Linking.openURL(`${questions.news6}`)}>
                            {isLoading ? <Text style={{ fontSize: 30, fontWeight: '500', color: '##ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', color: '##ffffff' }} >Q. {decodeURIComponent(questions.news5t)}?</Text>)}
                        </TouchableOpacity>

                    </Card>

                    <Card style={{ marginLeft: 5, color: '#772262', borderRadius: 20, height: 150, width: 400, marginTop: 30 }}>


                        <TouchableOpacity activeOpacity={1} style={{ marginTop: 20 }} onPress={() =>
                            Linking.openURL(`${questions.news6}`)}>
                            {isLoading ? <Text style={{ fontSize: 30, fontWeight: '500', color: '##ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', color: '##ffffff' }} >Q. {decodeURIComponent(questions.news5t)}?</Text>)}
                        </TouchableOpacity>

                    </Card>

                    <Card style={{ marginLeft: 5, color: '#772262', borderRadius: 20, height: 150, width: 400, marginTop: 30 }}>


                        <TouchableOpacity activeOpacity={1} style={{ marginTop: 20 }} onPress={() =>
                            Linking.openURL(`${questions.news6}`)}>
                            {isLoading ? <Text style={{ fontSize: 30, fontWeight: '500', color: '##ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', color: '##ffffff' }} >Q. {decodeURIComponent(questions.news6t)}?</Text>)}
                        </TouchableOpacity>

                    </Card>



                </View>





            </ScrollView>


        </View>



    )
}
export default News;