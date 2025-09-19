import { View} from 'react-native';
import React from "react";
import WebView from 'react-native-webview';
import MrecAdComponent from "../MrecAdComponent";



const Mathep10 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: `https://drive.google.com/file/d/1GU6kTyeXpMrd7npfN5iIm20Rki0rb6vl/view?usp=share_link`, }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Mathep10;
