import { View} from 'react-native';
import React, { useEffect } from "react";
import WebView from 'react-native-webview';
import MrecAdComponent from "../MrecAdComponent";



const Nstp2 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: `https://drive.google.com/file/d/1PfQ1WLl4yvE5AvhX_vh_Tmza1hzn1T3M/view?usp=share_link`, }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Nstp2;
