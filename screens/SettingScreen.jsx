import React, {useState}from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {InitialState} from '../constants/Data'


function SettingScreen({navigation}) {
    const [settings, setsettings] = useState(InitialState.setting)

    return (
        <View>
            <Text>
                Setting Screen
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default SettingScreen;
