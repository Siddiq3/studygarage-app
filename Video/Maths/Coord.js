import { Button, Linking, ScrollView, View} from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";


const Coord = () => {
    return (
        <View>
            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button 
                        color='#5F939A' 
                        title='Coordinate Geometry Part-1' 
                        onPress={() => Linking.openURL(`https://youtu.be/gfzTWvs-7Hc`)} 
                    />
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button 
                        color='#5F939A' 
                        title='Coordinate Geometry Part-2' 
                        onPress={() => Linking.openURL(`https://youtu.be/83ZD8CDKGqk`)} 
                    />
                </Card>
            </ScrollView>
        </View>
    );
};

export default Coord;
