import React, {useState, useEffect} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal, StatusBar, Share} from 'react-native';
import {colors, sizes,      Chat} from '../constants/Data';
import {Button, ProductSmall, ProfilePicture, ProductHorizontal, SectionHeader, ButtomMenu} from '../constants/Components';
import { firestore } from "../constants/Sever";
import { setDoc, collection, onSnapshot, doc, updateDoc, arrayRemove, arrayUnion} from "firebase/firestore";
import { Entypo, MaterialIcons} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const theme = colors.lightTheme;
function AccountScreen({route, navigation}) {

    const userId = route.params.id;
    const accId = route.params.accId
    const [users, set_users] = useState([])
    const [products, setProducts] = useState([])
    const [user, set_user] = useState({})
    const [acc, setAcc] = useState({})
    const [chats, setChats] = useState([])
    const [chatList, setChatList] = useState([])
    const [menu_visibility, set_menu_visibility] = useState(false)
    const [loading, set_loading] = useState(true)

    const userRef = doc(firestore, "Users", userId);
    const accRef = doc(firestore, "Users", accId);


    //
    const [followingLength, setFollowingLength] = useState(0);
    const [followersLength, setFollowersLength] = useState(0);
    const [productsLength, setProductsLength] = useState(0);
    const [following, setFollowing] = useState(false)

    const [productsList, setProductsList] = useState([])

    const menu_item = [
        {
            title: 'Saved',
            action: () => { set_menu_visibility(false); navigation.navigate("Saved", { id: userId })},
            icon: 'bookmark',
            id: '0'
        },
        {
            title: 'Share',
            action: async () => {
                set_menu_visibility(false)
                try {
                    const result = await Share.share({
                        message: user.name + " is using Academia. Download it now! \n https://play.google.com/store/apps/details?id=com.academia",
                    });
                    if (result.action === Share.sharedAction) {
                        if (result.activityType) {
                            // shared with activity type of result.activityType
                        } else {
                            // shared
                        }
                    } else if (result.action === Share.dismissedAction) {
                        // dismissed
                    }
                } catch (error) {
                    alert(error.message);
                }
            },
            icon: 'share',
            id: '0'
        },
    ]

    useEffect(() => {
        const usersSub = onSnapshot(collection(firestore, "Users"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            //console.log("Current data: ", data);
            set_users(data)
        });

        const productsSub = onSnapshot(collection(firestore, "Products"), querySnapshot => {
            const data = []

            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            //console.log("Current data: ", data);
            setProducts(data)
        });


        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            set_user(doc.data())

            setFollowing(doc.data().following.includes(accId))

            setChatList(doc.data().chatList)
        });

        const accSub = onSnapshot(doc(firestore, "Users", accId), (doc) => {
            
            setAcc(doc.data())
            console.log(doc.data());

            if (doc.data().following.length !== 0) {
                setFollowingLength(doc.data().following.length)
            }

            if (doc.data().followers.length !== 0) {
                setFollowersLength(doc.data().followers.length)
            }

            if (doc.data().sellerInfo.productList.length !== 0) {
                setProductsLength(doc.data().sellerInfo.productList.length)
                setProductsList(doc.data().sellerInfo.productList)
            }

            if(acc !== {}){
                set_loading(false)
            }
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
        if (following === true && user.following.includes(accId)) {
            await updateDoc(userRef, {
                following: arrayRemove(accId)
            })

            await updateDoc(accRef, {
                followers: arrayRemove(userId)
            })

        }else if(following === false && user.following.includes(accId) === false){
            await updateDoc(userRef, {
                following: arrayUnion(accId)
            })

            await updateDoc(accRef, {
                followers: arrayUnion(userId)
            })
            
        }
    }

    async function saveData(id, path, data) {
        await setDoc(doc(firestore, path, id), data)
    }

    const list = []
    if (loading === false) {
        productsList.forEach((product) => {
            if (product !== undefined) {
                products.forEach((item) => {
                    if (item.id === product) {
                        list.push(item)
                    }
                })
            }
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar  backgroundColor={theme.bgColor} barStyle = 'light-content'/>
            <View style = {styles.userProfile}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <MaterialIcons name="arrow-back-ios" size={24} color={theme.color} style={{ marginLeft: 10 }} onPress={() => navigation.goBack()} />
                    <View style={{ alignSelf: "flex-end", marginBottom: 20 }}>

                        <TouchableOpacity onPress={() => set_menu_visibility(true)}>
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

            <ScrollView style={{
                backgroundColor: colors.color,
                bottom: 0,
            }}>
                {
                    list.length > 0 ? (
                        <View style={styles.section}>
                            <SectionHeader text={'Your Products'} method={() => navigation.navigate("Search", { id: userId })} color = {colors.white} textColor = {theme.bgColor}/>
                            <View style={{}}>
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item) => item.id}
                                    data={list}
                                    renderItem={({ item }) => {
                                        return (
                                            <ProductHorizontal title={item.title} image={item.image} price={item.price} discount={item.discount} seller={item.seller} rating={item.ratings} method={() => navigation.navigate('Product', { id: userId, productId: item.id })} />
                                        )
                                    }}
                                />
                            </View>
                        </View>
                    ) : null
                }
            </ScrollView>
            <ButtomMenu title = {'Menu'} show={menu_visibility} close={() => set_menu_visibility(false)} item_list={menu_item} />
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
        backgroundColor: colors.lightTheme.color,
        marginHorizontal: 5,
        marginTop: 20,
        width: 150,
        alignItems: "center",
    },

    follow_dark: {
        borderRadius: sizes.ExtraLarge,
        padding: 5,
        backgroundColor: colors.darkTheme.color,
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

    unfollow_dark: {
        borderRadius: sizes.ExtraLarge,
        borderWidth: 1,
        padding: 5,
        borderColor: colors.darkTheme.color,
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
