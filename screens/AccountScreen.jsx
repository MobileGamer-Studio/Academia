import React, {useState, useEffect} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import {colors, sizes, testUsers, testProducts, Chat} from '../constants/Data';
import {Button, ProductSmall, ProfilePicture, ProductVertical} from '../constants/Components';
import { firestore } from "../constants/Sever";
import { setDoc, collection, onSnapshot, doc} from "firebase/firestore";
import { Entypo, MaterialIcons} from '@expo/vector-icons';

const theme = colors.lightTheme;
function AccountScreen({route, navigation}) {

    const userId = route.params.id;
    const accId = route.params.accId
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [acc, setAcc] = useState({})
    const [chats, setChats] = useState([])
    const [chatList, setChatList] = useState([])
    const [optionsAct, setOptionsAct] = useState(false)


    //
    const [followingLength, setFollowingLength] = useState(0);
    const [followersLength, setFollowersLength] = useState(0);
    const [productsLength, setProductsLength] = useState(0);
    const [following, setFollowing] = useState(false)

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

            if (doc.data().following.length !== 0 && doc.data().following.includes(accId)) {
                setFollowing(true)
            }else{
                setFollowing(false)
            }

            if (doc.data().following.length !== 0) {
                setFollowingLength(doc.data().following.length)
            }

            if (doc.data().followers.length !== 0) {
                setFollowersLength(doc.data().followers.length)
            }

            if (doc.data().sellerInfo.productList.length !== 0) {
                setProductsLength(doc.data().sellerInfo.productList.length)
            }

            if (doc.data().following.includes(accId) === true) {
                setFollowing(true)
            } else {
                setFollowing(false)
            }

            setChatList(doc.data().chatList)
        });

        const accSub = onSnapshot(doc(firestore, "Users", accId), (doc) => {
            setAcc(doc.data())
        });

        const chatsSub = onSnapshot(collection(firestore, "Chats"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            setChats(data)
        });

        
    }, [])

    async function follow() {
        if (following === true) {
            user.followers.splice(user.following.indexOf(acc.id), 1)
            acc.following.splice(user.following.indexOf(user.id), 1)
            await setDoc(doc(firestore, 'Users', userId), user)
            await setDoc(doc(firestore, 'Users', accId), acc)
        }else{
            user.followers.push(acc.id)
            acc.following.push(user.id)
            await setDoc(doc(firestore, 'Users', userId), user)
            await setDoc(doc(firestore, 'Users', accId), acc)
            
        }
    }

    async function saveData(id, path, data) {
        await setDoc(doc(firestore, path, id), data)
    }

    return (
        <View style={styles.container}>
            <Modal
                visible={optionsAct}
                animationType="slide"
                transparent={true}
            >
                <View style={{
                    backgroundColor: colors.white,
                    elevation: 5,
                    width: "80%",
                    margin: 100,
                    alignSelf: "center",
                    borderRadius: 10,
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        margin: 10,
                    }}>
                        <TouchableOpacity onPress={() => setOptionsAct(false)}>
                            <MaterialIcons name="close" size={24} color={colors.defaultBG} />
                        </TouchableOpacity>
                    </View>
                    <View showsVerticalScrollIndicator={false}>
                        <TouchableOpacity style={styles.popUpSection} onPress={() => navigation.navigate("Saved", { id: userId })}>
                            <MaterialIcons name="bookmark" size={24} color={colors.defaultBG} />
                            <Text style={{ color: theme.outline, marginHorizontal: 2.5 }}>Saved</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.popUpSection}>
                            <MaterialIcons name="share" size={24} color={colors.defaultBG} />
                            <Text style={{ color: theme.outline, marginHorizontal: 2.5 }}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style = {styles.userProfile}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <MaterialIcons name="arrow-back-ios" size={24} color={theme.color} style={{ marginLeft: 10 }} onPress={() => navigation.goBack()} />
                    <View style={{ alignSelf: "flex-end", marginBottom: 20 }}>

                        <TouchableOpacity onPress={() => setOptionsAct(true)}>
                            <Entypo name="dots-three-vertical" size={24} color={theme.color} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style = {{
                    alignItems: "center",
                }}>
                    <ProfilePicture color={theme.bgColor} image={acc.profilePicture} height = {100} width = {100}/>
                    <Text style={{ color: theme.color, fontSize: 20 }}>{acc.name}</Text>
                </View>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',

                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 10,
                    }}>
                        <TouchableOpacity style={{
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}
                        
                        onPress = {() => navigation.navigate("Following", {id: accId})}>
                            <Text style={{ color: theme.color }}>Following</Text>
                            <Text style={{ color: theme.color }}>{followingLength}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}
                        
                        onPress = {() => navigation.navigate("Followers", {id: accId})}>
                            <Text style={{ color: theme.color }}>Followers</Text>
                            <Text style={{ color: theme.color }}>{ followersLength }</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}
                        
                            onPress={() => navigation.navigate("ProductList", { id: accId })}>
                            <Text style={{ color: theme.color }}>Products</Text>
                            <Text style={{ color: theme.color }}>{productsLength}</Text>
                        </TouchableOpacity>

                    </View>
                    <View>
                        <Text style={{ color: theme.color }}>{acc.description}</Text>
                    </View>
                    <View style = {{flexDirection: "row"}}>
                        {following === true ? <Button
                            style={styles.unfollow}
                            method={() => follow()}
                            text={"Unfollow"}
                            textStyle={{ color: theme.color, fontSize: sizes.Medium }}
                        /> : <Button
                            style={styles.follow}
                            method={() => follow()}
                            text={"Follow"}
                                textStyle={{ color: theme.bgColor, fontSize: sizes.Medium }}
                        />}
                        <Button
                            style={styles.message_btn}
                            method={() => {
                                if (chatList.includes(userId + "-" + accId)) {
                                    navigation.navigate('Chat', { chatId: userId + "-" + accId, id: userId, recId: accId})
                                } else if (chatList.includes(accId + "-" + userId)) {
                                    navigation.navigate('Chat', { chatId: accId + "-" + userId, id: userId, recId: accId })
                                } else{
                                    const newChat = Chat;
                                    newChat.id = userId + "-" + accId;

                                    newChat.members.push(userId, accId)

                                    newChat.members.forEach(y => {
                                        users.forEach(x => {
                                            if (x.id === y) {
                                                x.chatList.push(newChat.id)
                                                saveData(x.id, "Users", x)
                                            }
                                        })
                                    })
                                    saveData(newChat.id, "Chats", newChat)
                                    navigation.navigate('Chat', { chatId: newChat.id, id: userId, recId: accId })
                                }
                            }}
                            text={"Message"}
                            textStyle={{ color: theme.color, fontSize: sizes.Medium }}
                            // icon = {"chat"}
                            // iconColor ={theme.color}
                            // iconSize = {sizes.Medium}
                        />
                    </View>
                </View>
            </View>

            <View>
                <Text style={{ marginLeft: 15, marginTop: 15, fontSize: 25, color: colors.white }}>Products</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={[]}
                    renderItem={({ item }) => {
                        return (
                            <ProductVertical
                                product={item}
                                title={item.title}
                                price={item.price}
                                image={item.image}
                                seller={item.seller}
                                method={() => navigation.navigate("Product", { item })}
                            />
                        )
                    }}
                />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color,
    },

    follow: {
        borderRadius: sizes.ExtraLarge,
        padding: 5,
        backgroundColor: theme.color,
        marginHorizontal: 5,
        marginTop: 20,
        width: 150,
        alignItems: "center",
    },

    unfollow: {
        borderRadius: sizes.ExtraLarge,
        borderWidth: 1,
        padding: 5,
        borderColor: theme.color,
        marginHorizontal: 5,
        marginTop: 20,
        width: 150,
        alignItems: "center",
    },

    message_btn: {
        borderRadius: sizes.ExtraLarge,
        borderWidth: 1,
        padding: 5,
        borderColor: theme.color,
        marginHorizontal: 5,
        marginTop: 20,
        width: 150,
        alignItems: "center",
    },

    userProfile: {
        flexDirection: 'column',
        padding: sizes.Small,
        justifyContent: 'space-between',
        backgroundColor: theme.bgColor,
        borderBottomLeftRadius: 75,
        borderBottomRightRadius: 75,
        paddingTop: 10,
        paddingBottom: 50,
    },

    popUpSection: {
        borderTopColor: theme.outline,
        borderTopWidth: 1,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },
});

export default AccountScreen;
