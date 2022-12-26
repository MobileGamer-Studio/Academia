import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, View, Image, Text} from 'react-native';
import {colors, sizes, images} from '../constants/Data';
import { firestore } from "../constants/Sever";
import { getDocs, collection, setDoc, doc, onSnapshot } from "firebase/firestore";
import { Entypo } from '@expo/vector-icons';
import { Header, Loading, Button } from '../constants/Components';

const theme = colors.lightTheme;
function CartScreen({route, navigation}) {
    const userId = route.params.id;
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [optionsAct, setOptionsAct] = useState(false)
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const usersSub = onSnapshot(collection(firestore, "Users"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            setUsers(data)
        });

        const productsSub = onSnapshot(collection(firestore, "Products"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            setProducts(data)
        });

        const userSub = onSnapshot(doc(firestore, "Users", userId), (item) => {
            setUser(item.data())

            setCart(item.data().userInfo.cart)

            if (user !== {}) {
                setLoading(false)
            }
            
        });

        
    }, [])


    const RemoveItem = async (item) => {
        cart.slice(cart.indexOf(item))
        user.userInfo.cart = cart
        await setDoc(doc(firestore, "Users", userId), user)
    }

    if (loading === true) {
        return (
            <View style={styles.container}>
                <Header method={() => navigation.goBack()} text={'Cart'} />
                <Loading />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Header method={() => navigation.goBack()} text={"Cart"} />
                {
                    cart.length !== 0 ? (
                        <View>
                            <FlatList
                                vertical
                                numColumns={2}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                data={cart}
                                renderItem={({ item }) => {
                                    return (
                                        <View></View>
                                    );
                                }}
                            />
                        </View>
                    ) : (
                        <View style = {{
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
                                        source={images.empty_cart}
                                        style={{
                                            height: 300,
                                            width: 300,
                                            flex: 1,
                                        }}
                                        resizeMode="contain"
                                    />
                                </View>
                                <Text style={{ fontSize: sizes.Medium }}>It looks like your cart is empty</Text>
                                <Button
                                    style={{}}
                                    method={() => navigation.navigate("Search", { id: user.id })}
                                    text={"Find Products"}
                                    textStyle={{ color: theme.color, fontSize: sizes.Small }}
                                />
                        </View>
                    )
                }
            </View>
        );
    }
}

function CartItem(props) {
    return (
        <View style={{
            elevation: sizes.ExtraSmall,
            marginVertical: sizes.ExtraSmall,
        }}>
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    backgroundColor: colors.white,
                    borderRadius: sizes.Small,
                    height: 150,
                    alignItems: 'flex-start',
                    justifyContent: "flex-start",
                    padding: 5,
                }}

                onPress={props.method}
            >
                <View style={{
                    height: 100,
                    alignSelf: "center",
                    justifyContent: "center",
                }}>
                    <Image
                        style={{
                            flex: 1,
                            alignSelf: "center",
                        }}
                        resizeMode="contain"
                        source={props.product.image} />
                </View>
                <View>
                    <Text style={{ fontSize: sizes.Medium, color: colors.black }}>{props.title}</Text>
                    <Text style={{ fontSize: sizes.Small, color: colors.grey }}>{props.description}</Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start"
                }}>
                    <Button
                        style={{
                            borderRadius: sizes.ExtraLarge,
                            borderWidth: 1,
                            borderColor: colors.defaultBG4,
                            padding: 5,
                            alignItems: "center",
                            justifyContent: "center",
                            marginHorizontal: 10,
                        }}
                        method={() => RemoveItem(props.item)}
                        text={"Cancel"}
                        textStyle={{ fontSize: sizes.Small, color: colors.white }}
                    /><Button
                        style={{
                            borderRadius: sizes.ExtraLarge,
                            backgroundColor: colors.defaultBG4,
                            padding: 5,
                            alignItems: "center",
                            justifyContent: "center",
                            marginHorizontal: 10,
                        }}
                        method={() => RemoveItem(props.item)}
                        text={"Edit"}
                        textStyle={{ fontSize: sizes.Small, color: colors.white }}
                    />

                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.bgColor,
        flex: 1,
    },
})

export default CartScreen;
