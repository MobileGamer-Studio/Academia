import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Switch} from 'react-native';
import { colors, themeData, User} from '../constants/Data'
import {logOut} from "../constants/Sever"
import {MaterialIcons} from "@expo/vector-icons"
import { Header, ProfilePicture } from '../constants/Components';
import { firestore } from "../constants/Sever";
import { getDocs, collection, setDoc, doc, onSnapshot } from "firebase/firestore";


const theme = colors.lightTheme;
function SettingScreen({route, navigation}) {
    const userId = route.params.id;
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [settings, setSettings] = useState({});  


    useEffect(() => {
        const usersSub = onSnapshot(collection(firestore, "Users"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            //console.log("Current data: ", data);
            setUsers(data)
            //setUser(ans.data)
        });

        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            setUser(doc.data())
        });
    }, [])

    return (
        <View style = {styles.container}>
            <Header method = {() => navigation.goBack()} text = {'Settings'}/>
            <View style = {styles.section}>
                <View>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        padding: 10,
                    }}

                        onPress={() => navigation.navigate("UserAccount", {id: user.id})}>
                        <ProfilePicture color={colors.white} image={user.profilePicture} height={100} width={100} />
                        <View style={{ justifyContent: 'flex-start', height: '100%', alignItems: 'flex-start', marginHorizontal: 10, }}>
                            <Text style={{  fontSize: 20 }}>{user.name}</Text>
                            <Text onPress={() => navigation.navigate("EditProfile", { id: userId })}>Edit Profile</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{
                    flexDirection: "row",
                    alignSelf: "flex-start",
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
