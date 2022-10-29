import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Switch} from 'react-native';
import { colors, themeData} from '../constants/Data'
import {logOut} from "../constants/Sever"

async function GetSettingsData(id) {
    const data = await AsyncStorage.getItem('Settings');
    const settings = JSON.parse(data);

    console.log("Settings: " + settings + "\n Data: " + data);
    return settings;
}

function SettingScreen({navigation}) {

    const [settings, setSettings] = useState(GetSettingsData().then(r => console.log(r)));
    const [isDarkMode, setDarkMode] = useState(false)
    function changeMode() {
        if(isDarkMode === false){
            setDarkMode(true)
            settings.themeData = themeData.dark;
        }else{
            settings.themeData = themeData.light;
            setDarkMode(false)
        }
    }
    return (
        <View style = {styles.container}>
            <Text>
                Setting Screen
            </Text>
            <TouchableOpacity onPress={() => {
                logOut()
                navigation.navigate("Loading");
            }}
            >
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
