import { View} from 'react-native';
import React from "react";
import WebView from 'react-native-webview';
import MrecAdComponent from "../MrecAdComponent";



const Mathep4 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: `https://drive.google.com/file/d/1nbpCO5bHXBP3hFCvKFicDg-ULTaJo_p5/view?usp=share_link`, }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Mathep4;
