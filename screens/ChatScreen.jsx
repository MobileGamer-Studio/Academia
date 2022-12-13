import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { colors, Message, sizes } from '../constants/Data';
import { firestore } from "../constants/Sever";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { ProfilePicture } from '../constants/Components';

const theme = colors.lightTheme;
function ChatScreen({route, navigation}) {
    const chat = route.params.chat;
    const userId = route.params.id;
    const recId = chat.receiver;
    
    const [users, setUsers] = useState([])
    const [messages, setMessages] = useState(chat.messages)
    const [inputText, setInputText] = useState("")

    async function getUsers() {
        const querySnapshot = await getDocs(collection(firestore, "Users"));
        let data = []
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        });
        setUsers(data)
    }

    async function updateUser(id, data) {
        await setDoc(doc(firestore, "Users", id), data);
    }

    getUsers().then(r => console.log("Promise resolved!"));

    let user = {}
    users.forEach((item) => {
        if (item.id === userId) {
            user = item
            // console.log("got user: "+ user.name)
        }
    })

    let receiver = {}
    users.forEach((item) => {
        if (item.id === recId) {
            receiver = item
            // console.log("got user: "+ receiver.name)
        }
    })


    //
    function sendMessage(message) {
        const newMessage = Message;
        newMessage.id = messages.length + 1;
        newMessage.message = message;
        newMessage.sender = userId;
        console.log(newMessage);

        user.chatList.forEach((item) => {
            if (item.id === chat.id) {
                item = chat;
                console.log("chat updated" + item.messages)
            }
        })
        receiver.chatList.forEach((item) => {
            if (item.id === chat.id) {
                item = chat;
                console.log("chat updated" + item.messages)
            }
        })
        updateUser(userId, user);
        updateUser(recId, receiver)
    }

    return (
        <View style={styles.container}>
            <View style = {{flexDirection: 'row', backgroundColor: theme.bgColor}}>
                <ProfilePicture
                    image={receiver.profilePicture}
                    height={sizes.Large}
                    width={sizes.Large}
                    color={colors.white}
                />
            </View>
            <ScrollView style = {{
                marginTop: sizes.ExtraLarge,
            }}>
                <Chat message="Hello Friends" user={user} userId={receiver.id} time = "10:20" />
                <Chat message="Hello You" user={user} userId={user.id} time="10:22" />
            </ScrollView>
            <View>
                <FlatList
                    vertical
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={messages}
                    renderItem={({ item }) => {
                        return (
                            <Chat message={item.message} user={user} userId={item.sender}/>
                        )
                    }}
                />
            </View>
            <View style = {styles.inputContainer}>
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
                />
                <TouchableOpacity onPress = {() => sendMessage(inputText)}>
                    <FontAwesome name="send" color={theme.color} size={35} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

function Chat(props) {
    
    if(props.userId === props.user.id) {
        return (
            <View style={{
                width: 200,
                alignSelf: "flex-end",
            }}>
                <TouchableOpacity style={{
                    backgroundColor: theme.color,
                    padding: 8,
                    alignItems: "center",
                    borderRadius: sizes.ExtraLarge,
                    alignSelf: "flex-end",
                    marginHorizontal: 20,
                    flexDirection: "row",
                }}>
                    <Text style={{ color: colors.white, flexWrap: "wrap", fontSize: 16 }}>{props.message}</Text>
                    <View style = {{
                        flexDirection: "column",
                        marginHorizontal: 5,
                    }}>
                        <Text style={{ color: colors.white, fontSize: 10,}}>{props.time}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }else{
        return (
            <View style = {{
                width: 200,
                alignSelf: "flex-start",
            }}>
                <TouchableOpacity style={{
                    backgroundColor: theme.color,
                    padding: 8,
                    alignItems: "center",
                    borderRadius: sizes.ExtraLarge,
                    alignSelf: "flex-start",
                    marginHorizontal: 20,
                    flexDirection: "row",
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
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 10,
        justifyContent: "space-between",
    }
})