import { Text, View} from 'react-native';
import React, { useEffect } from "react";
import WebView from "react-native-webview";
import MrecAdComponent from "../MrecAdComponent";


const Mathtp = () => {

    return (
        <View>
            <Text style={{ fontSize: 40, textAlign: 'center' }}> UPLOADED SHORTLY...</Text>
            
            <MrecAdComponent />
</View>
    );
}

export default Mathtp;
