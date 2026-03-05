import { Text, View} from 'react-native';
import React, { useEffect } from 'react';
import MrecAdComponent from "../MrecAdComponent";


const Syllabusi = () => {

    return (
        <View>
            <ScrollView>

                <Text style={{ fontSize: 25, textAlign: 'center', color: '#F5F7FF' }}>AP RGUKT CET Mathematics Syllabus</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Real Numbers,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Sets,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Polynomials,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Pair of Linear Equations in Two Variables,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Quadratic Equations,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Progressions,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>  Coordinate Geometry,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>  Similar Triangles,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>  Tangents and Secants to a Circle,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>  Mensuration,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>  Trigonometry,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>  Applications of Trigonometry,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>  Probability,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>  Statistics.</Text>
                <Text style={{ fontSize: 25, textAlign: 'center', color: '#F5F7FF' }}> AP RGUKT CET Physical Sciences Syllabus</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Heat,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Acids, Bases and Salts,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Refraction of Light at Plane Surfaces,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Refraction of Light at Curved Surfaces,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Human Eye and Colourful world,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Structure of Atom,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Classification of Elements- The Periodic Table,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Chemical Bonding,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Electric Current,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Electromagnetism,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Principles of Metallurgy,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Carbon and its Compounds.</Text>

                <Text style={{ fontSize: 25, textAlign: 'center', color: '#F5F7FF' }}>  AP RGUKT CET Biological Sciences Syllabus</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>      Nutrition Food Supplying system,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>      Respiration The energy releasing system,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>      Transportation The circulatory system,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>      Excretion The wastage disposing system,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>      Coordination The linking system,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>      Reproduction The generating system, Coordination in life processes,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>      Heredity From parent to progeny,</Text>
                <Text style={{ fontSize: 18, color: '#D9E1F5' }}>      Our environment Our concern, Natural resources.</Text>

                <Text style={{ fontSize: 25, textAlign: 'center', color: '#F5F7FF' }}>  AP RGUKT CET Exam Pattern 2022</Text>
                <Card>
                    <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Subject                                 	           Allotted marks</Text>
                    <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Maths	                                                    50</Text>
                    <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Physical Science (Physics + Chemistry)                      25</Text>
                    <Text style={{ fontSize: 18, color: '#D9E1F5' }}>   Biological science (Botany + Zoology)	                     25</Text>
                    <Text style={{ fontSize: 18, color: '#D9E1F5' }}>  Total	                                                     100</Text>
                </Card>
            </ScrollView>
            <MrecAdComponent/>
            </View>
    );
}

export default Syllabusi;
