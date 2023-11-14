import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking, Image, SafeAreaView } from "react-native";
import { auth } from "./config/firebaseAuth";



export default function SignInScreen({ promtAsync }) {

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => promtAsync()}>
                <Text style={{ fontSize: 20 }}> SIGN IN WITH GOOGLE</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={async () => {
                await signOut(auth)
            }}>
                <Text style={{ fontSize: 20 }}>SIGN OUT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
