import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ScrollView, StatusBar} from 'react-native';
import { colors, themeData, User} from '../constants/Data'
import {logOut} from "../constants/Sever"
import {MaterialIcons} from "@expo/vector-icons"
import { Header, ProfilePicture } from '../constants/Components';
import { firestore } from "../constants/Sever";
import { getDocs, collection, setDoc, doc, onSnapshot } from "firebase/firestore";


const theme = colors.lightTheme;
function SettingScreen({route, navigation}) {
    const userId = route.params.id;
    const [users, set_users] = useState([])
    const [user, set_user] = useState({})
    const [settings, setSettings] = useState({});  


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");


    useEffect(() => {
        const usersSub = onSnapshot(collection(firestore, "Users"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            //console.log("Current data: ", data);
            set_users(data)
            //set_user(ans.data)
        });

        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            set_user(doc.data())
            setName(doc.data().name)
            setEmail(doc.data().loginDetails.email)
        });
    }, [])

    return (
        <View style = {styles.container}>
            <StatusBar
                backgroundColor={theme.color}
                barStyle='light-content'
            />
            <Header method = {() => navigation.goBack()} text = {'Settings'}/>
            <ScrollView>
                <View>
                    <TouchableOpacity 
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        padding: 10,
                    }}

                    onPress={() => navigation.navigate("UserAccount", { id: user.id })}>
                        <ProfilePicture color={colors.white} image={user.profilePicture} height={50} width={50} />
                        <View style={{ justifyContent: 'flex-start', height: '100%', alignItems: 'flex-start', marginHorizontal: 10, }}>
                            <Text style={{ fontSize: 20 }}>{name}</Text>
                            <Text>{email}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Section
                    text={"Share"}
                    method={async () => {
                        try {
                            const result = await Share.share({
                                message:
                                    'React Native | A framework for building native apps using React',
                            });
                            if (result.action === Share.sharedAction) {
                                if (result.activityType) {
                                    // shared with activity type of result.activityType
                                } else {
                                    // shared
                                }
                            } else if (result.action === Share.dismissedAction) {
                                // dismissed
                            }
                        } catch (error) {
                            alert(error.message);
                        }
                    }}
                />
                <Section
                    text={"Log Out"}
                    method={() => {
                        logOut()
                        navigation.navigate("Loading");
                    }}
                />
            </ScrollView>
        </View>
    );
}

function Section(props) {
    return(
        <View style = {styles.section}>
            <TouchableOpacity

                onPress={props.method}
            >
                <Text style={{ marginHorizontal: 10 }}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
    },
    section: {
        flexDirection: "column",
        borderTopWidth: 2,
        borderTopColor: theme.outline,
        paddingVertical: 10,
        flexDirection: "row",
        alignSelf: "flex-start",
        width: "100%",
    },
})

export default SettingScreen;
