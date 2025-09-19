import { View} from 'react-native';
import React from "react";
import WebView from 'react-native-webview';
import MrecAdComponent from "../MrecAdComponent";



const Engp2 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/1iP1V_mzf01BW1Il7LHH6HIrkHsN8Dot2/view?usp=share_link`,
                }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Engp2;
