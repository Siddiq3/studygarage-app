import { View} from 'react-native';
import React, { useEffect } from "react";
import WebView from "react-native-webview";
import MrecAdComponent from "../MrecAdComponent";


const Socep = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/1SawBZTICdJXDEl_7FwGgMoQzmV4kzPQ6/view?usp=sharing`,
                }}
        />
            <MrecAdComponent />
        </View>
    );
}

export default Socep;
