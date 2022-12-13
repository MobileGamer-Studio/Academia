import React, {useState} from 'react';
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
    const [optionsAct, setOptionsAct] = useState(false)

    async function getUsers() {
        const querySnapshot = await getDocs(collection(firestore, "Users"));
        let data = []
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        });
        setUsers(data)
    }

    async function saveUser() {
        await setDoc(doc(firestore, "Users", userId), user)
    }

    let user = {}
    users.forEach((item) => {
        if (item.id === userId) {
            user = item
            // console.log("got user: "+ user.name)
        }
    })

    getUsers().then(r => console.log("!"));

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