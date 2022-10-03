import React, {useState}from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {InitialState} from '../constants/Data'
import {logOut} from "../constants/Sever"


function SettingScreen({navigation}) {
    const [settings, setsettings] = useState(InitialState.setting)

    return (
        <View>
            <Text>
                Setting Screen
            </Text>
            <TouchableOpacity onPress={() => logOut()}>
                <Text>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default SettingScreen;
