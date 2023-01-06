import React, { useState, useEffect} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList, Modal, Share, StatusBar } from 'react-native'
import { colors, sizes } from '../constants/Data'
import { RoundButton, ProductHorizontal, SectionHeader } from "../constants/Components";
import { firestore, logOut } from "../constants/Sever";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { LineChart, ProgressChart } from 'react-native-chart-kit';

const theme = colors.lightTheme;
function UserAccount({ route, navigation }) {
    const [optionsAct, setOptionsAct] = useState(false)

    const userId = route.params.id;
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    //
    const [followingLength, setFollowingLength] = useState(0);
    const [followersLength, setFollowersLength] = useState(0);
    const [productsLength, setProductsLength] = useState(0);

    const [productsList, setProductsList] = useState([]);


    useEffect(() => {
        const usersSub = onSnapshot(collection(firestore, "Users"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            //console.log("Current data: ", data);
            setUsers(data)
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
            setUser(doc.data())

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

            if (user !== {}) {
                setLoading(false)
            }
        });

    }, [])
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

    //Return
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={theme.color}
                barStyle='light-content'
            />
            <View style={{
                flexDirection: 'column',
                padding: sizes.Small,
                justifyContent: 'space-between',
                backgroundColor: theme.color,
                borderBottomLeftRadius: 75,
                borderBottomRightRadius: 75,
                paddingBottom: 50,
                paddingTop: 10,
                marginBottom: 10,
            }}>
                <Modal 
                    visible = {optionsAct}
                    animationType = "slide"
                    transparent = {true}
                    
                >
                    <View style = {{
                        backgroundColor: colors.white,
                        elevation: 5,
                        width: "80%",
                        margin: 100,
                        alignSelf: "center",
                        borderRadius: 10,
                    }}>
                        <View style = {{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            margin: 10,
                        }}>
                            <TouchableOpacity onPress={() => setOptionsAct(false)}>
                                <MaterialIcons name="close" size={24} color={colors.defaultBG} />
                            </TouchableOpacity>
                        </View>
                        <View showsVerticalScrollIndicator={false}>
                            <TouchableOpacity style = {styles.popUpSection} onPress = {() => {setOptionsAct(false); navigation.navigate("Settings", {id: userId})}}>
                                <MaterialIcons name="settings" size={24} color={colors.defaultBG} />
                                <Text style={{ color: theme.outline, marginHorizontal: 2.5 }}>Settigs</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.popUpSection} onPress={() => { setOptionsAct(false); navigation.navigate("Saved", { id: userId })}}>
                                <MaterialIcons name="bookmark" size={24} color={colors.defaultBG} />
                                <Text style={{ color: theme.outline, marginHorizontal: 2.5 }}>Saved</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.popUpSection} onPress={() => { setOptionsAct(false); navigation.navigate("Checkout", { id: userId })}}>
                                <MaterialIcons name="cart" size={24} color={colors.defaultBG} />
                                <Text style={{ color: theme.outline, marginHorizontal: 2.5 }}>Check Out</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.popUpSection} onPress={() => { setOptionsAct(false); navigation.navigate("EditProfile", { id: userId })}}>
                                <MaterialIcons name="edit" size={24} color={colors.defaultBG} />
                                <Text style={{ color: theme.outline, marginHorizontal: 2.5 }}>Edit Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.popUpSection} onPress = {async () => {
                                setOptionsAct(false)
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
                            }}>
                                <MaterialIcons name="share" size={24} color={colors.defaultBG} />
                                <Text style={{ color: theme.outline, marginHorizontal: 2.5 }}>Share</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.popUpSection} onPress={() => {
                                setOptionsAct(false)
                                logOut()
                                navigation.navigate("Loading");
                            }}>
                                <MaterialIcons name="logout" size={24} color={colors.defaultBG} />
                                <Text style={{ color: theme.outline, marginHorizontal: 2.5 }}>LogOut</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <MaterialIcons name="arrow-back-ios" size={24} color={colors.white} style={{ marginLeft: 10}} onPress = {() => navigation.goBack()}/>
                    <View style={{ alignSelf: "flex-end", marginBottom: 20 }}>

                        <TouchableOpacity onPress={() => setOptionsAct(true)}>
                            <Entypo name="dots-three-vertical" size={24} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'column',
                    alignItems: 'center',

                }}>

                    <RoundButton
                        image={user.profilePicture}
                        height={100}
                        width={100}
                        color={colors.white}
                        method={() => navigation.navigate("EditProfile", { id: userId })}
                    />
                    <Text style={{ color: colors.white, fontSize: 20 }}>{user.name}</Text>
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

                            onPress={() => navigation.navigate("Following", { id: userId })}>
                            <Text style={{ color: theme.bgColor }}>Following</Text>
                            <Text style={{ color: theme.bgColor }}>{followingLength}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}

                            onPress={() => navigation.navigate("Followers", { id: userId })}>
                            <Text style={{ color: theme.bgColor }}>Followers</Text>
                            <Text style={{ color: theme.bgColor }}>{followersLength}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}
                        
                            onPress={() => navigation.navigate("ProductList", { id: userId })}>
                            <Text style={{ color: theme.bgColor }}>Products</Text>
                            <Text style={{ color: theme.bgColor }}>{productsLength}</Text>
                        </TouchableOpacity>

                    </View>
                    <View>
                        <Text style={{ color: colors.white }}>{user.description}</Text>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        margin: 10,
                    }}>
                        <MaterialIcons name="location-on" size={24} color={colors.white} />
                        <Text style={{ color: colors.white }}>{user.location}</Text>
                    </View>
                    
                </View>
            </View>
            <ScrollView style={{
                backgroundColor: colors.white,
                bottom: 0,
            }}>
                {
                    list.length > 0 ? (
                        <View style={styles.section}>
                            <SectionHeader text={'Your Products'} method={() => navigation.navigate("Search", { id: userId })} />
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
            
            <View style={{
                alignItems: "center",
                backgroundColor: theme.color,
                borderRadius: 100,
                position: "absolute",
                bottom: sizes.Small,
                right: sizes.Small,
                padding: sizes.ExtraSmall,
                
            }}>
                <TouchableOpacity onPress={() => navigation.navigate("Chats", { id: userId, user: user })}>
                    <MaterialIcons name="chat" size={30} color={colors.white} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default UserAccount;


const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.bgColor,
        flex: 1,
        justifyContent: "flex-start",
    },

    section: {
        marginVertical: sizes.ExtraSmall,
        // borderTopWidth: 1,
        // borderColor: theme.outline,
    },

    popUpSection: {
        borderTopColor: theme.outline,
        borderTopWidth: 1,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },
});
