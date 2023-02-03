import react, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert, StatusBar } from 'react-native';
import { doc, collection, onSnapshot, setDoc, updateDoc, arrayRemove, arrayUnion, increment } from 'firebase/firestore';
import { firestore } from '../constants/Sever';
import { MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { colors, sizes, images, Item } from '../constants/Data';
import { Header, Loading } from '../constants/Components';

const theme = colors.lightTheme;
function ProductScreen({ route, navigation }) {
    const productId = route.params.productId;
    const userId = route.params.id;

    const userRef = doc(firestore, 'Users', userId);
    const productRef = doc(firestore, 'Products', productId);

    const [product, setProduct] = useState({})
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingMessage, setLoadingMessage] =  useState('Getting Product')
    const [optionsAct, setOptionsAct] = useState(false)
    const [seeMore, setSeeMore] = useState(false)
    const [amountSelected, setAmountSelected] = useState(1)
    const [rating, setRating] = useState(null)


    useEffect(() => {
        const userSub = onSnapshot(doc(firestore, 'Users', userId), (doc) => {
            setUser(doc.data())

            if (doc.data().userInfo.liked.includes(productId)) {
                setRating('like')
            }

            if (doc.data().userInfo.disliked.includes(productId)) {
                setRating('dislike')
            }

        })

        const productSub = onSnapshot(doc(firestore, 'Products', productId), (doc) => {
            setProduct(doc.data())

            if (product !== {}) {
                setLoading(false)
            }
        })
    }, [])


    const addToCart = async () => {
        setLoadingMessage('Adding To Cart')
        setLoading(true)
        const newItem = Item;
        newItem.id = userId + "-ITEM-" + product.id;
        newItem.product = product.id;
        newItem.amountSellected = 1;

        if (user.userInfo.cart.includes(newItem) === false) {
            user.userInfo.cart.push(newItem);
            await setDoc(doc(firestore, 'Users', userId), user);
            setLoading(false)
            Alert.alert(
                "Added to cart",
                "Do you want to checkout now?",
                [
                    {
                        text: "Continue",
                        onPress: () => navigation.goBack()
                    },
                    {
                        text: "Checkout",
                        onPress: () => navigation.navigate('Checkout', {id: userId})
                    }
                ]
            )
        }else{
            setLoading(false)
            Alert.alert(
                "Already in cart",
                "Do you want to see your cart?",
                [
                    {
                        text: "Continue",
                        onPress: () => navigation.goBack()
                    },
                    {
                        text: "Cart",
                        onPress: () => navigation.navigate('Cart')
                    }
                ]
            )
        }
    }

    const addToRecentActivity = async () => {
        if (user.userInfo.recentlyViewed.includes(productId) === false) {
            setLoading(true)
            user.userInfo.recentlyViewed.push(productId)
            await setDoc(doc(firestore, 'Users', userId), user)
            setLoading(false)
        }
    }

    const like = async () => {
        if (rating === 'like') {
            setRating(null)
            await updateDoc(userRef, {
                'userInfo.liked': arrayRemove(productId)
            })
            await updateDoc(productRef, {
                likes: increment(-1)
            })

        } else if (rating === null|| rating === 'dislike'){
            setRating('like')
            await updateDoc(userRef, {
                'userInfo.liked': arrayUnion(productId)
            })
            await updateDoc(userRef, {
                'userInfo.disliked': arrayRemove(productId)
            })

            await updateDoc(productRef, {
                likes: increment(1)
            })


        }
    }

    const dislike = async () => {
        if (rating === 'dislike') {
            setRating(null)
            await updateDoc(userRef, {
                'userInfo.disliked': arrayRemove(productId)
            })

            await updateDoc(productRef, {
                dislikes: increment(-1)
            })


        } else if (rating === null || rating === 'like') {
            setRating('dislike')
            await updateDoc(userRef, {
                'userInfo.disliked': arrayUnion(productId)
            })

            await updateDoc(userRef, {
                'userInfo.liked': arrayRemove(productId)
            })

            await updateDoc(productRef, {
                dislikes: increment(1)
            })

        }
    }

    if (loading === true) {
        return (
            <View style={styles.container}>
                <Loading message  = {loadingMessage}/>
            </View>
        )
    } else {

        addToRecentActivity()

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={theme.bgColor}
                    barStyle='dark-content'
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                    <MaterialIcons name="arrow-back-ios" size={24} color={theme.color} style={{ marginLeft: 10 }} onPress={() => navigation.goBack()} />
                    <View style={{ alignSelf: "flex-end", marginBottom: 20 }}>

                        <TouchableOpacity onPress={() => setOptionsAct(true)}>
                            <Entypo name="dots-three-vertical" size={24} color={theme.color} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    height: 400,
                    width: 400,
                    alignSelf: "center",
                    alignItems: "center",
                }}>
                    <Image
                        style={{
                            flex: 1,
                            height: 400,
                            width: 400,
                        }}
                        resizeMode="contain"
                        source={{ uri: product.image }} />
                    {
                        rating === null ? (
                            <View style={{
                                position: "absolute",
                                backgroundColor: colors.white,
                                right: 0,
                                top: 0,
                                padding: 10,
                                borderRadius: sizes.Medium,
                                margin: 10,
                                flexDirection: "row",
                                justifyContent: 'space-around',
                                elevation: 2,
                            }}>
                                <AntDesign name="like2" size={20} color={theme.color} style={{ marginHorizontal: 10 }} onPress={() => like()} />
                                <AntDesign name="dislike2" size={20} color={theme.color} style={{ marginHorizontal: 10 }} onPress={() => dislike()} />
                            </View>

                        ) : (
                            rating === 'like' ? (
                                <View style={{
                                    position: "absolute",
                                    backgroundColor: colors.white,
                                    right: 0,
                                    top: 0,
                                    padding: 10,
                                    borderRadius: sizes.Medium,
                                    margin: 10,
                                    flexDirection: "row",
                                    justifyContent: 'space-around',
                                    elevation: 2,
                                }}>
                                    <AntDesign name="like1" size={20} color={theme.color} style={{ marginHorizontal: 10 }} onPress={() => like()} />
                                    <AntDesign name="dislike2" size={20} color={theme.color} style={{ marginHorizontal: 10 }} onPress={() => dislike()} />
                                </View>
                            ) : (
                                <View style={{
                                    position: "absolute",
                                    backgroundColor: colors.white,
                                    right: 0,
                                    top: 0,
                                    padding: 10,
                                    borderRadius: sizes.Medium,
                                    margin: 10,
                                    flexDirection: "row",
                                    justifyContent: 'space-around',
                                    elevation: 2,
                                }}>
                                    <AntDesign name="like2" size={20} color={theme.color} style={{ marginHorizontal: 10 }} onPress={() => like()} />
                                    <AntDesign name="dislike1" size={20} color={theme.color} style={{ marginHorizontal: 10 }} onPress={() => dislike()} />
                                </View>
                            )
                        )
                    }
                </View>
                <View style={{
                    backgroundColor: theme.color,
                    borderTopRightRadius: sizes.Large,
                    borderTopLeftRadius: sizes.Large,
                    paddingVertical: sizes.Medium,
                    justifyContent: "space-evenly",
                }}>
                    <Text style={{
                        fontSize: sizes.Large,
                        marginBottom: 5,
                        color: colors.white,
                        marginHorizontal: sizes.Small
                    }}>{product.title}</Text>
                    <TouchableOpacity onPress={() => setSeeMore(!seeMore)}>
                        <Text style={{
                            fontSize: sizes.Medium - 5,
                            color: colors.white,
                            marginHorizontal: sizes.Small,
                            marginVertical: sizes.Small
                        }}>{product.description.length > 100 ? (
                            seeMore === true ? (
                                <Text style={{ fontSize: sizes.Small, color: theme.bgColor }}>{product.description + ' see less'}</Text>
                            ) : (
                                <Text style={{ fontSize: sizes.Small, color: theme.bgColor }}>{product.description.slice(0, 100) + '... see more '}</Text>
                            )
                        ) : (
                            <Text style={{ fontSize: sizes.Small, color: theme.bgColor }}>{product.description}</Text>
                        )}</Text>
                    </TouchableOpacity>
                    <View>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={product.tags}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity>
                                        <View style={{
                                            backgroundColor: theme.bgColor,
                                            marginHorizontal: 10,
                                            borderRadius: sizes.ExtraLarge,
                                            paddingHorizontal: 10,
                                            paddingVertical: 5
                                        }}>
                                            <Text style={{
                                                color: theme.color,
                                                fontSize: sizes.Small,
                                            }}>{"#" + item}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        alignItems: "center",
                        backgroundColor: theme.bgColor,
                        borderRadius: sizes.ExtraLarge,
                        marginHorizontal: sizes.ExtraSmall,
                        marginVertical: sizes.Small,
                    }}>
                        <Text
                            style={{
                                fontSize: sizes.Large,
                                color: theme.color,
                            }}>{'₦'+product.price}
                        </Text>

                        <TouchableOpacity
                            style={{
                                borderRadius: sizes.ExtraLarge,
                                borderColor: theme.bgColor,
                                backgroundColor: theme.color,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: sizes.ExtraSmall,
                                alignItems: "center",
                                // elevation: sizes.Small,
                            }}

                            onPress={() => addToCart()}
                        >
                            <Text style={{
                                color: colors.white,
                            }}>Add to cart</Text>
                            <View style={{
                                height: sizes.Large,
                                width: sizes.Large,
                                borderRadius: sizes.Large,
                                alignItems: "center",
                                marginHorizontal: sizes.ExtraSmall,
                            }}>
                                <Image
                                    style={{
                                        flex: 1,
                                    }}
                                    resizeMode="contain"
                                    source={images.cart}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
        paddingTop: 10,
        justifyContent: "space-between",
    },
})

export default ProductScreen;
