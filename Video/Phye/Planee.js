import { Button, Linking, ScrollView, View} from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";


const Planee = () => {

    return (
        <View>

            <ScrollView>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT PLANE SURFACES PART-1' onPress={() =>
                        Linking.openURL(`https://youtu.be/TIkg7wzxc04`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT PLANE SURFACES PART-2' onPress={() =>
                        Linking.openURL(`https://youtu.be/HqfdWe0FQeE`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT PLANE SURFACES PART-3' onPress={() =>
                        Linking.openURL(`https://youtu.be/Y24HXSUlwtQ`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT PLANE SURFACES PART-4' onPress={() =>
                        Linking.openURL(`https://youtu.be/mJWKw8Rg0CM`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT PLANE SURFACES PART-5' onPress={() =>
                        Linking.openURL(`https://youtu.be/kVV8IMaYE5o`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT PLANE SURFACES PART-6' onPress={() =>
                        Linking.openURL(`https://youtu.be/G8q8rPyf0vA`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT PLANE SURFACES PART-7' onPress={() =>
                        Linking.openURL(`https://youtu.be/ZnkUZtWKLpg`)}>
                    </Button>
                </Card>
            </ScrollView>
            </View>
    );
}

export default Planee;
