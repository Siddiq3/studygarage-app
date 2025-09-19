import { Text, View} from 'react-native';
import React, { useEffect } from "react";
import MrecAdComponent from "../MrecAdComponent";


const Soctp = () => {

    return (
        <View style={{ flex: 1 }}>

            <Text style={{ fontSize: 40, textAlign: 'center' }}> UPLOADED SHORTLY...</Text>
            <MrecAdComponent />
</View>
    );
}

export default Soctp;
