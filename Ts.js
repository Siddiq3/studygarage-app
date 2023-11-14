import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking } from "react-native";

import { FontAwesome } from '@expo/vector-icons';




const Ts = ({ navigation }) => {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const getQuiz = async () => {
        setIsLoading(true)
        const url1 = 'https://siddiq3.github.io/Api/Tscard.json';
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

                    <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#ADA2FF', padding: 25, margin: 15, borderRadius: 10 }} onPress={() =>
                        navigation.navigate('tsimp')}>
                        {isLoading ? <Text style={{ fontSize: 17, fontWeight: '500', color: '#ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', color: '#ffffff' }}>{decodeURIComponent(questions.tsimp)}</Text>)}
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#C0EEE4', padding: 25, margin: 15, borderRadius: 10 }} onPress={() =>
                        navigation.navigate('tssm')}>
                        {isLoading ? <Text style={{ fontSize: 17, fontWeight: '500', color: '#ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', color: '#ffffff' }}>{decodeURIComponent(questions.tssm)}</Text>)}
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#FFE3B0', padding: 25, margin: 15, borderRadius: 10 }} onPress={() =>
                        navigation.navigate('tsbp')}>
                        {isLoading ? <Text style={{ fontSize: 17, fontWeight: '500' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', fontWeight: 'bold', color: '#ffffff' }}>{decodeURIComponent(questions.tsbp)}</Text>)}
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#434242', padding: 25, margin: 15, borderRadius: 10 }} onPress={() =>
                        navigation.navigate('tsplan')}>
                        {isLoading ? <Text style={{ fontSize: 17, fontWeight: '500', color: '#ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', color: '#ffffff' }}>{decodeURIComponent(questions.tsplan)}</Text>)}
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#ADA2FF', padding: 25, margin: 15, borderRadius: 10 }} onPress={() =>
                        navigation.navigate('tstp')}>
                        {isLoading ? <Text style={{ fontSize: 17, fontWeight: '500', color: '#ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', color: '#ffffff' }}>{decodeURIComponent(questions.tsMP)}</Text>)}
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#C0EEE4', padding: 25, margin: 15, borderRadius: 10 }} onPress={() =>
                        navigation.navigate('tsprev')}>
                        {isLoading ? <Text style={{ fontSize: 17, fontWeight: '500', color: '#ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', color: '#ffffff' }}>{decodeURIComponent(questions.tsprev)}</Text>)}
                    </TouchableOpacity>


                    <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#FFE3B0', padding: 25, margin: 15, borderRadius: 10 }} onPress={() =>

                        Linking.openURL(`${questions.whatsappTS}`)}>
                        <FontAwesome name="whatsapp" size={30} color="black" />
                        <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '500', color: '#000000' }}>  Join in whatsapp group</Text>
                    </TouchableOpacity>


                </View>


            </ScrollView>


        </View>



    )
}
export default Ts;