import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking } from "react-native";
import { Card } from "react-native-shadow-cards";





const TenthHome = ({ navigation }) => {

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


        <View style={{ flex: 1, backgroundColor: '#FFFCF5' }}>
            <ScrollView>





                <View  >

                    <View>

                        <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#FFFCF5', padding: 25, margin: 15, borderRadius: 10 }} onPress={() =>
                            navigation.navigate('apssc')}>
                            {isLoading ? <Text style={{ fontSize: 17, fontFamily: 'PlusJakartaSans_500Medium', color: '#1D2A24' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 17, textAlignVertical: 'center', color: '#1D2A24' }}>{decodeURIComponent(questions.apssc)}</Text>)}
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#17694F', padding: 25, margin: 15, borderRadius: 10 }} onPress={() =>
                            navigation.navigate('tsssc')}>
                            {isLoading ? <Text style={{ fontSize: 17, fontFamily: 'PlusJakartaSans_500Medium', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 17, textAlignVertical: 'center', fontWeight: 'bold' }}>{decodeURIComponent(questions.tsssc)}</Text>)}
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#17694F', padding: 25, margin: 15, borderRadius: 10 }} onPress={() =>
                            navigation.navigate('polycet')}>
                            {isLoading ? <Text style={{ fontSize: 17, fontFamily: 'PlusJakartaSans_500Medium', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 17, textAlignVertical: 'center', fontWeight: 'bold' }}>{decodeURIComponent(questions.polycet)}</Text>)}
                        </TouchableOpacity>
                    </View>

                    <Card style={{ padding: 25, margin: 25, color: '#17694F', backgroundColor: '#5F6A63', borderRadius: 20 }} >
                        <TouchableOpacity activeOpacity={1} onPress={() =>
                            navigation.navigate('Question')}>

                            <Text style={{ fontSize: 23, textAlign: 'center', fontFamily: 'BricolageGrotesque_700Bold', color: '#1D2A24' }}> Today's Question</Text>
                            {isLoading ? <Text style={{ fontSize: 30, fontFamily: 'PlusJakartaSans_500Medium', color: '#1D2A24' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', color: '##ffffff' }} >Q. {decodeURIComponent(questions.t1)}?</Text>)}

                            <Text style={{ fontSize: 16, fontFamily: 'PlusJakartaSans_400Regular', color: '#1D2A24' }}>click here for answer</Text>

                        </TouchableOpacity>
                    </Card>

                    <Card style={{ padding: 25, margin: 25, backgroundColor: '#FFFCF5', borderRadius: 20 }} >
                        <TouchableOpacity activeOpacity={1} onPress={() =>
                            navigation.navigate('Weekly Questions')}>
                            <Text style={{ fontSize: 25, textAlign: 'center', fontFamily: 'BricolageGrotesque_700Bold', color: '#1D2A24' }}> WEEKLY TEST</Text>
                            {isLoading ? <Text style={{ fontSize: 30, fontFamily: 'PlusJakartaSans_500Medium', color: '#1D2A24' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', color: '#1D2A24' }} >{decodeURIComponent(questions.w1)}</Text>)}
                        </TouchableOpacity>

                    </Card>












                </View>





            </ScrollView>


        </View>



    )
}
export default TenthHome;
