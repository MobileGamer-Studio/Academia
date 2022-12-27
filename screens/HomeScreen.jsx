import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView, Image,  StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { categories, colors, sizes, suggestedProducts, images } from '../constants/Data';
import { NavBar, ProductCategory, ProductVertical, RoundButton, SearchBar, UserProfile, Loading} from '../constants/Components';
import { firestore } from "../constants/Sever";
import { collection, setDoc, doc, onSnapshot} from "firebase/firestore";
import { Entypo, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import mobileAds, { GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const theme = colors.lightTheme;
function HomeScreen({ route, navigation }) {
    const userId = route.params.id;
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    const [suggestedProducts, setSuggestedProducts] = useState([])
    const [suggestedUsers, setSuggestedUsers] = useState([])
    const [activity, setActivity] = useState([])
    const [sales, setSales] = useState([])
    const [newProducts, setNewProducts] = useState([])
    const [cart, setCart] = useState([])
    const [bestSellers, setBestSellers] = useState([])



    const bannerAdId = 'ca-app-pub-4268026028349874/3147738671';


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

            setSuggestedUsers(doc.data().userInfo.feed.suggestedUsers)
            setSuggestedProducts(doc.data().userInfo.feed.suggestedProducts)
            setActivity(doc.data().userInfo.feed.activity)
            setSales(doc.data().userInfo.feed.sales)
            setNewProducts(doc.data().userInfo.feed.new)
            setCart(doc.data().userInfo.cart)
            setBestSellers(doc.data().userInfo.feed.bestSellers)


            setLoading(false)
        });
        // mobileAds()
        //     .initialize()
        //     .setRequestConfiguration({
        //         testDeviceIdentifiers: ['EMULATOR'],
        //     })
        //     .then(adapterStatuses => {
        //         // Initialization complete!
        //     });

    }, [])


    if (loading === true) {
        return (
            <View style={styles.container}>
                <Loading />
            </View>
        )
    }else{
        return (
            <View style={styles.container}>
                <Header method = {() => navigation.navigate('Notifications', { id: userId })} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        {/* <GAMBannerAd
                        unitId={bannerAdId}
                        sizes={[BannerAdSize.FULL_BANNER]}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,

                        }}
                    /> */}
                    </View>
                    {
                        suggestedProducts.length > 0 ? (
                            <View style={styles.section}>
                                <Text>Check Out</Text>
                                <View style={{}}>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item.id}
                                        data={categories}
                                        renderItem={({ item }) => {
                                            return (
                                                <View></View>
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                        ) : (
                                <View style={styles.section}>
                                    <Text>Products</Text>
                                    <View style={{}}>
                                        <FlatList
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            keyExtractor={(item) => item.id}
                                            data={products}
                                            renderItem={({ item }) => {
                                                return (
                                                    <View>
                                                        <Text>{item.title}</Text>
                                                    </View>
                                                )
                                            }}
                                        />
                                    </View>
                                </View>
                        )
                    }
                    {
                        suggestedUsers.length > 0 ? (
                            <View style={styles.section}>
                                <Text>Check Out</Text>
                                <View style={{}}>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item.id}
                                        data={categories}
                                        renderItem={({ item }) => {
                                            return (
                                                <View></View>
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                        ) : null
                    }
                    {
                        bestSellers.length > 0 ? (
                            <View style={styles.section}>
                                <Text>Check Out</Text>
                                <View style={{}}>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item.id}
                                        data={categories}
                                        renderItem={({ item }) => {
                                            return (
                                                <View></View>
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                        ) : null
                    }
                    {
                        activity.length > 0 ? (
                            <View style={styles.section}>
                                <Text>Check Out</Text>
                                <View style={{}}>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item.id}
                                        data={categories}
                                        renderItem={({ item }) => {
                                            return (
                                                <View></View>
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                        ) : null
                    }
                    {
                        sales.length > 0 ? (
                            <View style={styles.section}>
                                <Text>Check Out</Text>
                                <View style={{}}>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item.id}
                                        data={categories}
                                        renderItem={({ item }) => {
                                            return (
                                                <View></View>
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                        ) : null
                    }
                    {
                        newProducts.length > 0 ? (
                            <View style={styles.section}>
                                <Text>Check Out</Text>
                                <View style={{}}>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item.id}
                                        data={categories}
                                        renderItem={({ item }) => {
                                            return (
                                                <View></View>
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                        ) : null
                    }
                    {
                        cart.length > 0 ? (
                            <View style={styles.section}>
                                <Text>Check Out</Text>
                                <View style={{}}>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item.id}
                                        data={categories}
                                        renderItem={({ item }) => {
                                            return (
                                                <View></View>
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                        ) : null
                    }


                </ScrollView>
                <NavBar
                    home={() => navigation.navigate("Home", { id: userId })}
                    search={() => navigation.navigate("Search", { id: userId })}
                    add={() => navigation.navigate("UploadProduct", { id: userId })}
                    cart={() => navigation.navigate("Cart", { id: userId })}
                    profile={() => navigation.navigate("UserAccount", { id: userId, user: user })}
                    image={user.profilePicture}
                />
            </View>
        );
    }
}


function Header(props){
    return(
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: colors.white,
            paddingTop: 40,
            paddingBottom: 5,
            elevation: 0,
            borderBottomColor: theme.outline,
            borderBottomWidth: 1,
            marginBottom: 10,
        }}>
            <View style={{
                height: 35,
                width: 200,
                justifyContent: "center",
            }}>
                <Image
                    style={{
                        flex: 1,
                        alignSelf: "center",
                    }}
                    resizeMode="contain"
                    source={images.academia}
                />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{
                    marginHorizontal: 15,
                }} onPress={props.method}>
                    <FontAwesome name="bell-o" size={24} color={theme.color} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
    },

    section: {
        marginVertical: sizes.ExtraSmall,
        borderBottomColor: theme.outline2,
        borderBottomWidth: 5,
    },

    sectionTitle: {
        fontSize: sizes.Large,
        fontWeight: "bold",
        color: theme.textColor,
        margin: sizes.ExtraSmall,
    },
})

export default HomeScreen;
