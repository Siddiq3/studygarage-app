import { View} from 'react-native';
import React, { useEffect } from "react";
import WebView from 'react-native-webview';
import MrecAdComponent from "../MrecAdComponent";


const Nstp1 = () => {

    return (
        <View>
            <View style={{ flex: 1 }}>
                <WebView
                    source={{
                        uri: `https://drive.google.com/file/d/1_My8lGPh5xg9PYcXqyBB9VL8xd4tnJ_g/view?usp=share_link`,
                    }}
        />

        </View>
        <MrecAdComponent/>
        </View>
    );
}

export default Nstp1;
