import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import WebView from "react-native-webview";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/9791713624';

const Soctsa1 = () => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const getQuiz = async () => {
        setIsLoading(true)
        const url1 = 'https://siddiq3.github.io/Api/Examapi.json';
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
                        `${questions.socialtmsa1}`

                }}
            />
            )}
            <GAMBannerAd
                unitId={adUnitId1}
                sizes={[BannerAdSize.MEDIUM_RECTANGLE]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    );
}
export default Soctsa1;