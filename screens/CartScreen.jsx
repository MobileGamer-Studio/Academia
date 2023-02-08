import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, View, Image, Text, StatusBar, TouchableOpacity} from 'react-native';
import {colors, sizes, images} from '../constants/Data';
import { firestore } from "../constants/Sever";
import { getDocs, collection, setDoc, doc, onSnapshot } from "firebase/firestore";
import { Entypo, SimpleLineIcons, AntDesign } from '@expo/vector-icons';
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
                <StatusBar
                    backgroundColor={theme.color}
                    barStyle='light-content'
                />
                <Header method={() => navigation.goBack()} text={'Cart'} />
                <Loading />
            </View>
        )
    } else {

        let crtProducts = []
        cart.forEach((item) => {
            products.forEach((product) => {
                if (item.product === product.id) {
                    crtProducts.push(product)
                }
            })
        })

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={theme.color}
                    barStyle='light-content'
                />
                <Header method={() => navigation.goBack()} text={"Cart"} />
                {
                    
                    cart.length !== 0 ? (
                        <View>
                            <FlatList
                                vertical
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                data={crtProducts}
                                renderItem={({ item }) => {
                                    return (
                                        <Product title={item.title} image={item.image} price={item.price} discount={item.discount} seller={item.seller} rating={item.ratings} method={() => navigation.navigate('Product', { id: userId, productId: item.id })} />
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

                {
                    cart.length !== 0 ? (
                        <TouchableOpacity style = {{
                            height: 50,
                            width: 150,
                            backgroundColor: theme.color,
                            borderRadius: sizes.Large,
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            elevation: 2,
                            flexDirection: "row",
                        }} onPress = {() => navigation.navigate('Checkout', {id: userId})}>
                            <Text style={{color: theme.bgColor, fontSize: 18}}>Checkout</Text>
                            <Entypo name="chevron-right" size={24} color={theme.bgColor} />
                        </TouchableOpacity>
                    ) : null
                }
            </View>
        );
    }
}

function Product(props) {
    const [amountSellected, setAmountSellected] = useState(1);
    return (
        <TouchableOpacity style={{
            flexDirection: 'row',
            backgroundColor: theme.bgColor,
            elevation: 2,
            borderRadius: sizes.Medium,
            padding: 10,
            margin: 10,
        }} onPress={props.method}>
            <View style={{
                height: 150,
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
                        height: 100,
                        width: 100,
                    }}
                    resizeMode="contain"
                    source={{ uri: props.image }} />
            </View>
            <View style={{
                marginHorizontal: 10,
                marginVertical: 5,
            }}>
                {
                    props.title.length < 25 ? (
                        <Text style={{ fontSize: sizes.Medium, color: theme.color2 }}>{props.title}</Text>
                    ) : (
                            <Text style={{ fontSize: sizes.Medium, color: theme.color2 }}>{props.title.slice(0, 25) + '...'}</Text>
                    )
                }
                <Text style={{ color: theme.color2, fontSize: sizes.ExtraSmall }}>{props.rating + " star"}</Text>
                {
                    props.discount === 0 ? (
                        <View>
                            <Text style={{ color: theme.color2, fontSize: 12 }}>{'₦'+props.price}</Text>
                        </View>
                    ) : (
                        <View>
                            <Text style={{ color: theme.color2, fontSize: 12, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{'₦'+props.price}</Text>
                            <Text style={{ color: theme.color2, fontSize: 12 }}>{'₦'+(props.price - (props.discount / 100 * props.price))}</Text>

                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: theme.color2,
                                elevation: 1,
                                padding: 2.5,
                                margin: 5,
                                borderRadius: sizes.Small,
                                alignItems: 'center',
                                justifyContent: 'center',
                                // width: '100%',
                            }}>
                                <Text style={{ color: theme.bgColor }}>{'-' + props.discount + '% discount'}</Text>
                            </View>
                        </View>
                    )
                }

                <View style={{
                    flexDirection: 'row',
                    backgroundColor: theme.bgColor,
                    elevation: 1,
                    padding: 10,
                    margin: 5,
                    borderRadius: sizes.Small,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    // width: '100%',
                }}>
                    <TouchableOpacity style = {{
                        backgroundColor: theme.color2,
                        borderRadius: sizes.ExtraLarge,
                    }} onPress = {() => {
                        setAmountSellected(amountSellected - 1)
                    }}>
                        <AntDesign name="minus" size={24} color={theme.bgColor} />
                    </TouchableOpacity>
                    <Text style={{ marginHorizontal: 10, fontSize: sizes.Small, color: theme.color2 }}>{amountSellected}</Text>
                    <TouchableOpacity style = {{
                        backgroundColor: theme.color2,
                        borderRadius: sizes.ExtraLarge,
                    }} onPress = {() => {
                        setAmountSellected(amountSellected + 1)
                    }}>
                        <AntDesign name="plus" size={24} color={theme.bgColor} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* <TouchableOpacity style={{
                alignSelf: 'flex-start',
                backgroundColor: theme.color,
                paddingHorizontal: 10,
                borderRadius: sizes.Small,
                margin: 5,
            }} onPress={() => props.edit}>
                <Text style={{ color: theme.bgColor, fontSize: sizes.Small }} >{'Edit'}</Text>
            </TouchableOpacity> */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.bgColor,
        flex: 1,
    },
})

export default CartScreen;
