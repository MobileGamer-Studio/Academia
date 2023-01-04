import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, StatusBar } from 'react-native';
import { colors, sizes, images } from '../constants/Data';
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { SearchBar, ProfilePicture, Header, Loading, Button, ProductVertical, ProductHorizontal, SectionHeader } from '../constants/Components';
import { firestore } from "../constants/Sever";
import { getDocs, collection, setDoc, doc, onSnapshot } from "firebase/firestore";

const theme = colors.lightTheme;
function SavedScreen({ navigation, route }) {
    const userId = route.params.id;
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    const [savedList, setSavedList] = useState([])
    const [likedList, setLikedList] = useState([])

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

            setSavedList(doc.data().userInfo.savedList)
            setLikedList(doc.data().userInfo.liked)

            if (user !== {}) {
                setLoading(false)
            }
        });


    }, [])

    if (loading === true) {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={theme.color}
                    barStyle='light-content'
                />
                <Header method={() => navigation.goBack()} text={'Saved'} />
                <Loading />
            </View>
        )
    } else {

        const liked = []
        const saved = []

        likedList.forEach((item) => {
            products.forEach((product) => {
                if (item === product.id) {
                    liked.push(product)
                }
            })
        })

        savedList.forEach((item) => {
            products.forEach((product) => {
                if (item === product.id) {
                    saved.push(product)
                }
            })
        })


        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={theme.color}
                    barStyle='light-content'
                />
                <Header method={() => navigation.goBack()} text={'Saved'} />
                {
                    saved.length !== 0 || liked.length !== 0 ? (
                        liked.length !== 0 ? (
                            <View>
                                <View style={styles.section}>
                                    <SectionHeader text={'Liked Products'} />
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
                ) : (
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <View style={{
                        height: 300,
                        width: 300,
                        alignItems: "center",
                    }}>
                        <Image
                            source={images.empty}
                            style={{
                                height: 300,
                                width: 300,
                                flex: 1,
                            }}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={{
                        fontSize: sizes.Medium,
                    }}>You have no saved products</Text>
                    <Button
                        style={{}}
                        method={() => navigation.navigate("Search", { id: user.id })}
                        text={"Add Your First Product"}
                        textStyle={{ color: theme.color, fontSize: sizes.Small }}
                    />
                </View>)
                    }
            </View>
        );
    }
}

export default SavedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
        alignItems: 'center',
    },

    section: {
        marginVertical: sizes.ExtraSmall,
        // borderBottomColor: theme.outline3,
        // borderBottomWidth: 5,
    },
});