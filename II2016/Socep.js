import { View} from 'react-native';
import React, { useEffect } from "react";
import WebView from 'react-native-webview';
import MrecAdComponent from "../MrecAdComponent";



const Socep12 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/19TP2nEy4Q8aborz5zJU3rBo6R_VZmHtP/view?usp=share_link`,
                }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Socep12;
