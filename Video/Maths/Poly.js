import { Button, Linking, ScrollView, View } from 'react-native';
import React from "react";
import { Card } from "react-native-shadow-cards";

const Poly = () => {
    return (
        <View>
            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color='#5F939A'
                        title='Polynomial Part-1'
                        onPress={() => Linking.openURL(`https://youtu.be/r-fMQWOt5SU`)}
                    />
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color='#5F939A'
                        title='Polynomial Part-2'
                        onPress={() => Linking.openURL(`https://youtu.be/l2h0Lm2DvuQ`)}
                    />
                </Card>
            </ScrollView>
        </View>
    );
};

export default Poly;
