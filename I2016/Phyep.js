import { View} from 'react-native';
import React from "react";
import WebView from "react-native-webview";
import MrecAdComponent from "../MrecAdComponent";



const Phyp11 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/1vOUZU_0NxIpEEI3wWikS4eZDTELHH3QM/view?usp=share_link`,
                }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Phyp11;
