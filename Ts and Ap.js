import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking, Image } from "react-native";
import { Card } from "react-native-shadow-cards";




import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

const ApTs = ({ navigation }) => {

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


        <View style={{ flex: 1, }}>
            <ScrollView>










                <View>


                    <ScrollView horizontal={true}>









                        <TouchableOpacity activeOpacity={1} style={{ marginLeft: 5, color: '#772262', backgroundColor: '#0C2A53', borderRadius: 20, height: responsiveHeight(21.5), width: responsiveWidth(90), marginTop: 20 }} onPress={() =>
                            navigation.navigate('Question')}>

                            {isLoading ? <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '500', color: '#ffffff', textAlign: 'center' }}>Loading...</Text> : questions && (<Text style={{ fontSize: responsiveFontSize(3), textAlign: 'center', fontWeight: 'bold', color: '#ffffff' }} >Q. {decodeURIComponent(questions.t10)}</Text>)}
                            {isLoading ? <Text style={{ fontSize: responsiveFontSize(3), fontWeight: '500', color: '#ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: responsiveFontSize(2.5), textAlignVertical: 'center', color: '#ffffff' }} >Q. {decodeURIComponent(questions.t1)}?</Text>)}

                            <Text style={{ fontSize: responsiveFontSize(1.5), fontWeight: '400', color: '#caf0f8', textAlign: 'center' }}>click here for answer</Text>

                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={1} style={{ marginLeft: 5, color: '#772262', backgroundColor: '#83c5be', borderRadius: 20, height: responsiveHeight(21.5), width: responsiveWidth(90), marginTop: 20 }} onPress={() =>
                            navigation.navigate('Question9')}>

                            {isLoading ? <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '500', color: '#000000', textAlign: 'center' }}>Loading...</Text> : questions && (<Text style={{ fontSize: responsiveFontSize(3), textAlign: 'center', fontWeight: 'bold', color: '#000000' }} >Q. {decodeURIComponent(questions.t9)}</Text>)}
                            {isLoading ? <Text style={{ fontSize: responsiveFontSize(3), fontWeight: '500', color: '#000000' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: responsiveFontSize(2.5), textAlignVertical: 'center', color: '#ffffff' }} >Q. {decodeURIComponent(questions.q9)}?</Text>)}

                            <Text style={{ fontSize: responsiveFontSize(1.5), fontWeight: '400', color: '#000000', textAlign: 'center' }}>click here for answer</Text>

                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} style={{ marginLeft: 5, color: '#772262', backgroundColor: '#e5383b', borderRadius: 20, height: responsiveHeight(21.5), width: responsiveWidth(90), marginTop: 20 }} onPress={() =>
                            navigation.navigate('Question8')}>

                            {isLoading ? <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '500', color: '#ffffff', textAlign: 'center' }}>Loading...</Text> : questions && (<Text style={{ fontSize: responsiveFontSize(3), textAlign: 'center', fontWeight: 'bold', color: '#000000' }} >Q. {decodeURIComponent(questions.t8)}</Text>)}
                            {isLoading ? <Text style={{ fontSize: responsiveFontSize(3), fontWeight: '500', color: '#ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: responsiveFontSize(2.5), textAlignVertical: 'center', color: '#ffffff' }} >Q. {decodeURIComponent(questions.q8)}?</Text>)}

                            <Text style={{ fontSize: responsiveFontSize(1.5), fontWeight: '400', color: '#ffffff', textAlign: 'center' }}>click here for answer</Text>

                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={1} style={{ marginLeft: 5, color: '#772262', backgroundColor: '#457b9d', borderRadius: 20, height: responsiveHeight(21.5), width: responsiveWidth(90), marginTop: 20 }} onPress={() =>
                            navigation.navigate('Question7')}>

                            {isLoading ? <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '500', color: '#ffffff', textAlign: 'center' }}>Loading...</Text> : questions && (<Text style={{ fontSize: responsiveFontSize(3), textAlign: 'center', fontWeight: 'bold', color: '#000000' }} >Q. {decodeURIComponent(questions.t7)}</Text>)}
                            {isLoading ? <Text style={{ fontSize: responsiveFontSize(3), fontWeight: '500', color: '#ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: responsiveFontSize(2.5), textAlignVertical: 'center', color: '#ffffff' }} >Q. {decodeURIComponent(questions.q7)}?</Text>)}

                            <Text style={{ fontSize: responsiveFontSize(1.5), fontWeight: '400', color: '#ffffff', textAlign: 'center' }}>click here for answer</Text>

                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={1} style={{ marginLeft: 5, color: '#772262', backgroundColor: '#9b5de5', borderRadius: 20, height: responsiveHeight(21.5), width: responsiveWidth(90), marginTop: 20 }} onPress={() =>
                            navigation.navigate('Question6')}>

                            {isLoading ? <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '500', color: '#ffffff', textAlign: 'center' }}>Loading...</Text> : questions && (<Text style={{ fontSize: responsiveFontSize(3), textAlign: 'center', fontWeight: 'bold', color: '#000000' }} >Q. {decodeURIComponent(questions.t6)}</Text>)}
                            {isLoading ? <Text style={{ fontSize: responsiveFontSize(3), fontWeight: '500', color: '#ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: responsiveFontSize(2.5), textAlignVertical: 'center', color: '#ffffff' }} >Q. {decodeURIComponent(questions.q6)}?</Text>)}

                            <Text style={{ fontSize: responsiveFontSize(1.5), fontWeight: '400', color: '#ffffff', textAlign: 'center' }}>click here for answer</Text>

                        </TouchableOpacity>



                        <Card style={{ marginLeft: 5, color: '#772262', backgroundColor: '#372549', borderRadius: 20, height: responsiveHeight(21.5), width: responsiveWidth(90), marginTop: 20 }} >
                            <TouchableOpacity activeOpacity={1} onPress={() =>
                                navigation.navigate('Weekly Questions')}>
                                <Text style={{ fontSize: responsiveFontSize(2.5), textAlign: 'center', fontWeight: 'bold', color: '#ffffff' }}> WEEKLY TEST</Text>
                                {isLoading ? <Text style={{ fontSize: responsiveFontSize(3), fontWeight: '500', color: '#ffffff' }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', color: '#ffffff' }} >{decodeURIComponent(questions.w1)}</Text>)}
                            </TouchableOpacity>

                        </Card>
                    </ScrollView>


                </View>


                <View style={{ marginTop: 25, borderRadius: 30, marginLeft: 5 }}>

                    <ScrollView>

                        <Card style={{ borderRadius: 20, width: "98%", backgroundColor: "#9bf6ff", }}>
                            <Text style={{ textAlign: 'center', fontSize: 25, textAlignVertical: 'center', }}> FOLLOW US ON </Text>
                            <View style={{ flexDirection: 'row', alignContent: "flex-start", padding: 5, margin: 5, }}>
                                <TouchableOpacity onPress={() =>
                                    Linking.openURL(`https://www.youtube.com/@StudyGarage03`)}>
                                    <Image style={{ width: 50, height: 50, borderRadius: 50, marginHorizontal: 40, }} source={require('./assets/youtube.png')} />
                                </TouchableOpacity>



                                <TouchableOpacity onPress={() =>
                                    Linking.openURL(`https://whatsapp.com/channel/0029VaAYOji89inaJs4Jhq3U`)}>

                                    <Image style={{ width: 50, height: 50, borderRadius: 50, marginHorizontal: 40 }} source={require('./assets/whatsapp.png')} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() =>
                                    Linking.openURL(`https://www.instagram.com/siddiqkolimi/?igshid=NGExMmI2YTkyZg%3D%3D`)}>


                                    <Image style={{ width: 50, height: 50, borderRadius: 50, marginHorizontal: 40 }} source={require('./assets/instagram.png')} />
                                </TouchableOpacity>
                            </View>
                        </Card>
                    </ScrollView>
                </View>

                <View>

                    <ScrollView horizontal={true}>


                        <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(20), height: responsiveWidth(20), backgroundColor: '#e5e5e5', marginTop: 40, borderRadius: responsiveWidth(10), margin: 10 }} onPress={() =>
                            navigation.navigate('apssc')}>
                            <Image style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5, }} source={require('./assets/ap.png')} />



                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(20), height: responsiveWidth(20), backgroundColor: '#e5e5e5', marginTop: 40, borderRadius: responsiveWidth(10), margin: 10 }} onPress={() =>
                            navigation.navigate('tsssc')}>
                            <Image style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5, }} source={require('./assets/ts.png')} />



                        </TouchableOpacity>



                        <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(20), height: responsiveWidth(20), backgroundColor: '#e5e5e5', marginTop: 40, borderRadius: responsiveWidth(10), margin: 10 }} onPress={() =>
                            navigation.navigate('polycet1')}>
                            <Image style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5, }} source={require('./assets/poly.png')} />



                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(20), height: responsiveWidth(20), backgroundColor: '#e5e5e5', marginTop: 40, borderRadius: responsiveWidth(10), margin: 10 }} onPress={() =>
                            navigation.navigate('Class9')}>
                            <Image style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5, }} source={require('./assets/9th.png')} />



                        </TouchableOpacity>

                    </ScrollView>
                </View>
                <View  >
                    <ScrollView horizontal={true}>
                        <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.5), color: '#000000', height: 20, marginLeft: responsiveHeight(1.5), marginTop: -4 }}  > 10thclass ap</Text>
                        <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.5), color: '#000000', height: 20, marginLeft: responsiveHeight(2.5), marginTop: -4 }}  > 10thclass ts</Text>
                        <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.5), color: '#000000', height: 20, marginLeft: responsiveHeight(6), marginTop: -4 }}  >polycet</Text>
                        <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.5), color: '#000000', height: 20, marginLeft: responsiveHeight(5.5), marginTop: -4 }}  > 9thclass</Text>

                    </ScrollView>

                </View>
                <View>
                    <ScrollView horizontal={true}>
                        <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(20), height: responsiveWidth(20), backgroundColor: '#e5e5e5', marginTop: 40, borderRadius: responsiveWidth(10), margin: 10 }} onPress={() =>
                            navigation.navigate('Class8')}>
                            <Image style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5, }} source={require('./assets/8th.png')} />



                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(20), height: responsiveWidth(20), backgroundColor: '#e5e5e5', marginTop: 40, borderRadius: responsiveWidth(10), margin: 10 }} onPress={() =>
                            navigation.navigate('Class7')}>
                            <Image style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5, }} source={require('./assets/7th.png')} />



                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(20), height: responsiveWidth(20), backgroundColor: '#e5e5e5', marginTop: 40, borderRadius: responsiveWidth(10), margin: 10 }} onPress={() =>
                            navigation.navigate('Class6')}>
                            <Image style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5, }} source={require('./assets/6th.png')} />



                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(20), height: responsiveWidth(20), backgroundColor: '#e5e5e5', marginTop: 40, borderRadius: responsiveWidth(10), margin: 10 }} onPress={() =>
                            navigation.navigate('nmms')}>
                            <Image style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5, }} source={require('./assets/nmms.png')} />



                        </TouchableOpacity>



                    </ScrollView>
                </View>


                <View  >
                    <ScrollView horizontal={true}>
                        <Text style={{ fontSize: responsiveFontSize(1.5), color: '#000000', height: 20, marginTop: -4, marginLeft: responsiveWidth(5), textAlign: 'auto', }}  >8th class</Text>
                        <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.5), color: '#000000', height: 20, marginTop: -4, marginLeft: responsiveHeight(6) }}  >7th class</Text>
                        <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.5), color: '#000000', height: 20, marginTop: -4, marginLeft: responsiveWidth(10.5) }}  >6th class</Text>
                        <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.5), color: '#000000', height: 20, marginTop: -4, marginLeft: responsiveWidth(11) }}  >NMMS </Text>

                    </ScrollView>

                </View>

                <View  >

                    <ScrollView horizontal={true}>
                        <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(20), height: responsiveWidth(20), backgroundColor: '#e5e5e5', marginTop: 40, borderRadius: responsiveWidth(10), margin: 10 }} onPress={() =>
                            navigation.navigate('interimp1')}>

                            <Image style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5, }} source={require('./assets/1st iq.png')} />

                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(20), height: responsiveWidth(20), backgroundColor: '#e5e5e5', marginTop: 40, borderRadius: responsiveWidth(10), margin: 10, marginTop: 40 }} onPress={() =>
                            navigation.navigate('interprev1')}>

                            <Image style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5, }} source={require('./assets/1st pp.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(20), height: responsiveWidth(20), backgroundColor: '#e5e5e5', marginTop: 40, borderRadius: responsiveWidth(10), margin: 10 }} onPress={() =>
                            navigation.navigate('emcet11')}>

                            <Image style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5, }} source={require('./assets/1stem.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(20), height: responsiveWidth(20), backgroundColor: '#e5e5e5', marginTop: 40, borderRadius: responsiveWidth(10), margin: 10 }} onPress={() =>
                            Linking.openURL(`https://www.youtube.com/@StudyGarage03`)}>

                            <Image style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5, }} source={require('./assets/youtube.png')} />

                        </TouchableOpacity>

                    </ScrollView>

                </View>

                <View  >
                    <ScrollView horizontal={true}>
                        <Text style={{ fontSize: responsiveFontSize(1.5), color: '#000000', height: 20, marginTop: -4, marginLeft: responsiveHeight(1.7), textAlign: 'auto', }}  >1styear Imp</Text>
                        <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.5), color: '#000000', height: 20, marginTop: -4, marginLeft: responsiveHeight(3) }}  >1styear papers</Text>
                        <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.5), color: '#000000', height: 20, marginTop: -4, marginLeft: responsiveHeight(2) }}  >Jr DailyTest</Text>
                        <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.5), color: '#000000', height: 20, marginTop: -4, marginLeft: responsiveHeight(4.5) }}  >Subscribe</Text>

                    </ScrollView>

                </View>


                <View  >

                    <ScrollView horizontal={true}>
                        <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(20), height: responsiveWidth(20), backgroundColor: '#e5e5e5', marginTop: 40, borderRadius: responsiveWidth(10), margin: 10 }} onPress={() =>
                            navigation.navigate('interimp2')}>

                            <Image style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5, }} source={require('./assets/2nd iq.png')} />

                        </TouchableOpacity>





                        <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(20), height: responsiveWidth(20), backgroundColor: '#e5e5e5', marginTop: 40, borderRadius: responsiveWidth(10), margin: 10, marginTop: 40 }} onPress={() =>
                            navigation.navigate('interprev2')}>

                            <Image style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5, }} source={require('./assets/2nd pp.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(20), height: responsiveWidth(20), backgroundColor: '#e5e5e5', marginTop: 40, borderRadius: responsiveWidth(10), margin: 10 }} onPress={() =>
                            navigation.navigate('emcet12')}>

                            <Image style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5, }} source={require('./assets/2ndem.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(20), height: responsiveWidth(20), backgroundColor: '#e5e5e5', marginTop: 40, borderRadius: responsiveWidth(10), margin: 10 }} onPress={() =>
                            Linking.openURL(`${questions.telegram}`)}>
                            <Image style={{ width: 75, height: 75, borderRadius: 50, margin: 2.5, }} source={require('./assets/telegram.png')} />
                        </TouchableOpacity>

                    </ScrollView>

                </View>

                <View  >
                    <ScrollView horizontal={true}>
                        <Text style={{ fontSize: responsiveFontSize(1.5), color: '#000000', height: 20, marginTop: -4, marginLeft: responsiveHeight(1.7), textAlign: 'auto', }}  >2ndyear Imp</Text>
                        <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.5), color: '#000000', height: 20, marginTop: -4, marginLeft: responsiveHeight(2.8) }}  >2ndyear papers</Text>
                        <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.5), color: '#000000', height: 20, marginTop: -4, marginLeft: responsiveHeight(2) }}  >Sr DailyTest</Text>
                        <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.5), color: '#000000', height: 20, marginTop: -4, marginLeft: responsiveHeight(4.5) }}  >join in</Text>

                    </ScrollView>

                </View>


            </ScrollView>
        </View>












    )
}
export default ApTs;