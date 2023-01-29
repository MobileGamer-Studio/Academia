import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Image, StatusBar } from 'react-native';
import { colors, sizes, Chat, images } from '../constants/Data';
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { SearchBar, ProfilePicture, Header, Loading } from '../constants/Components';
import { firestore } from "../constants/Sever";
import { getDocs, collection, setDoc, doc, onSnapshot } from "firebase/firestore";

const theme = colors.lightTheme;
function ChatListScreen({ navigation, route }) {
    const userId = route.params.id;
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const [optionsAct, setOptionsAct] = useState(false)
    const [chats, setChats] = useState([])
    const [chatList, setChatList] = useState([])
    const [searchResult, setSearchResult] = useState(users)
    const [text, setText] = useState('')

    useEffect(() => {
        const usersSub = onSnapshot(collection(firestore, "Users"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            setUsers(data)
            setSearchResult(data)
        });

        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            setUser(doc.data())
            setChatList(doc.data().chatList)
            setLoading(false)
            //console.log('Chat List: ' + doc.data().chatList)
        });

        const chatsSub = onSnapshot(collection(firestore, "Chats"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });

            setChats(data)


        });

        return (
            () => {
                usersSub();
                userSub();
                chatsSub();
            }
        );
    }, [])



    //Functions
    async function saveData(id, path, data) {
        await setDoc(doc(firestore, path, id), data)
    }

    function Search(val) {
        if (val === "null" || val === '') {
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


    if (loading === true) {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={theme.color}
                    barStyle='light-content'
                />
                <Header method={() => navigation.goBack()} text={"Chats"} />
                <Loading />
            </View>
        )
    } else {
        const userChats = []
        chats.forEach(chat => {
            if (chatList.includes(chat.id)) {
                userChats.push(chat)
            }
        });

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={theme.color}
                    barStyle='light-content'
                />
                <Modal
                    visible={optionsAct}
                    animationType="slide"
                    transparent={true}
                    style = {{
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <View style={{
                        backgroundColor: theme.bgColor,
                        elevation: 5,
                        marginVertical: 100,
                        padding: 5,
                        alignSelf: "center",
                        borderRadius: 10,
                        width: "80%",
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
                                    color={colors.transparent}
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
                                        <View style = {{
                                            borderBottomWidth: 1,
                                            borderBottomColor: theme.outline2
                                        }}>
                                            <TouchableOpacity
                                                style={styles.popUpSection}
                                                onPress={() => {
                                                    if (user.chatList.includes(userId + "-" + item.id)) {
                                                        navigation.navigate('Chat', { chatId: userId + "-" + item.id, id: userId, recId: item.id })
                                                    } else if (user.chatList.includes(item.id + "-" + userId)) {
                                                        navigation.navigate('Chat', { chatId: item.id + "-" + userId, id: userId, recId: item.id })
                                                    } else {
                                                        const newChat = Chat;
                                                        newChat.id = userId + "-" + item.id;

                                                        newChat.members.push(userId, item.id)

                                                        newChat.members.forEach(y => {
                                                            users.forEach(x => {
                                                                if (x.id === y) {
                                                                    x.chatList.push(newChat.id)
                                                                    saveData(x.id, "Users", x)
                                                                }
                                                            })
                                                        })
                                                        saveData(newChat.id, "Chats", newChat)
                                                        setOptionsAct(false)
                                                        navigation.navigate('Chat', { chatId: newChat.id, id: userId, recId: item.id })
                                                    }
                                                }}
                                            >
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
                                                <Text>{item.name}</Text>
                                            </TouchableOpacity>
                                        </View>

                                    )
                                }}
                            />
                        </View>
                    </View>
                </Modal>
                <Header method={() => navigation.goBack()} text={"Chats"} />
                {
                    userChats.length !== 0 ? (
                        <View>
                            <FlatList
                                vertical
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                data={userChats}
                                renderItem={({ item }) => {
                                    let acc = {};
                                    item.members.forEach(member => {
                                        if (member !== userId) {
                                            users.forEach(element => {
                                                if (element.id === member) {
                                                    acc = element
                                                }
                                            })
                                        }
                                    })

                                    return (
                                        <View>
                                            <TouchableOpacity
                                                style={{
                                                    borderBottomColor: theme.outline2,
                                                    borderBottomWidth: 1,
                                                    padding: 10,
                                                    flexDirection: "row",
                                                    alignItems: "center"
                                                }}
                                                onPress={() => navigation.navigate("Chat", { chatId: item.id, id: user.id, recId: acc.id })}>
                                                <TouchableOpacity style={{
                                                    marginHorizontal: 10,
                                                    height: sizes.Large + 10,
                                                    width: sizes.Large + 10,
                                                    borderRadius: sizes.Large,
                                                }} onPress={() => navigation.navigate("Account", { id: userId, accId: recId })}>
                                                    <ProfilePicture
                                                        image={acc.profilePicture}
                                                        height={sizes.Large + 10}
                                                        width={sizes.Large + 10}
                                                        color={colors.white + 10}
                                                    />
                                                </TouchableOpacity>
                                                <View>
                                                    <Text style={{ color: theme.textColor, fontSize: sizes.Small }}>{acc.name}</Text>
                                                    {
                                                        item.messages.length > 0 ? (<Text style={{ color: theme.textColor, fontSize: sizes.ExtraSmall }}>{item.messages[item.messages.length - 1].message}</Text>) : null
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    )
                                }}
                            />
                        </View>
                    ) : (
                        <View style={{
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                        }}>
                            <View style={{
                                height: 300,
                                width: 300,
                                alignItems: "center",
                            }}>
                                <Image
                                    source={images.chat}
                                    style={{
                                        height: 300,
                                        width: 300,
                                        flex: 1,
                                    }}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>)
                }
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
}



export default ChatListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
    },

    popUpSection: {
        // borderTopColor: theme.outline,
        // borderTopWidth: 1,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },
})
