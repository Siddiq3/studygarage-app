import { BackHandler, StyleSheet, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from "react";
import { responsiveWidth } from 'react-native-responsive-dimensions';

const Nmms = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack(); // Navigate back when back button is pressed
      return true; // Prevent default behavior
    });

    // ✅ Proper cleanup on unmount
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* First Row */}
      <View>
        <ScrollView horizontal={true}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: responsiveWidth(45),
              height: responsiveWidth(45),
              backgroundColor: '#e5e5e5',
              marginTop: 40,
              borderRadius: responsiveWidth(10),
              margin: 10
            }}
            onPress={() => navigation.navigate('nmmssm')}
          >
            <Image
              style={{ width: responsiveWidth(45), height: responsiveWidth(45), margin: 2.5 }}
              source={require('./assets/nmmssm.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: responsiveWidth(45),
              height: responsiveWidth(45),
              backgroundColor: '#e5e5e5',
              marginTop: 40,
              borderRadius: responsiveWidth(10),
              margin: 10
            }}
            onPress={() => navigation.navigate('nmmspp')}
          >
            <Image
              style={{ width: responsiveWidth(45), height: responsiveWidth(45), margin: 2.5 }}
              source={require('./assets/nmmspp.png')}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Second Row */}
      <View>
        <ScrollView horizontal={true}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: responsiveWidth(45),
              height: responsiveWidth(45),
              backgroundColor: '#e5e5e5',
              marginTop: 40,
              borderRadius: responsiveWidth(10),
              margin: 10
            }}
            onPress={() => navigation.navigate('nmmstp')}
          >
            <Image
              style={{ width: responsiveWidth(45), height: responsiveWidth(45), margin: 2.5 }}
              source={require('./assets/nmmstp.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: responsiveWidth(45),
              height: responsiveWidth(45),
              backgroundColor: '#e5e5e5',
              marginTop: 40,
              borderRadius: responsiveWidth(10),
              margin: 10
            }}
            onPress={() => navigation.navigate('nmmsdt')}
          >
            <Image
              style={{ width: responsiveWidth(45), height: responsiveWidth(45), margin: 2.5 }}
              source={require('./assets/nmmsdt.png')}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Nmms;
