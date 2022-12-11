import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Switch} from 'react-native';
import { colors, themeData, User} from '../constants/Data'
import {logOut} from "../constants/Sever"
import {MaterialIcons} from "@expo/vector-icons"
import { ProfilePicture } from '../constants/Components';


const theme = colors.lightTheme
function SettingScreen({route, navigation}) {
    const user = route.params.user;
    

    async function GetSettingsData(id) {
        const data = await AsyncStorage.getItem('Settings');
        const settings = JSON.parse(data);

        console.log("Settings: " + settings + "\n Data: " + data);
        return settings;
    }

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
            <View style = {styles.section}>
                <View>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        padding: 10,
                    }}

                        onPress={() => navigation.navigate("UserAccount", {id: user.id})}>
                        <ProfilePicture color={colors.white} image={user.profilePicture} height={40} width={40} />
                        <Text style={{ marginHorizontal: 10 , fontSize: 17}}>{user.name}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{
                    flexDirection: "row",
                    alignSelf: "flex-end",
                    marginHorizontal: 10,
                }}

                    onPress={() => {
                        logOut()
                        navigation.navigate("Loading");
                    }}
                >
                    <Text style={{ marginHorizontal: 10 }}>Log Out</Text>
                    <MaterialIcons name="logout" size={24} color={theme.color} />
                </TouchableOpacity>
            </View>
            <Switch
                trackColor={{ false: theme.color, true: "#81b0ff" }}
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
        backgroundColor: theme.bgColor,
    },
    section: {
        flexDirection: "column",
        borderBottomWidth: 1,
        borderBottomColor: theme.color,
    },
})

export default SettingScreen;
