import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView, Image,  StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { categories, colors, sizes, suggestedProducts, images } from '../constants/Data';
import { NavBar, Loading, ProductHorizontal, ProductVertical, Button, ProfilePicture} from '../constants/Components';
import { firestore } from "../constants/Sever";
import { collection, setDoc, doc, onSnapshot} from "firebase/firestore";
import { Entypo, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mobileAds, { BannerAd, BannerAdSize, TestIds  } from 'react-native-google-mobile-ads';

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
            setNewProducts(doc.data().userInfo.feed.newProducts)
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
                <ScrollView showsVerticalScrollIndicator={false} style = {{
                    marginBottom: 50,
                }}>
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
                                        //numColumns={2}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item.id}
                                        data={sgProducts}
                                        renderItem={({ item }) => {
                                            return (
                                                <ProductHorizontal title = { item.title } image = { item.image } price = { item.price } discount = { item.discount } seller = { item.seller } rating = { item.ratings } method = {() => navigation.navigate('Product', { id: userId, productId: item.id })}/>
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                        ) : (
                                <View style={styles.section}>
                                    <SectionHeader text={'Suggested Products'} method= {() => navigation.navigate("Search", { id: userId })} />
                                    {
                                        defaultProducts.length === 0 ? (
                                        <TouchableOpacity style = {{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: theme.color2,
                                            borderRadius: 10,
                                            padding: 10,
                                            elevation: 1,
                                            width: 250,
                                            alignSelf: 'center',
                                        }}
                                        
                                                onPress={() => navigation.navigate("UploadProduct", { id: userId })}>
                                            <Text style={{ color: theme.bgColor }}>No Products Available</Text>
                                            <Text style={{ color: theme.bgColor }}>Upload Your First Product</Text>
                                        </TouchableOpacity>) : (
                                            <View>
                                                <FlatList
                                                    horizontal
                                                    
                                                    showsHorizontalScrollIndicator = { false }
                                                    keyExtractor = { (item) => item.id }
                                                    data = { defaultProducts }
                                                    renderItem = {
                                                        ({ item }) => {
                                                            return(
                                                            <ProductHorizontal title = { item.title } image = { item.image } price = { item.price } discount = { item.discount } seller = { item.seller } rating = { item.ratings } method = {() => navigation.navigate('Product', { id: userId, productId: item.id })}/>
                                                )
                                                    }}

                                                />
                                            </View>
                                            )
                                    }
                                </View>
                        )
                    }
                    {
                        sgUsers.length > 0 ? (
                            <View style={styles.section}>
                                <SectionHeader text={'Suggested Users'} method={() => navigation.navigate("Search", { id: userId })} />
                                <View>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item.id}
                                        data={sgUsers}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style = {{
                                                    backgroundColor: theme.color2,
                                                    elevation: 2,
                                                    height: 150,
                                                    width: 100,
                                                    borderRadius: sizes.Small,
                                                    alignItems: 'center',
                                                    justifyContent: 'space-evenly',
                                                    margin: 10,
                                                }}>
                                                    <ProfilePicture image = {item.profilePicture} height = {70} width = {70}/>
                                                    <View style = {{
                                                        alignItems: 'center',

                                                    }}>
                                                        <Text style = {{color: theme.bgColor}}>{item.name}</Text>
                                                        <Text style = {{color: theme.bgColor}}>{item.sellerInfo.rating + ' Stars'}</Text>
                                                    </View>
                                                </View>
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
                                <SectionHeader text={'Best Sellers'} method={() => navigation.navigate("Search", { id: userId })} />
                                <View style={{}}>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item.id}
                                        data={bs}
                                        renderItem={({ item }) => {
                                            return (
                                                <ProductVertical title={item.title} image={item.image} price={item.price} discount={item.discount} seller={item.seller} rating={item.ratings} method={() => navigation.navigate('Product', { id: userId, productId: item.id })} />
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
                                <SectionHeader text={'Recent Activity'} method={() => navigation.navigate("Search", { id: userId })} />
                                <View style={{}}>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item.id}
                                        data={categories}
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
                        sls.length > 0 ? (
                            <View style={styles.section}>
                                <SectionHeader text={'On Sales'} method={() => navigation.navigate("Search", { id: userId })} />
                                <View style={{}}>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item.id}
                                        data={categories}
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
                        newP.length > 0 ? (
                            <View style={styles.section}>
                                <SectionHeader text={'New Products'} method={() => navigation.navigate("Search", { id: userId })} />
                                <View style={{}}>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item.id}
                                        data={categories}
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
                        crt.length > 0 ? (
                            <View style={styles.section}>
                                <SectionHeader text={'Your Cart'} method={() => navigation.navigate("Search", { id: userId })} />
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
                    <BannerAd
                        unitId={TestIds.BANNER}
                        size={BannerAdSize.FULL_BANNER}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}/>


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
                color: theme.color2,
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
