import React from "react";
import { Text, View, ScrollView, Button, Linking,TouchableWithoutFeedback } from "react-native";
import { Card } from "react-native-shadow-cards";
import MrecAdComponent from "../MrecAdComponent";


const Mathsiiit = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#3DAEC5" }}>
      <ScrollView>
        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("maths Material")}
          >
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              Maths Material
            </Text>
          </TouchableWithoutFeedback>
        </Card>

        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            color: "#D82148",
            marginVertical: 10,
          }}
        >
          Maths Video Explanation for IIIT/Polycet/NTSE
        </Text>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Real Numbers"
            onPress={() => Linking.openURL(`https://youtu.be/SN9oNfMLAhA`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Sets"
            onPress={() => Linking.openURL(`https://youtu.be/nylyvwSccG8`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Polynomial"
            onPress={() => Linking.openURL(`https://youtu.be/l68uX91eeJ0`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Pair of Linear Equations in Two Variables"
            onPress={() => Linking.openURL(`https://youtu.be/yqBHtw_2KwM`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Quadratic Equations"
            onPress={() => Linking.openURL(`https://youtu.be/rJKqF2iMj6k`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Progression"
            onPress={() => Linking.openURL(`https://youtu.be/mDJxHCZwunM`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Coordinate Geometry"
            onPress={() => Linking.openURL(`https://youtu.be/Mc7mAJA5lG0`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Trigonometry part-1"
            onPress={() => Linking.openURL(`https://youtu.be/e2CH7MekM0o`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Trigonometry part-2"
            onPress={() => Linking.openURL(`https://youtu.be/GgPBKRIWBvs`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Model Paper Explanation"
            onPress={() => Linking.openURL(`https://youtu.be/NsvnpvayPQo`)}
          />
        </Card>
      </ScrollView>
      <MrecAdComponent/>
    </View>
  );
};

export default Mathsiiit;
