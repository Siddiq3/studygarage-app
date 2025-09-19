import { Button, Linking, ScrollView, View } from 'react-native';
import React from "react";
import { Card } from "react-native-shadow-cards";

const Prob = () => {
    return (
        <View>
            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color='#5F939A'
                        title='Probability Part-1'
                        onPress={() => Linking.openURL(`https://youtu.be/R-kOgTUxRVk`)}
                    />
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color='#5F939A'
                        title='Probability Part-2'
                        onPress={() => Linking.openURL(`https://youtu.be/ltNnEherDks`)}
                    />
                </Card>
            </ScrollView>
        </View>
    );
};

export default Prob;
