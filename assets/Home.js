import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking, Image } from "react-native";
import { Card } from "react-native-shadow-cards";




import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

const Home = ({ navigation }) => {




    return (


        <View style={{ flex: 1, }}>
            <ScrollView>














                <View>

                    <ScrollView horizontal={true}>


                        <TouchableOpacity activeOpacity={1}
                            style={{ width: responsiveWidth(45), height: responsiveWidth(45), backgroundColor: '#e5e5e5', marginTop: 40, margin: 7 }} onPress={() =>
                                navigation.navigate('mca1')}>
                            <Image style={{ width: responsiveWidth(45), height: responsiveWidth(45), margin: 2.5, }} source={require('./assets/mca1.png')} />



                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={1}
                            style={{ width: responsiveWidth(45), height: responsiveWidth(45), backgroundColor: '#e5e5e5', marginTop: 40, margin: 7 }} onPress={() =>
                                navigation.navigate('mba1')}>
                            <Image style={{ width: responsiveWidth(45), height: responsiveWidth(45), margin: 2.5, }} source={require('./assets/mba1.png')} />



                        </TouchableOpacity>








                    </ScrollView>
                </View>

                <View>
                    <ScrollView horizontal={true}>

                        <TouchableOpacity activeOpacity={1}
                            style={{ width: responsiveWidth(45), height: responsiveWidth(45), backgroundColor: '#e5e5e5', marginTop: 40, margin: 7 }} onPress={() =>
                                navigation.navigate('mca2')}>
                            <Image style={{ width: responsiveWidth(45), height: responsiveWidth(45), margin: 2.5, }} source={require('./assets/mca2.png')} />



                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1}
                            style={{ width: responsiveWidth(45), height: responsiveWidth(45), backgroundColor: '#e5e5e5', marginTop: 40, margin: 7 }} onPress={() =>
                                navigation.navigate('mba2')}>
                            <Image style={{ width: responsiveWidth(45), height: responsiveWidth(45), margin: 2.5, }} source={require('./assets/mba2.png')} />



                        </TouchableOpacity>






                    </ScrollView>
                </View>




                <View >
                    <ScrollView horizontal={true}>
                        <TouchableOpacity activeOpacity={1}
                            style={{ width: responsiveWidth(45), height: responsiveWidth(45), backgroundColor: '#e5e5e5', marginTop: 40, margin: 7 }} onPress={() =>
                                navigation.navigate('mca3')}>
                            <Image style={{ width: responsiveWidth(45), height: responsiveWidth(45), margin: 2.5, }} source={require('./assets/mca3.png')} />



                        </TouchableOpacity>






                        <TouchableOpacity activeOpacity={1}
                            style={{ width: responsiveWidth(45), height: responsiveWidth(45), backgroundColor: '#e5e5e5', marginTop: 40, margin: 7, marginTop: 40 }} onPress={() =>
                                navigation.navigate('mba3')}>

                            <Image style={{ width: responsiveWidth(45), height: responsiveWidth(45), margin: 2.5, }} source={require('./assets/mba3.png')} />
                        </TouchableOpacity>



                    </ScrollView>




                </View>
                <View>
                    <ScrollView horizontal={true}>
                        <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(45), height: responsiveWidth(45), backgroundColor: '#e5e5e5', marginTop: 40, margin: 7 }} onPress={() =>
                            navigation.navigate('mca4')}>

                            <Image style={{ width: responsiveWidth(45), height: responsiveWidth(45), margin: 2.5, }} source={require('./assets/mca4.png')} />

                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} style={{ width: responsiveWidth(45), height: responsiveWidth(45), backgroundColor: '#e5e5e5', marginTop: 40, margin: 7 }} onPress={() =>
                            navigation.navigate('mba4')}>

                            <Image style={{ width: responsiveWidth(45), height: responsiveWidth(45), margin: 2.5, }} source={require('./assets/mba4.png')} />

                        </TouchableOpacity>





                    </ScrollView>
                </View>


            </ScrollView>
        </View>












    )
}
export default Home;