import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Switch} from 'react-native';
import {InitialState, colors} from '../constants/Data'
import {logOut} from "../constants/Sever"


function SettingScreen({navigation}) {
    const [settings, setsettings] = useState(InitialState.setting)
    const [isDarkMode, setDarkMode] = useState(false)
    function changeMode() {
        if(isDarkMode === false){
            setDarkMode(true)
        }else{
            setDarkMode(false)
        }
    }
    return (
        <View>
            <Text>
                Setting Screen
            </Text>
            <TouchableOpacity onPress={() => logOut()}>
                <Text>Log Out</Text>
            </TouchableOpacity>
            <Switch
                trackColor={{ false: colors.defaultBG4, true: "#81b0ff" }}
                thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor= {colors.grey}
                onValueChange={() => changeMode()}
                value={isDarkMode}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default SettingScreen;
