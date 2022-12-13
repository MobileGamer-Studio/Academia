import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Image} from 'react-native';
import { colors, sizes, Chat} from '../constants/Data';
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { SearchBar, ProfilePicture } from '../constants/Components';
import { firestore } from "../constants/Sever";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";

const theme = colors.lightTheme;
function ChatListScreen({navigation, route}) {
    const userId = route.params.id;
    const [user, setUser] = useState(route.params.user)
    const [users, setUsers] = useState([])
    const [optionsAct, setOptionsAct] = useState(false)
    const [chats, setChats] = useState([])
    const [searchResult, setSearchResult] = useState(users)

    async function getUsers() {
        const querySnapshot = await getDocs(collection(firestore, "Users"));
        let data = []
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        });

        let list = []
        user.chatList.forEach(element => {
            users.forEach(item => {
                if (item.id === element.receiver) {
                    let container = {
                        user: user,
                        receiver: item,
                        chat: element,
                        id: element.id
                    }
                    list.push(container)
                }
            })
        });

        setChats(list)

        setUsers(data)
    }

    async function saveUser(id, data){
        await setDoc(doc(firestore, "Users", id), data)
    }
    getUsers().then(r => console.log("Promise resolved!"));


    function Search(val) {
        if (val === "null" || val === "") {
            return setSearchResult(users);
        }
        val = val.toLowerCase();
        setSearchResult([])
        let list = []
        users.forEach(item => {
            if (item.name.includes(val) === true) {
                console.log("found one" + item)
                list.push(item)
            }
        })
        setSearchResult(list)
        console.log(val, "found in: ", searchResult);
    }


    return (
        <View style={styles.container}>
            <Modal
                visible={optionsAct}
                animationType="slide"
                transparent={true}
            >
                <View style={{
                    backgroundColor: theme.bgColor,
                    elevation: 5,
                    width: "80%",
                    height: "50%",
                    margin: 100,
                    alignSelf: "center",
                    borderRadius: 10,
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginVertical: 10,
                        marginHorizontal: 10,
                        alignItems: "center",
                    }}>
                        <View>
                            <SearchBar
                                method={(val) => Search(val)}
                                colors={theme.outline}
                            />
                        </View>
                        <TouchableOpacity onPress={() => setOptionsAct(false)}>
                            <MaterialIcons name="close" size={24} color={theme.outline} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            vertical
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            data={searchResult}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity 
                                        style={styles.popUpSection} 
                                        onPress={() => {
                                            const newChat = Chat;
                                            let receiver = {};
                                            newChat.id = userId + "-" + item.id;
                                            newChat.receiver = item.id;
                                            user.chatList.push(newChat);
                                            users.forEach((rec) => {
                                                if (rec.id === newChat.receiver) {
                                                    receiver = item;
                                                    receiver.chatList.push(newChat);
                                                }
                                            })
                                            saveUser(userId, user)
                                            saveUser(receiver.id, receiver)
                                            navigation.navigate('Chat', { chat: newChat, id: userId })
                                        }}
                                    >
                                        <View style={{
                                            marginHorizontal: 10
                                        }}>
                                            <ProfilePicture
                                                image={user.profilePicture}
                                                height={sizes.Large}
                                                width={sizes.Large}
                                                color={colors.white}
                                            />
                                        </View>
                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>

                                )
                            }}
                        />
                    </View>
                </View>
            </Modal>
            <View style={{}}>
                <FlatList
                    vertical
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={chats}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <TouchableOpacity 
                                style= {{ 
                                    borderBottomColor: theme.outline,
                                    borderBottomWidth: 1,
                                    padding: 10,
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}  
                                onPress={() => navigation.navigate("Chat", item)}>
                                    <View style = {{
                                        marginHorizontal: 10
                                    }}>
                                        <ProfilePicture
                                            image={user.profilePicture}
                                            height={sizes.Large}
                                            width={sizes.Large}
                                            color={colors.white}
                                        />
                                    </View>
                                    <Text style={{color: theme.outline}}>{item.receiver.name}</Text>
                                </TouchableOpacity>
                            </View>
                        
                        )
                    }}
                />
            </View>
            <View style={{
                alignItems: "center",
                backgroundColor: theme.color,
                borderRadius: 100,
                position: "absolute",
                bottom: sizes.Small,
                right: sizes.Small,
                padding: sizes.ExtraSmall,

            }}>
                <TouchableOpacity onPress={() => setOptionsAct(true)}>
                    <MaterialIcons name="add" size={30} color={colors.white} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ChatListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
    },

    popUpSection: {
        borderTopColor: theme.outline,
        borderTopWidth: 1,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },
})