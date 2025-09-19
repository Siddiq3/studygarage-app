import { View} from 'react-native';
import React from "react";
import MrecAdComponent from "../MrecAdComponent";


const Phyp13 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/1enDgWsNuEURFHPvDU8OWxe5n72_RnoZ9/view?usp=share_link`,
                }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Phyp13;
