import { View} from 'react-native';
import React, { useEffect } from "react";
import WebView from 'react-native-webview';
import MrecAdComponent from "../MrecAdComponent";



const Phytp2 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: `https://drive.google.com/file/d/1wGD5PE5-Xae491C1Df8O3AvUkL6Bh4ec/view?usp=share_link`, }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Phytp2;
