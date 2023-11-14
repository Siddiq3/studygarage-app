import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking } from "react-native";
import { Card } from "react-native-shadow-cards";

import { FontAwesome } from '@expo/vector-icons';



const Menu = ({ navigation }) => {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const getQuiz = async () => {
        setIsLoading(true)
        const url1 = 'https://siddiq3.github.io/Api/Cardapi.json';
        const res = await fetch(url1);
        const data = await res.json();

        setQuestions(data.results[0]);

        setIsLoading(false)

    };

    useEffect(() => {
        getQuiz();
    }, []);

    return (


        <View style={{ flex: 1, backgroundColor: '#000000' }}>
            <ScrollView>

                <View>
                    <ScrollView horizontal={true}>
                        <TouchableOpacity activeOpacity={1} style={{ width: 85, height: 65, backgroundColor: '#ADA2FF', margin: 20, borderRadius: 10 }} onPress={() =>
                            navigation.navigate('Importent')}>
                            <Text style={{ textAlign: 'center', fontSize: 14, textAlignVertical: 'center', color: '#000000' }}  > Imp Que</Text>

                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={1} style={{ width: 85, height: 65, backgroundColor: '#ADA2FF', margin: 20, borderRadius: 10 }} onPress={() =>
                            navigation.navigate('Textbook')}>
                            {isLoading ? <Text style={{ fontSize: 14, fontWeight: '500', color: '#ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', color: '#000000' }}>{decodeURIComponent(questions.study)}</Text>)}
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={{ width: 85, height: 65, backgroundColor: '#ADA2FF', margin: 20, borderRadius: 10 }} onPress={() =>
                            navigation.navigate('FA4')}>
                            {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', color: '#ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', color: '#000000' }}>{decodeURIComponent(questions.fa4)}</Text>)}
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View >
                    <ScrollView horizontal={true}>
                        <TouchableOpacity activeOpacity={1} style={{ width: 85, height: 65, backgroundColor: '#C0EEE4', margin: 20, borderRadius: 10 }} onPress={() =>
                            navigation.navigate('rivision')}>
                            {isLoading ? <Text style={{ fontSize: 14, fontWeight: '500', color: '#000000' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 15, textAlignVertical: 'center', color: '#000000' }}>{decodeURIComponent(questions.revision)}</Text>)}
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={{ width: 85, height: 65, backgroundColor: '#C0EEE4', margin: 20, borderRadius: 10 }} onPress={() =>
                            navigation.navigate('testpapers')}>
                            <Text style={{ textAlign: 'center', fontSize: 17, color: '#000000' }}> Model PAPERS 2023</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={{ width: 85, height: 65, backgroundColor: '#C0EEE4', margin: 20, borderRadius: 10 }} onPress={() =>
                            navigation.navigate('prefinal')}>
                            {isLoading ? <Text style={{ fontSize: 14, fontWeight: '500', color: '#000000' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 15, textAlignVertical: 'center', color: '#000000' }}>{decodeURIComponent(questions.prefinal)}</Text>)}
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View >
                    <ScrollView horizontal={true}>
                        <TouchableOpacity activeOpacity={1} style={{ width: 85, height: 65, backgroundColor: '#FFE3B0', margin: 20, borderRadius: 10 }} onPress={() =>
                            navigation.navigate('SA1')}>
                            {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', color: '#000000' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 15, textAlignVertical: 'center', color: '#000000' }}>{decodeURIComponent(questions.sa1)}</Text>)}
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={{ width: 85, height: 65, backgroundColor: '#FFE3B0', margin: 20, borderRadius: 10 }} onPress={() =>
                            navigation.navigate('FA1')}>
                            {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', color: '#000000' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 15, textAlignVertical: 'center', color: '#000000' }}>{decodeURIComponent(questions.fa1)}</Text>)}
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={{ width: 85, height: 65, backgroundColor: '#FFE3B0', margin: 20, borderRadius: 10 }} onPress={() =>
                            navigation.navigate('FA2')}>
                            {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', color: '#000000' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 15, textAlignVertical: 'center', color: '#000000' }}>{decodeURIComponent(questions.fa2)}</Text>)}
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <View >
                    <ScrollView horizontal={true}>
                        <TouchableOpacity activeOpacity={1} style={{ width: 85, height: 65, backgroundColor: '#FFF5E4', margin: 18, borderRadius: 10 }} onPress={() =>
                            navigation.navigate('FA3')}>
                            {isLoading ? <Text style={{ fontSize: 17, fontWeight: '500', color: '#000000' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 15, textAlignVertical: 'center', color: '#000000' }}>{decodeURIComponent(questions.fa3)}</Text>)}
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} style={{ width: 85, height: 65, backgroundColor: '#FFF5E4', margin: 23, borderRadius: 10 }} onPress={() =>
                            navigation.navigate('Prev Papers')}>
                            <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '500', color: '#000000' }}> Prev papers </Text>
                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={1} style={{ width: 85, height: 65, backgroundColor: '#FFF5E4', margin: 23, borderRadius: 10 }} onPress={() =>

                            Linking.openURL(`https://whatsapp.com/channel/0029VaAYOji89inaJs4Jhq3U`)}>
                            <FontAwesome name="whatsapp" size={30} color="black" />
                            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '500', color: '#000000' }}>  Join in </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View  >

                    <View>

                        <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#434242', padding: 25, margin: 15, borderRadius: 10 }} onPress={() =>
                            navigation.navigate('ssc')}>
                            {isLoading ? <Text style={{ fontSize: 17, fontWeight: '500', color: '#ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 17, textAlignVertical: 'center', color: '#ffffff' }}>{decodeURIComponent(questions.ssc)}</Text>)}
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#ADA2FF', padding: 25, margin: 15, borderRadius: 10 }} onPress={() =>
                            navigation.navigate('sliptest')}>
                            {isLoading ? <Text style={{ fontSize: 17, fontWeight: '500', color: '#ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 17, textAlignVertical: 'center', fontWeight: 'bold', color: '#000000' }}>{decodeURIComponent(questions.slip)}</Text>)}
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#FFF5E4', padding: 25, margin: 15, borderRadius: 10 }} onPress={() =>
                            navigation.navigate('quiz')}>
                            {isLoading ? <Text style={{ fontSize: 17, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 17, textAlignVertical: 'center', fontWeight: 'bold', color: '#000000' }}>{decodeURIComponent(questions.quiz)}</Text>)}
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#C0EEE4', padding: 25, margin: 15, borderRadius: 10 }} onPress={() =>
                            navigation.navigate('apblueprint')}>
                            {isLoading ? <Text style={{ fontSize: 17, fontWeight: '500' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 17, textAlignVertical: 'center', fontWeight: 'bold', color: '#000000' }}>{decodeURIComponent(questions.apblue)}</Text>)}
                        </TouchableOpacity>
                    </View>











                </View>





            </ScrollView>


        </View>



    )
}
export default Menu;