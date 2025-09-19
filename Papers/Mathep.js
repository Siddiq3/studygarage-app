import { View} from 'react-native';
import React from "react";
import WebView from "react-native-webview";
import MrecAdComponent from "../MrecAdComponent";


const Mathep = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: `https://drive.google.com/file/d/19TzlClW-BlolsLwj9Cy_2FS5HFDaaacz/view?usp=sharing`, }}
        />
            <MrecAdComponent />
        </View>
    );
}

export default Mathep;
