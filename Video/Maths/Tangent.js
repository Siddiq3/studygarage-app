import { Button, Linking, ScrollView, View } from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";

const Tangent = () => {
    return (
        <View>
            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button 
                        color='#5F939A' 
                        title='Tangent and Secants to a Triangle Part-1' 
                        onPress={() => Linking.openURL(`https://youtu.be/20_D27hQjIc`)} 
                    />
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button 
                        color='#5F939A' 
                        title='Tangent and Secants to a Triangle Part-2' 
                        onPress={() => Linking.openURL(`https://youtu.be/tRfrVIH50K4`)} 
                    />
                </Card>
            </ScrollView>
        </View>
    );
}

export default Tangent;
