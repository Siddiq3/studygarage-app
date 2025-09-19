import { View} from 'react-native';
import React, { useEffect } from "react";
import WebView from "react-native-webview";
import MrecAdComponent from "../MrecAdComponent";



const Telp11 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/1K4AKE4KsnsNp_flDu6T8SP7vXAWC1Bkl/view?usp=share_link`,
                }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Telp11;
