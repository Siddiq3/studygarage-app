import { Text, View} from 'react-native';
import React, { useEffect, useState } from "react";
import WebView from "react-native-webview";
import MrecAdComponent from "../MrecAdComponent";


const Petssm = () => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const getQuiz = async () => {
        setIsLoading(true)
        const url1 = 'https://siddiq3.github.io/Api/blueprint.json';
        const res = await fetch(url1);
        const data = await res.json();

        setQuestions(data.results[0]);
        setIsLoading(false)

    };

    useEffect(() => {
        getQuiz();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? <Text style={{ flex: 1, fontSize: 30, fontWeight: '500', }}>Loading...</Text> : questions && (<WebView
                source={{
                    uri:
                        `${questions.Petssm}`

                }}
                />
            )}
            <MrecAdComponent/>

        </View>
    );
}

export default Petssm;
