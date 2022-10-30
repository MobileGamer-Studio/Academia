import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { colors, sizes } from '../constants/Data';
import { firestore } from "../constants/Sever";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

function ChatScreen({route, navigation}) {

    const receiver = route.params.rec;
    const userId = route.params.id;
    const [users, setUsers] = useState([])

    async function getUsers() {
        const querySnapshot = await getDocs(collection(firestore, "Users"));
        let data = []
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        });
        setUsers(data)
    }

    async function saveUsers() {
        for (const item of users) {
            await setDoc(doc(firestore, "Users", item.id), item);
        }
    }

    saveUsers().then(r => console.log(r));

    getUsers().then(r => console.log(r));

    let user = {}
    users.forEach((item) => {
        if (item.id === userId) {
            user = item
            console.log("got user: ${user}")
        }
    })



    //
    function sendMessage() {
        const newChat = "";
    }

    return (
        <View style={styles.container}>
            <ScrollView style = {{
                marginTop: sizes.ExtraLarge,
            }}>
                <Chat message="Hello Friends" user={user} userId={receiver.id} time = "10:20" />
                <Chat message="Hello You" user={user} userId={user.id} time="10:22" />
            </ScrollView>
            <View style = {styles.inputContainer}>
                <TextInput 
                    onChangeText={() => {console.log("text changed")}}
                    style={{
                        borderRadius: sizes.ExtraLarge,
                        marginHorizontal: 10,
                        paddingHorizontal: sizes.Small,
                        backgroundColor: colors.white,
                        height: 40,
                        width: "80%",
                        borderColor: colors.defaultBG4,
                        borderWidth: 1,
                    }}
                    placeholder="Message....." 
                />
                <TouchableOpacity onPress = {() => {}}>
                    <FontAwesome name="send" color={colors.defaultBG4} size={35} />
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
                    backgroundColor: colors.defaultBG4,
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
                    backgroundColor: colors.defaultBG4,
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
        backgroundColor: colors.white,
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        bottom: 0,
        marginHorizontal: 10,
        marginBottom: 20,
        justifyContent: "space-between",
    }
})