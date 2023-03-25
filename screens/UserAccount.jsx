import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList, Modal, Share, StatusBar } from 'react-native'
import { colors, sizes } from '../constants/Data'
import { ButtomMenu, RoundButton, ProductHorizontal, SectionHeader } from "../constants/Components";
import { firestore, logOut } from "../constants/Sever";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { MaterialIcons, Entypo, FontAwesome } from "@expo/vector-icons";
import { LineChart, ProgressChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';

const theme = colors.lightTheme;
function UserAccount({ route, navigation }) {
    const [menu_visibility, set_menu_visibility] = useState(false)

    const userId = route.params.id;
    const [users, set_users] = useState([])
    const [user, set_user] = useState({})
    const [products, setProducts] = useState([])
    const [loading, set_loading] = useState(true)

    //
    const [followingLength, setFollowingLength] = useState(0);
    const [followersLength, setFollowersLength] = useState(0);
    const [productsLength, setProductsLength] = useState(0);

    const [productsList, setProductsList] = useState([]);
    const [LikedList, setLikedList] = useState([]);

    const menu_item = [
        {
            title: 'Settings',
            action: () => {set_menu_visibility(false); navigation.navigate("Settings", { id: userId }) },
            icon: 'settings',
            id: '0'
        },
        {
            title: 'Saved',
            action: () => { set_menu_visibility(false); navigation.navigate("Saved", { id: userId })},
            icon: 'bookmark',
            id: '1'
        },
        {
            title: 'Check Out',
            action: () => {set_menu_visibility(false); navigation.navigate("Checkout", { id: userId }) },
            icon: 'shopping-cart',
            id: '2'
        },
        {
            title: 'Edit Profile',
            action: () => { set_menu_visibility(false); navigation.navigate("EditProfile", { id: userId })},
            icon: 'edit',
            id: '3'
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
            id: '4'
        },
        {
            title: 'Log Out',
            action: () => {
                set_menu_visibility(false)
                logOut()
                navigation.navigate("Loading");
            },
            icon: 'logout',
            id: '5'
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

            if (doc.data().following.length !== 0) {
                setFollowingLength(doc.data().following.length)
            }

            if (doc.data().followers.length !== 0) {
                setFollowersLength(doc.data().followers.length)
            }

            if (doc.data().sellerInfo.productList.length !== 0) {
                setProductsLength(doc.data().sellerInfo.productList.length)
                setProductsList(doc.data().sellerInfo.productList)
                setLikedList(doc.data().userInfo.liked)
            }

            if (user !== {}) {
                set_loading(false)
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

    const liked = []
    if (loading === false) {
        LikedList.forEach((product) => {
            if (product !== undefined) {
                products.forEach((item) => {
                    if (item.id === product) {
                        liked.push(item)
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
            <LinearGradient colors={[theme.color, theme.color2]} style={{
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

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <MaterialIcons name="arrow-back-ios" size={24} color={colors.white} style={{ marginLeft: 10 }} onPress={() => navigation.goBack()} />
                    <View style={{ alignSelf: "flex-end", marginBottom: 20 }}>

                        <TouchableOpacity onPress={() => set_menu_visibility(true)}>
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
            </LinearGradient>
            <ScrollView style={{
                backgroundColor: colors.white,
                bottom: 0,
            }}>
                {
                    list.length > 0 ? (
                        <View style={styles.section}>
                            <SectionHeader text={'Your Products'} color={theme.outline} textColor={theme.color2} method={() => navigation.navigate("Search", { id: userId })} />
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
                {
                    liked.length !== 0 ? (
                        <View>
                            <View style={styles.section}>
                                <SectionHeader text={'Liked Products'} color={theme.outline} textColor={theme.color2} method={() => navigation.navigate("Search", { id: userId })}/>
                                <View>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item.id}
                                        data={liked}
                                        renderItem={({ item }) => {
                                            return (
                                                <ProductHorizontal title={item.title} image={item.image} price={item.price} discount={item.discount} seller={item.seller} rating={item.ratings} method={() => navigation.navigate('Product', { id: userId, productId: item.id })} />
                                            )
                                        }}
                                    />
                                </View>
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
            <ButtomMenu title = {'Menu'} show={menu_visibility} close={() => set_menu_visibility(false)} item_list={menu_item} />
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
