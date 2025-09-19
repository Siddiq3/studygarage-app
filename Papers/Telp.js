import { View} from 'react-native';
import React, { useEffect } from "react";

import WebView from "react-native-webview";
import MrecAdComponent from "../MrecAdComponent";


const Telp = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/1-4dVNi06Ny4wSR3iWd4drWU6VoEWIjZH/view?usp=sharing`,
                }}
        />
            <MrecAdComponent />
        </View>
    );
}

export default Telp;
