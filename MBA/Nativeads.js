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

const Native = () => {
    const nativeAdViewRef = useRef();

    useEffect(() => {
        // Load the ad when the component mounts
        nativeAdViewRef.current?.loadAd();

        // Register the ad repository
        AdManager.registerRepository({
            name: 'imageAd',
            adUnitId: "ca-app-pub-3251781230941397/1884304955", // Replace with your actual adUnitID
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
                    height: 150,
                    width: "100%",
                }}
            >
                <AdBadge />
                <View
                    style={{
                        height: 150,
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        paddingHorizontal: 10,
                    }}
                >
                    <IconView
                        style={{
                            width: 70,
                            height: 70,
                        }}
                    />
                    <View
                        style={{
                            width: "65%",
                            maxWidth: "65%",
                            paddingHorizontal: 6,
                        }}
                    >
                        <HeadlineView
                            style={{
                                fontWeight: "bold",
                                fontSize: 13,
                            }}
                        />
                        <TaglineView
                            numberOfLines={1}
                            style={{
                                fontSize: 11,
                            }}
                        />
                        <AdvertiserView
                            style={{
                                fontSize: 10,
                                color: "gray",
                            }}
                        />
                    </View>

                    <CallToActionView
                        style={{
                            height: 45,
                            paddingHorizontal: 12,
                            backgroundColor: "purple",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 5,
                            elevation: 10,
                        }}
                        textStyle={{ color: "white", fontSize: 14 }}
                    />
                </View>
            </View>
        </NativeAdView>
    );
};

export default Native;