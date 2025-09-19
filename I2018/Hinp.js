import { View} from 'react-native';
import React from "react";
import WebView from "react-native-webview";
import MrecAdComponent from "../MrecAdComponent";



const Hinp6 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/13pBpHfD8W3yFOJzjkEN7VN5w7E_lQPvN/view?usp=share_link`,
                }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Hinp6;
