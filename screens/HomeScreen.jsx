import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView, Image,  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { categories, colors, sizes, suggestedProducts, images } from '../constants/Data';
import { NavBar, ProductCategory, ProductVertical, RoundButton, SearchBar, UserProfile } from '../constants/Components';
import { firestore } from "../constants/Sever";
import { collection, setDoc, doc, onSnapshot} from "firebase/firestore";
import { Entypo, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import mobileAds, { GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const theme = colors.lightTheme;
function HomeScreen({ route, navigation }) {
    const userId = route.params.id;
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [theme, setTheme ] = useState(colors.lightTheme)

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

        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            setUser(doc.data())
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


    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: colors.white,
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

                <TouchableOpacity style = {{
                    marginHorizontal: 15,
                }} onPress={() => navigation.navigate('Notifications', {id: userId})}>
                    <FontAwesome name="bell-o" size={24} color={theme.color} />
                </TouchableOpacity>
            </View>

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
                <View style={styles.section}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        data={categories}
                        renderItem={({item}) => {
                            return (
                                <ProductCategory
                                    text={item.name}
                                    method={() => navigation.navigate("Search", {item})}
                                />
                            )
                        }}
                    />
                </View>
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
                <View style={styles.section}>
                    <Text>Suggested</Text>
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
                <View style={styles.section}>
                    <Text>Best Sellers</Text>
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

                <View style={{
                    height: 100,
                    width: 100,
                    justifyContent: "center",
                }}>
                    <Image
                        style={{
                            flex: 1,
                            alignSelf: "center",
                        }}
                        resizeMode="contain"
                        source={{ uri: "https://firebasestorage.googleapis.com/v0/b/academia-c3d0e.appspot.com/o/Images%2FCameraIcon-coloured.png?alt=media&token=0ac47e13-7a64-466b-8027-1f9ae3b006d6" }}
                    />
                </View>
                
                
            </ScrollView>
            <NavBar
                home={() => navigation.navigate("Home", { id: userId })}
                search={() => navigation.navigate("Search", { search: "null" })}
                add={() => navigation.navigate("UploadProduct", { user: user })}
                cart={() => navigation.navigate("Cart", { user: user })}
                profile={() => navigation.navigate("UserAccount", { id: userId, user: user })}
                image = {user.profilePicture}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
        paddingVertical: sizes.ExtraLarge,
    },

    section: {
        marginVertical: sizes.ExtraSmall,
        borderBottomColor: theme.color,
        borderBottomWidth: 1,
    },

    sectionTitle: {
        fontSize: sizes.Large,
        fontWeight: "bold",
        color: theme.textColor,
        margin: sizes.ExtraSmall,
    },
})

export default HomeScreen;
