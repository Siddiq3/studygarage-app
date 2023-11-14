import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking } from "react-native";
import { Card } from "react-native-shadow-cards";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import Share from "react-native-share";

const url = "https://play.google.com/store/apps/details?id=siddiqkolimidev.tenth_app";

const options = {

    url,

};



const About = ({ navigation }) => {
    const share = async (customOptions = options) => {
        try {
            await Share.open(customOptions);
        } catch (err) {
            console.log(err);
        }
    };





    return (

        <View style={{ flex: 1, backgroundColor: '#CF8BF3' }}>
            <ScrollView>



                <Card style={{ padding: 30, margin: 20, backgroundColor: '#bdc3c7' }}>
                    <Entypo name="share" size={26} color="black" />
                    <TouchableOpacity color='#5F939A' title='Share with your friends' onPress={async () => {
                        await share();
                    }}>
                        <Text style={{ textAlign: 'center', fontSize: 25 }}> Share with your friends</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20, backgroundColor: '#3b8d99' }}>
                    <AntDesign name="instagram" size={26} color="black" />
                    <TouchableOpacity color='#000000' title='Follow us on Instagram' onPress={() =>
                        Linking.openURL(`https://www.instagram.com/siddiqkolimi/`)}>

                        <Text style={{ textAlign: 'center', fontSize: 25 }}> Follow us on Instagram</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20, backgroundColor: '#99f2c8' }}>
                    <FontAwesome name="whatsapp" size={26} color="black" />
                    <TouchableOpacity color='#000000' title='Follow us on Instagram' onPress={() =>
                        Linking.openURL(`https://chat.whatsapp.com/HQmtyTBNcsX9nEvL7qpXlt`)}>
                        <Text style={{ textAlign: 'center', fontSize: 25 }}> For More Updates Join in our Group</Text>
                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 30, margin: 20, backgroundColor: '#aa4b6b' }}>

                    <TouchableOpacity color='#5F939A' title='Follow us on Instagram' onPress={() =>
                        Linking.openURL(`https://play.google.com/store/apps/details?id=com.devsid.ezstudy`)}>
                        <Text style={{ textAlign: 'center', fontSize: 25 }}> APP FOR DEGREE STUDENTS</Text>
                    </TouchableOpacity>
                </Card>

            </ScrollView>


        </View>
    )
}
export default About;