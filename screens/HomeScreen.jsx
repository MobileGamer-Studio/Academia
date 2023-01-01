import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView, Image,  StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { categories, colors, sizes, suggestedProducts, images } from '../constants/Data';
import { NavBar, Loading} from '../constants/Components';
import { firestore } from "../constants/Sever";
import { collection, setDoc, doc, onSnapshot} from "firebase/firestore";
import { Entypo, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDerivedValue } from 'react-native-reanimated';
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


            if(user !== {}){
                setLoading(false)
            }
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
                <Header method={() => navigation.navigate('Notifications', { id: userId })} />
                <Loading />
                <NavBar
                    home={() => navigation.navigate("Home", { id: userId })}
                    search={() => navigation.navigate("Search", { id: userId })}
                    add={() => navigation.navigate("UploadProduct", { id: userId })}
                    cart={() => navigation.navigate("Cart", { id: userId })}
                    profile={() => navigation.navigate("UserAccount", { id: userId, user: user })}
                    image={"https://firebasestorage.googleapis.com/v0/b/academia-c3d0e.appspot.com/o/Images%2FProfile%2FprofileIcon.png?alt=media&token=d0c063e1-d61e-4630-a6af-bba57f100d9d"}
                />
            </View>
        )
    }else{

        const sgUsers = []
        const sgProducts = []
        const act = []
        const sls = []
        const newP = []
        const crt = []
        const bs = []

        const defaultProducts = products.slice(0, 9)

        suggestedUsers.forEach((item) => {
            users.forEach((user) => {
                if (item === user.id) {
                    sgUsers.push(user)
                }
            })
        })

        suggestedProducts.forEach((item) => {
            products.forEach((product) => {
                if (item === product.id) {
                    sgProducts.push(product)
                }
            })
        })

        activity.forEach((item) => {
            products.forEach((product) => {
                if (item === product.id) {
                    act.push(product)
                }
            })
        })

        sales.forEach((item) => {
            products.forEach((product) => {
                if (item === product.id) {
                    sls.push(product)
                }
            })
        })

        newProducts.forEach((item) => {
            products.forEach((product) => {
                if (item === product.id) {
                    newP.push(product)
                }
            })
        })

        cart.forEach((item) => {
            products.forEach((product) => {
                if (item === product.id) {
                    crt.push(product)
                }
            })
        })

        bestSellers.forEach((item) => {
            products.forEach((product) => {
                if (item === product.id) {
                    bs.push(product)
                }
            })
        })



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
                    <View>
                        
                    </View>
                    {
                        sgProducts.length > 0 ? (
                            <View style={styles.section}>
                                <SectionHeader text = {'Suggested Products'}/>
                                <View>
                                    <FlatList
                                        horizontal
                                        numColumns={2}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item.id}
                                        data={sgProducts}
                                        renderItem={({ item }) => {
                                            return (
                                                <ProductHorizontal item = {item}/>
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                        ) : (
                                <View style={styles.section}>
                                    <SectionHeader text={'Suggested Products'} method= {() => navigation.navigate("Search", { id: userId })} />
                                    <FlatList
                                        horizontal
                                        
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item.id}
                                        data={defaultProducts}
                                        renderItem={({ item }) => {
                                            return (
                                                <ProductHorizontal title={item.title} image={item.image} price={item.price} discount = {item.discount} seller={item.seller} rating={item.ratings} method={() => navigation.navigate('Product', { id: userId, productId: item.id })}/>
                                            )
                                        }}

                                    />
                                </View>
                        )
                    }
                    {
                        sgUsers.length > 0 ? (
                            <View style={styles.section}>
                                <Text>Check Out</Text>
                                <View>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item.id}
                                        data={sgUsers}
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
                        bs.length > 0 ? (
                            <View style={styles.section}>
                                <Text>Check Out</Text>
                                <View style={{}}>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item.id}
                                        data={bs}
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
                        act.length > 0 ? (
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
                        sls.length > 0 ? (
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
                        newP.length > 0 ? (
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
                        crt.length > 0 ? (
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

function SectionHeader(props){
    return(
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
        }}>
            <Text style={{
                marginHorizontal: 10,
                fontSize: 20,
            }}>{props.text}</Text>
            <TouchableOpacity style={{
                marginHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
            }} onPress = {props.method}>
                <Text style={{ fontSize: 12, color: theme.outline }}>See More</Text>
                <MaterialIcons name="arrow-forward-ios" size={10} color={theme.outline} style={{ marginLeft: 5 }} onPress={() => navigation.goBack()} />
            </TouchableOpacity>
        </View>
    )
}

export function ProductVertical(props){
    return(
        <TouchableOpacity style={{
            backgroundColor: theme.bgColor,
            borderRadius: sizes.ExtraSmall,
            width: 150,
            height: 200,
            padding: 5,
            marginVertical: 5,
            marginHorizontal: 10,
            elevation: 1,
        }} onPress={props.method}>
            <View style={{
                height: 100,
                width: 100,
                alignSelf: "center",
                alignItems: "center",
            }}>
                <Image
                    style={{
                        flex: 1,
                        height: 70,
                        width: 70,
                    }}
                    resizeMode="contain"
                    source={{ uri: props.image }} />
            </View>
            <View style={{
                margin: 5,
                height: 80,
                justifyContent: "center",
            }}>
                {
                    props.title.length < 15 ? (
                        <Text style={{ fontSize: sizes.Small }}>{props.title}</Text>
                    ) : (
                            <Text style={{ fontSize: sizes.Small }}>{props.title.slice(0, 15)+'...'}</Text>
                    )
                }
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontSize: sizes.ExtraSmall }}>{props.rating + " star"}</Text>
                    <Text style={{ fontSize: 12 }}>{props.price + ' Naira'}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export function ProductHorizontal(props){
    return(
        <TouchableOpacity style = {{
            backgroundColor: theme.color2,
            borderRadius: sizes.ExtraSmall,
            flexDirection: 'row',
            margin: 5,
            elevation: 1,
            width: 250,
        }}
        
            onPress={props.method}>
            <View style={{
                height: 100,
                width: 100,
                alignSelf: "center",
                alignItems: "center",
                backgroundColor: theme.bgColor,
                borderRadius: sizes.ExtraSmall,
                margin: 5,
                padding: 5,
            }}>
                <Image
                    style={{
                        flex: 1,
                        height: 70,
                        width: 70,
                    }}
                    resizeMode="contain"
                    source={{ uri: props.image }} />
            </View>
            <View style = {{
                marginHorizontal: 10,
                marginVertical: 5,
            }}>
                {
                    props.title.length < 10? (
                        <Text style={{ fontSize: sizes.Small, color: theme.bgColor }}>{props.title}</Text>
                    ) : (
                            <Text style={{ fontSize: sizes.Small, color: theme.bgColor }}>{props.title.slice(0, 10) + '...'}</Text>
                    )
                }
                <Text style={{ color: theme.bgColor, fontSize: sizes.ExtraSmall }}>{props.rating + " star"}</Text>
                {
                    props.discount === 0 ? (
                        <View>
                            <Text style={{ color: theme.bgColor, fontSize: 12}}>{props.price + ' Naira'}</Text>
                        </View>
                    ):(
                            <View>
                                <Text style={{ color: theme.bgColor, fontSize: 12, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{props.price + ' Naira'}</Text>
                                <Text style={{ color: theme.bgColor, fontSize: 12 }}>{(props.price -(props.discount/100*props.price)) + ' Naira'}</Text>

                                <View style = {{
                                    backgroundColor: theme.bgColor,
                                    alignItems: 'center',
                                    borderRadius: sizes.ExtraSmall,
                                }}>
                                    <Text style = {{}}>{'-'+props.discount+'% discount'}</Text>
                                </View>
                            </View>
                    )
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
    },

    section: {
        marginVertical: sizes.ExtraSmall,
        // borderBottomColor: theme.outline3,
        // borderBottomWidth: 5,
    },
})

export default HomeScreen;
