import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import NativeAdView, {
    AdBadge,
    AdvertiserView,
    CallToActionView,
    HeadlineView,
    IconView,
    TaglineView,
} from "react-native-admob-native-ads";
import { AdManager } from "react-native-admob-native-ads";

const NativeAd = () => {
    const nativeAdViewRef = useRef();

    useEffect(() => {
        // Load the ad when the component mounts
        nativeAdViewRef.current?.loadAd();

        // Register the ad repository
        AdManager.registerRepository({
            name: 'imageAd',
            adUnitId: "ca-app-pub-2818388282601075/1798268375", // Replace with your actual adUnitID
            numOfAds: 3,
            nonPersonalizedAdsOnly: false,
            videoOptions: {
                mute: false,
            },
            expirationPeriod: 3600000, // in milliseconds (optional)
            mediationEnabled: false,
        }).then(result => {
            console.log('Repository registered: ', result);
        });

        return () => {
            // Clean up: unregister the ad repository when the component unmounts
            AdManager.unRegisterRepository('imageAd');
        };
    }, []);

    return (
        <NativeAdView
            ref={nativeAdViewRef}
            repository="imageAd" // Specify the repository name
        >
            {/* Native Ad content */}
            <View
                style={{
                    height: 250,
                    width: "100%",
                    justifyContent: "center", // Center the content vertically
                    paddingHorizontal: 10,
                }}
            >
                <AdBadge />
                <IconView
                    style={{
                        width: '100%',
                        height: '60%',
                        marginBottom: 10, // Add margin to separate the icon from the text
                    }}
                />
                <HeadlineView
                    style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        marginBottom: 5, // Add margin between headline and tagline
                    }}
                />
                <TaglineView
                    numberOfLines={1}
                    style={{
                        fontSize: 13,
                        marginBottom: 5, // Add margin between tagline and advertiser
                    }}
                />
                <AdvertiserView
                    style={{
                        fontSize: 12,
                        color: "gray",
                        marginBottom: 10, // Add margin between advertiser and CTA
                    }}
                />
                <CallToActionView
                    style={{
                        height: 45,
                        backgroundColor: "purple",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                        elevation: 10,
                        width: "5%"
                    }}
                    textStyle={{ color: "white", fontSize: 14 }}
                />
            </View>
        </NativeAdView>
    );
};

export default NativeAd;
