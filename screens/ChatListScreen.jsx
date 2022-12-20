import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Image} from 'react-native';
import { colors, sizes, Chat} from '../constants/Data';
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { SearchBar, ProfilePicture, Header } from '../constants/Components';
import { firestore } from "../constants/Sever";
import { getDocs, collection, setDoc, doc, onSnapshot } from "firebase/firestore";

const theme = colors.lightTheme;
function ChatListScreen({navigation, route}) {
    const userId = route.params.id;
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const [optionsAct, setOptionsAct] = useState(false)
    const [chats, setChats] = useState([])
    const [userChats, setUserChats] = useState([])
    const [searchResult, setSearchResult] = useState(users)

    useEffect(() => {
        const usersSub = onSnapshot(collection(firestore, "Users"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            setUsers(data)
            setSearchResult(data)
        });

        const userSub = onSnapshot(doc(firestore, "Users", userId), (item) => {
            setUser(item.data())
        });

        const chatsSub = onSnapshot(collection(firestore, "Chats"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            setChats(data)  
            
            if (chats.length !== 0 && users.length !== 0) {
                const list = [];
                chats.forEach((chat) => {
                    if (chat.members.includes(userId)) {
                        chat.members.forEach((y) => {
                            if (y !== userId) {
                                console.log("receiver: " + y);
                                users.forEach((z) => {
                                    if (z.id === y) {
                                        console.log(z);
                                        list.push({
                                            chat: chat,
                                            acc: z,
                                        });
                                    }
                                });
                            }
                        });
                    }
                });

                setUserChats(list);
            }
        });
    }, [users, chats])

    async function saveData(id, path,  data){
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
                                    <TouchableOpacity 
                                        style={styles.popUpSection} 
                                        onPress={() => {
                                            if (user.chatList.includes(userId + "-" + item.id)) {
                                                navigation.navigate('Chat', { chatId: userId + "-" + item.id, id: userId, recId: item.id })
                                            }else{
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
                                                navigation.navigate('Chat', { chatId: newChat.id, id: userId, recId: item.id })
                                            }
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
            <Header method = {() => navigation.goBack()} text = {"Chats"}/>
            <View style={{}}>
                <FlatList
                    vertical
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.chat.id}
                    data={userChats}
                    renderItem={({ item }) => {
                        // let acc = {};
                        // item.members.forEach(member => {
                        //     if (member !== userId) {
                        //         users.forEach(element => {
                        //             if (element.id === member) {
                        //                 acc = element 
                        //             }
                        //         })
                        //     }
                        // })

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
                                    onPress={() => navigation.navigate("Chat", { chatId: item.chat.id, id: userId , recId: item.acc.id })}>
                                    <View style = {{
                                        marginHorizontal: 10
                                    }}>
                                        <ProfilePicture
                                            image={item.acc.profilePicture}
                                            height={sizes.Large}
                                            width={sizes.Large}
                                            color={colors.white}
                                        />
                                    </View>
                                    <View>
                                        <Text style={{ color: theme.textColor }}>{item.acc.name}</Text>
                                        {/* <Text>{item.chat.messages[item.chat.messages.length - 1]}</Text> */}
                                    </View>
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
        // borderTopColor: theme.outline,
        // borderTopWidth: 1,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },
})