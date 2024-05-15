import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { Card } from 'react-native-shadow-cards';
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/9492220282';


const Syllabusi = () => {

    return (
        <View>
            <GAMBannerAd
                unitId={adUnitId1}
                sizes={[BannerAdSize.FULL_BANNER]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
            <ScrollView>

                <Text style={{ fontSize: 25, textAlign: 'center', color: '#000000' }}>AP RGUKT CET Mathematics Syllabus</Text>
                <Text style={{ fontSize: 18 }}>   Real Numbers,</Text>
                <Text style={{ fontSize: 18 }}>   Sets,</Text>
                <Text style={{ fontSize: 18 }}>   Polynomials,</Text>
                <Text style={{ fontSize: 18 }}>   Pair of Linear Equations in Two Variables,</Text>
                <Text style={{ fontSize: 18 }}>   Quadratic Equations,</Text>
                <Text style={{ fontSize: 18 }}>   Progressions,</Text>
                <Text style={{ fontSize: 18 }}>  Coordinate Geometry,</Text>
                <Text style={{ fontSize: 18 }}>  Similar Triangles,</Text>
                <Text style={{ fontSize: 18 }}>  Tangents and Secants to a Circle,</Text>
                <Text style={{ fontSize: 18 }}>  Mensuration,</Text>
                <Text style={{ fontSize: 18 }}>  Trigonometry,</Text>
                <Text style={{ fontSize: 18 }}>  Applications of Trigonometry,</Text>
                <Text style={{ fontSize: 18 }}>  Probability,</Text>
                <Text style={{ fontSize: 18 }}>  Statistics.</Text>
                <Text style={{ fontSize: 25, textAlign: 'center', color: '#000000' }}> AP RGUKT CET Physical Sciences Syllabus</Text>
                <Text style={{ fontSize: 18 }}>   Heat,</Text>
                <Text style={{ fontSize: 18 }}>   Acids, Bases and Salts,</Text>
                <Text style={{ fontSize: 18 }}>   Refraction of Light at Plane Surfaces,</Text>
                <Text style={{ fontSize: 18 }}>   Refraction of Light at Curved Surfaces,</Text>
                <Text style={{ fontSize: 18 }}>   Human Eye and Colourful world,</Text>
                <Text style={{ fontSize: 18 }}>   Structure of Atom,</Text>
                <Text style={{ fontSize: 18 }}>   Classification of Elements- The Periodic Table,</Text>
                <Text style={{ fontSize: 18 }}>   Chemical Bonding,</Text>
                <Text style={{ fontSize: 18 }}>   Electric Current,</Text>
                <Text style={{ fontSize: 18 }}>   Electromagnetism,</Text>
                <Text style={{ fontSize: 18 }}>   Principles of Metallurgy,</Text>
                <Text style={{ fontSize: 18 }}>   Carbon and its Compounds.</Text>


                <Text style={{ fontSize: 25, textAlign: 'center', color: '#000000' }}>  AP RGUKT CET Biological Sciences Syllabus</Text>
                <Text style={{ fontSize: 18 }}>      Nutrition Food Supplying system,</Text>
                <Text style={{ fontSize: 18 }}>      Respiration The energy releasing system,</Text>
                <Text style={{ fontSize: 18 }}>      Transportation The circulatory system,</Text>
                <Text style={{ fontSize: 18 }}>      Excretion The wastage disposing system,</Text>
                <Text style={{ fontSize: 18 }}>      Coordination The linking system,</Text>
                <Text style={{ fontSize: 18 }}>      Reproduction The generating system, Coordination in life processes,</Text>
                <Text style={{ fontSize: 18 }}>      Heredity From parent to progeny,</Text>
                <Text style={{ fontSize: 18 }}>      Our environment Our concern, Natural resources.</Text>


                <Text style={{ fontSize: 25, textAlign: 'center', color: '#000000' }}>  AP RGUKT CET Exam Pattern 2022</Text>
                <Card>
                    <Text style={{ fontSize: 18 }}>   Subject                                 	           Allotted marks</Text>
                    <Text style={{ fontSize: 18 }}>   Maths	                                                    50</Text>
                    <Text style={{ fontSize: 18 }}>   Physical Science (Physics + Chemistry)                      25</Text>
                    <Text style={{ fontSize: 18 }}>   Biological science (Botany + Zoology)	                     25</Text>
                    <Text style={{ fontSize: 18 }}>  Total	                                                     100</Text>
                </Card>
            </ScrollView>
            <GAMBannerAd
                unitId={adUnitId1}
                sizes={[BannerAdSize.FULL_BANNER]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />

        </View>
    );
}

export default Syllabusi;
