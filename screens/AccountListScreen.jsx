import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Chat, colors, sizes } from '../constants/Data';
import { MaterialIcons } from '@expo/vector-icons';
import { Header, Loading, SearchBar, ProfilePicture } from '../constants/Components';
import { firestore } from "../constants/Sever";
import { collection, doc, onSnapshot } from "firebase/firestore";

const theme = colors.lightTheme;
function AccountListScreen({ navigation, route }) {
    const userId = route.params.id;
    const [loading, set_loading] = useState(true)
    const [users, set_users] = useState([])
    const [user, set_user] = useState({})
    const [optionsAct, setOptionsAct] = useState(false)

    useEffect(() => {
        const usersSub = onSnapshot(collection(firestore, "Users"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            set_users(data)
        });

        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            set_user(doc.data())

            if (user !== {}) {
                set_loading(false)
            }
        });

    }, [])

    if (loading === true) {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={theme.color}
                    barStyle='light-content'
                />
                <Header text={"Accounts"} method={() => navigation.goBack()} />
                <Loading/>
            </View>
        )
    }else{
        return (
            <View style={styles.container}>
                <Header text = {"Accounts"} method = {() => navigation.goBack()}/>
                <View style={{ marginVertical: 10, paddingHorizontal: 10 }}><SearchBar /></View>
                <View>
                    <FlatList
                        vertical
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        data={users}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <TouchableOpacity
                                        style={{
                                            borderBottomColor: theme.outline,
                                            borderBottomWidth: 1,
                                            padding: 10,
                                            flexDirection: "row",
                                            alignItems: "center"
                                        }}
                                        onPress={() => {
                                            if(item.id === userId){
                                                navigation.navigate("UserAccount", { id: user.id})
                                            }else{
                                                navigation.navigate("Account", { id: user.id, accId: item.id })
                                            }
                                        }}>
                                        <View style={{
                                            marginHorizontal: 10
                                        }}>
                                            <ProfilePicture
                                                image={item.profilePicture}
                                                height={sizes.Large}
                                                width={sizes.Large}
                                                color={colors.white}
                                            />
                                        </View>
                                        <Text style={{ color: theme.textColor, fontSize: sizes.Small }}>{item.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        );
    }
}

export default AccountListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
    }
});