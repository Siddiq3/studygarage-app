import { View} from 'react-native';
import React, { useEffect } from "react";
import WebView from "react-native-webview";
import MrecAdComponent from "../MrecAdComponent";


const Socep8 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/1w6ckGbqk6FqYHPtOEEtxR2RK256W03cw/view?usp=share_link`,
                }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Socep8;
