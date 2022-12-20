import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Chat, colors, sizes } from '../constants/Data';
import { MaterialIcons } from '@expo/vector-icons';
import { SearchBar } from '../constants/Components';
import { firestore } from "../constants/Sever";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";
import { async } from '@firebase/util';

const theme = colors.lightTheme;
function AccountListScreen({ navigation, route }) {
    const userId = route.params.id;
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [chats, setChats] = useState([])
    const [userChats, setUserChats] = useState([])
    const [optionsAct, setOptionsAct] = useState(false)

    useEffect(() => {
        const usersSub = onSnapshot(collection(firestore, "Users"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            console.log("Current data: ", data);
            setUsers(data)
        });

        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            setUser(doc.data())
        });

        const chatsSub = onSnapshot(collection(firestore, "Chats"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            console.log("Current data: ", data);
            setChats(data)

            const list = []
            chats.forEach(chat => {
                if (chat.id.includes(userId)) {
                    list.push(chat)
                }

            })

            setUserChats(list)
        });
    }, [])

    return (
        <View style={styles.container}>
            <View style= {{marginTop: 40, paddingHorizontal: 10}}><SearchBar /></View>
            <View>
                <FlatList
                    vertical
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={users}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <TouchableOpacity style = {{flexDirection: 'row', padding: 10}} onPress={() => {
                                    let newChat = Chat;
                                    newChat.receiver = item.id
                                    user.chatList.push(newChat)
                                    saveUser()
                                    navigation.navigate('Chat', { chat: newChat, id: userId})
                                }}>
                                    <View style = {{
                                        backgroundColor: colors.white,
                                        borderRadius: sizes.ExtraLarge,
                                        height: sizes.Large,
                                        width: sizes.Large,
                                    }}>
                                        <Image
                                            source={{ uri: item.profilePicture }}
                                            style={styles.navImages}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    );
}

export default AccountListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
    }
});