import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';


function AdsScreen({navigation}) {
    return (
        <View>
            <BannerAd
                unitId={TestIds.BANNER}
                size={BannerAdSize.LARGE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}></BannerAd>
        </View>
    );
}

export default AdsScreen;