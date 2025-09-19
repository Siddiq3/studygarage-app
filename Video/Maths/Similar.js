import { Button, Linking, ScrollView, View } from 'react-native';
import React from "react";
import { Card } from "react-native-shadow-cards";

const Similar = () => {
    return (
        <View>
            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color='#5F939A'
                        title='Similar Triangle Part-1'
                        onPress={() => Linking.openURL(`https://youtu.be/weMi7riojQ8`)}
                    />
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color='#5F939A'
                        title='Similar Triangle Part-2'
                        onPress={() => Linking.openURL(`https://youtu.be/RdU15mkIZbQ`)}
                    />
                </Card>
            </ScrollView>
        </View>
    );
};

export default Similar;
