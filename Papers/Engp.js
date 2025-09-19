import { View} from 'react-native';
import React from "react";
import WebView from "react-native-webview";
import MrecAdComponent from "../MrecAdComponent";


const Engp = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/1G2EDrn5YAE7Y2pDfpTFU5qMGcVK2Cl9B/view?usp=share_link`,
                }}
        />
            <MrecAdComponent />
        </View>
    );
}

export default Engp;
