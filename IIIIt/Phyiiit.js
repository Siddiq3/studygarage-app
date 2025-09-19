import React from "react";
import { Text, View, ScrollView, Button, Linking, TouchableWithoutFeedback } from "react-native";
import { Card } from "react-native-shadow-cards";
import MrecAdComponent from "../MrecAdComponent";


const Phyiiit = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#3DAEC5" }}>
      <ScrollView>
        {/* Physics Material Card */}
        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("phyics material")}>
            <Text style={{ fontSize: 20, textAlign: "center" }}>Physics Material</Text>
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
          Physics Video Explanation for IIIT/Polycet/NTSE
        </Text>

        {/* Video Buttons */}
        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Heat"
            onPress={() => Linking.openURL(`https://youtu.be/9ZAdnxX2gbI`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="ACIDS BASES SALTS, BITS PART-1"
            onPress={() => Linking.openURL(`https://youtu.be/vQisIHGzySQ`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="ACIDS BASES SALTS, BITS PART-2"
            onPress={() => Linking.openURL(`https://youtu.be/et3vLnGAuZE`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="ACIDS BASES SALTS, BITS PART-3"
            onPress={() => Linking.openURL(`https://youtu.be/Uy71wMzo-0c`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Refraction of Light at Plane Surfaces (1)"
            onPress={() => Linking.openURL(`https://youtu.be/mX4XppZdNMY`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Refraction of Light at Plane Surfaces (2)"
            onPress={() => Linking.openURL(`https://youtu.be/8ZODMxgs7TM`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Refraction of Light at Curved Surface (1)"
            onPress={() => Linking.openURL(`https://youtu.be/yQ-TEi1Wk-A`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Refraction of Light at Curved Surface (2)"
            onPress={() => Linking.openURL(`https://youtu.be/8zg_rElPGHE`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Principles of Metallurgy MCQ Part-1"
            onPress={() => Linking.openURL(`https://youtu.be/NZcHjedBh4Y`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Principles of Metallurgy MCQ Part-2"
            onPress={() => Linking.openURL(`https://youtu.be/m9NDnNdXqP4`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Classification of Elements Part-1"
            onPress={() => Linking.openURL(`https://youtu.be/LmdhvaaltsE`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Classification of Elements Part-2"
            onPress={() => Linking.openURL(`https://youtu.be/wSL2DEZwNuE`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Chemical Bonding -1"
            onPress={() => Linking.openURL(`https://youtu.be/vfG9faM2ISE`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Chemical Bonding -2"
            onPress={() => Linking.openURL(`https://youtu.be/xG6HetpgKIE`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Chemical Bonding -3"
            onPress={() => Linking.openURL(`https://youtu.be/d4rCkHsbCCU`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Carbon and its Compounds"
            onPress={() => Linking.openURL(`https://youtu.be/wKz-DKk7h8E`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Structure of Atom"
            onPress={() => Linking.openURL(`https://youtu.be/AUmCxlTIxuk`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Electric Current"
            onPress={() => Linking.openURL(`https://youtu.be/xSL1p5AfWCM`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Human Eye and Colourful World - Part 1"
            onPress={() => Linking.openURL(`https://youtu.be/nYncl6USNGY`)}
          />
        </Card>

        <Card style={{ padding: 30, margin: 20, backgroundColor: "#9FC8D1" }}>
          <Button
            color="#5F939A"
            title="Human Eye and Colourful World - Part 2"
            onPress={() => Linking.openURL(`https://youtu.be/Zo1WHRrEyos`)}
          />
        </Card>
      </ScrollView>
      <MrecAdComponent/>
    </View>
  );
};

export default Phyiiit;
