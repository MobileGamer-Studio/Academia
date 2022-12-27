import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { colors, Message, sizes } from '../constants/Data';
import { firestore } from "../constants/Sever";
import { collection, setDoc, doc, onSnapshot } from "firebase/firestore";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { ProfilePicture } from '../constants/Components';

const theme = colors.lightTheme;
function ChatScreen({ route, navigation }) {
    const chatId = route.params.chatId;
    const userId = route.params.id;
    const recId = route.params.recId;


    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [receiver, setReceiver] = useState({})
    const [chat, setChat] = useState({})
    const [messages, setMessages] = useState([])
    const [inputText, setInputText] = useState('')

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

        const recSub = onSnapshot(doc(firestore, "Users", recId), (doc) => {
            setReceiver(doc.data())
        });

        const chatSub = onSnapshot(doc(firestore, "Chats", chatId), (doc) => {
            setChat(doc.data())
            setMessages(doc.data().messages)
        });
        //console.log("User: " + user + "\n" + "Receiver: " + receiver + "\n" + "Chta: " + chat)

    }, [])


    //

    async function saveChat(id, chat) {
        await setDoc(doc(firestore, "Chats", id), chat);
    }

    async function sendMessage(message) {
        const date = new Date();
        const newMessage = Message;
        newMessage.message = message;
        newMessage.time = (date.getHours() + ":" + date.getMinutes()).toString();
        newMessage.sender = userId;
        newMessage.id = userId + message + messages.length.toString() ;

        messages.push(newMessage);
        chat.messages = messages;

        saveChat(chat.id, chat)
        setInputText('')
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', backgroundColor: theme.bgColor, marginTop: 30, borderBottomColor: theme.outline, borderBottomWidth: 1, padding: 10, alignItems: 'center', marginBottom: 10}}>
                <MaterialIcons name="arrow-back-ios" size={24} color="black" style ={{marginLeft: 10}} onPress = {() => navigation.goBack()}/>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity style={{ marginLeft: 10, marginRight: 20 }} onPress = {() => navigation.navigate("Account", {id: userId, accId: recId})}>
                        <ProfilePicture
                            image={receiver.profilePicture}
                            height={sizes.Large}
                            width={sizes.Large}
                            color={colors.white}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style ={{fontSize: 20}}>{receiver.name}</Text>
                        <Text>{'online'}</Text>
                    </View>
                </View>
            </View>
            <View style = {{flex: 1}}>
                <FlatList
                    vertical
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={messages}
                    renderItem={({ item }) => {
                        return (
                            <Chat message={item.message} user={user} userId={item.sender} time={item.time} />
                        )
                    }}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(val) => setInputText(val)}
                    style={{
                        borderRadius: sizes.ExtraLarge,
                        marginHorizontal: 10,
                        paddingHorizontal: sizes.Small,
                        backgroundColor: theme.bgColor,
                        height: 40,
                        width: "80%",
                        borderColor: theme.color,
                        borderWidth: 1,
                    }}
                    placeholder="Message....."
                    value= {inputText}
                />
                <TouchableOpacity onPress={() => sendMessage(inputText)}>
                    <FontAwesome name="send" color={theme.color} size={35} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

function Chat(props) {

    if (props.userId === props.user.id) {
        return (
            <View style={{
                width: 250,
                alignSelf: "flex-end",
            }}>
                <TouchableOpacity style={{
                    backgroundColor: theme.color,
                    padding: 8,
                    alignItems: "center",
                    borderRadius: sizes.Medium,
                    alignSelf: "flex-end",
                    marginHorizontal: 20,
                    marginVertical: 5,
                    flexDirection: "row",
                    borderBottomRightRadius: 0,
                }}>
                    <Text style={{ color: colors.white, flexWrap: "wrap", fontSize: 16 }}>{props.message}</Text>
                    <View style={{
                        flexDirection: "column",
                        marginHorizontal: 5,
                        alignSelf: 'flex-end',
                    }}>
                        <Text style={{ color: colors.white, fontSize: 10,}}>{props.time}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <View style={{
                width: 250,
                alignSelf: "flex-start",
            }}>
                <TouchableOpacity style={{
                    backgroundColor: theme.color2,
                    padding: 8,
                    alignItems: "center",
                    borderRadius: sizes.ExtraLarge,
                    alignSelf: "flex-start",
                    marginHorizontal: 20,
                    marginVertical: 5,
                    flexDirection: "row",
                    borderBottomLeftRadius: 0,
                }}>
                    <Text style={{ color: colors.white, flexWrap: "wrap", fontSize: 16 }}>{props.message}</Text>
                    <View style={{
                        flexDirection: "column",
                        marginHorizontal: 5,
                    }}>
                        <Text style={{ color: colors.white, fontSize: 10, }}>{props.time}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

}

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        bottom: 0,
        marginHorizontal: 5,
        marginBottom: 20,
        marginTop: 10,
        justifyContent: "space-between",
    }
})