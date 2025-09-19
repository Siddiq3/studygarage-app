import { Button, Linking, ScrollView, View } from 'react-native';
import React from "react";
import { Card } from "react-native-shadow-cards";

const Real = () => {
    return (
        <View>
            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color='#5F939A'
                        title='Real Numbers Part-1'
                        onPress={() => Linking.openURL(`https://youtu.be/ZuSGh0JbK3k`)}
                    />
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color='#5F939A'
                        title='Real Numbers Part-2'
                        onPress={() => Linking.openURL(`https://youtu.be/9gGwNN0Pc04`)}
                    />
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color='#5F939A'
                        title='Real Numbers Part-3'
                        onPress={() => Linking.openURL(`https://youtu.be/8Kp8okXG5XU`)}
                    />
                </Card>
            </ScrollView>
        </View>
    );
};

export default Real;
