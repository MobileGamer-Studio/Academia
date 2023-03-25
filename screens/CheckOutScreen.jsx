import react, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, StatusBar, Text, TouchableOpacity, Image } from 'react-native';
import { colors, sizes, images, Chat, Message } from "../constants/Data"
import { Header, Loading, Button } from "../constants/Components";
import { firestore } from "../constants/Sever";
import { collection, onSnapshot, doc, setDoc, updateDoc } from "firebase/firestore";
import { Entypo, SimpleLineIcons } from '@expo/vector-icons';

const theme = colors.lightTheme;
function CheckOutScreen({ route, navigation }) {
    const userId = route.params.id;
    const [user, set_user] = useState({})
    const [users, set_users] = useState([])
    const [products, setProducts] = useState([])
    const [optionsAct, setOptionsAct] = useState(false)
    const [cart, setCart] = useState([])
    const [chats, setChats] = useState([])
    const [loading, set_loading] = useState(true)
    const [loadingMessage, set_loadingMessage] = useState("Loading...")

    useEffect(() => {
        const usersSub = onSnapshot(collection(firestore, "Users"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            set_users(data)
        });

        const productsSub = onSnapshot(collection(firestore, "Products"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            setProducts(data)
        });

        const userSub = onSnapshot(doc(firestore, "Users", userId), (item) => {
            set_user(item.data())
            setCart(item.data().userInfo.cart)

            if (user !== {}) {
                set_loading(false)
            }
        });

        const chatsSub = onSnapshot(collection(firestore, "Chats"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });

            setChats(data)


        });



    }, [])

    async function saveData(id, path, data) {
        await setDoc(doc(firestore, path, id), data)
    }

    const PlaceOrder = async () => {
        set_loadingMessage("Placing Order...")
        set_loading(true)

        let crtProducts = []
        cart.forEach((item) => {
            products.forEach((product) => {
                if (item.product === product.id) {
                    crtProducts.push(product)
                }
            })
        })

        crtProducts.forEach((product) => {
            const message = user.name + ' has ordered your product ' + product.title + '\n Quantity: ' + product.quantity + '\n Price: ' + product.price + '\n Address: ' + user.location + '\n Phone: ' + user.userInfo.phone
            if (user.chatList.includes(userId + "-" + product.sellersId)) {
                chats.forEach((chat) => {
                    if (chat.id === userId + "-" + product.sellersId) {
                        const date = new Date();
                        const newMessage = Message;
                        newMessage.message = message;
                        newMessage.time = (date.getHours() + ":" + date.getMinutes()).toString();
                        newMessage.sender = userId;
                        newMessage.id = userId + message + chat.messages.length.toString();

                        chat.messages.push(newMessage)
                        saveData(chat.id, "Chats", chat)
                    }
                })
            } else if (user.chatList.includes(product.sellersId + "-" + userId)) {
                chats.forEach((chat) => {
                    if (chat.id === product.sellersId + "-" + userId) {
                        const date = new Date();
                        const newMessage = Message;
                        newMessage.message = message;
                        newMessage.time = (date.getHours() + ":" + date.getMinutes()).toString();
                        newMessage.sender = userId;
                        newMessage.id = userId + message + chat.messages.length.toString();

                        chat.messages.push(newMessage)

                        
                        saveData(chat.id, "Chats", chat)
                    }
                })

            } else {
                const newChat = Chat;
                let messages = [];
                newChat.id = userId + "-" + product.sellersId;

                newChat.members.push(userId, product.sellersId)

                newChat.members.forEach(y => {
                    users.forEach(x => {
                        if (x.id === y) {
                            x.chatList.push(newChat.id)
                            saveData(x.id, "Users", x)
                        }
                    })
                })

                const date = new Date();
                const newMessage = Message;
                newMessage.message = message;
                newMessage.time = (date.getHours() + ":" + date.getMinutes()).toString();
                newMessage.sender = userId;
                newMessage.id = userId + message + messages.length.toString();

                
                messages.push(newMessage);

                newChat.messages = messages;

                saveData(newChat.id, "Chats", newChat)

            }
        })

        await updateDoc(doc(firestore, "Users", userId), {
            "userInfo.cart": []
        })
        set_loadingMessage("Order Placed")
        set_loading(false)

        alert("Order Placed")


    }

    if (loading) {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={theme.color}
                    barStyle='light-content'
                />
                <Header method={() => navigation.goBack()} text={'Check Out'} />
                <Loading message  = {loadingMessage} />
            </View>
        )
    } else {

        let crtProducts = []
        cart.forEach((item) => {
            products.forEach((product) => {
                if (item.product === product.id) {
                    crtProducts.push({
                        info: item,
                        product: product,
                    })
                }
            })
        })


        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={theme.color}
                    barStyle='light-content'
                />
                <Header method={() => navigation.goBack()} text={'Check Out'} />
                {

                    crtProducts.length !== 0 ? (
                        <View>
                            <FlatList
                                vertical
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.info.id}
                                data={crtProducts}
                                renderItem={({ item }) => {
                                    return (
                                        <CartItem
                                            title={item.product.title} image={item.product.image} price={item.product.price} discount={item.product.discount} seller={item.product.seller} rating={item.product.ratings} method={() => navigation.navigate('Product', { id: userId, productId: item.id })}
                                        />
                                    );
                                }}
                            />
                        </View>
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
                    )}


                {
                    crtProducts.length !== 0 ? (
                        <TouchableOpacity style={{
                            height: 50,
                            width: 100,
                            backgroundColor: theme.color,
                            borderRadius: sizes.Large,
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "center",
                            position: "absolute",
                            bottom: 10,
                            elevation: 2,
                            flexDirection: "row",
                        }} onPress={() => PlaceOrder()}>
                            <Text style={{ color: theme.bgColor, fontSize: 18 }}>Buy</Text>
                        </TouchableOpacity>): null
                }
            </View>
        );
    }
}

function CartItem(props) {
    return (
        <TouchableOpacity style={styles.cartItem}>
            <View style={{
                height: 200,
                width: 100,
                alignSelf: "center",
                alignItems: "center",
                backgroundColor: theme.bgColor,
                borderRadius: sizes.ExtraSmall,
                margin: 10,
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
                //backgroundColor: theme.color2,
                flex: 1,
                borderRadius: sizes.ExtraSmall,
                margin: 10,
                padding: 5,
            }}>
                {
                    props.title.length < 20 ? (
                        <Text style={{ fontSize: sizes.Small, color: theme.color2 }}>Title: {props.title}</Text>
                    ) : (
                        <Text style={{ fontSize: sizes.Small, color: theme.color2}}>Title: {props.title.slice(0, 20) + '...'}</Text>
                    )
                }
                <Text style = {{color: theme.color2}}> Price: {props.price}</Text>
                <Text style = {{color: theme.color2}}> Discount: {props.discount}</Text>
                <Text style = {{color: theme.color2}}> Seller: {props.seller}</Text>
                <Text style = {{color: theme.color2}}> Rating: {props.rating}</Text>
                <Text style = {{color: theme.color2}}>Amount Sellected{props.amountSellected}</Text>

            </View>
        </TouchableOpacity>
    )
}

export default CheckOutScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.bgColor,
        flex: 1,
    },

    cartItem: {
        backgroundColor: theme.bgColor,
        flexDirection: "row",
        width: '95%',
        height: 200,
        borderRadius: 10,
        elevation: 2,
        margin: 10,
        alignSelf: "center",
    }
})
