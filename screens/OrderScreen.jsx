import React from 'react'
import {FlatList, StyleSheet, Text, TouchableOpacity, View, StatusBar} from 'react-native'
import {colors, sizes} from '../constants/Data'
import {ProductVertical, Loading, Header} from '../constants/Components'

const theme = colors.lightTheme;
const OrderScreen = ({navigation}) => {
    const userId = route.params.id;
    const [user, set_user] = useState({})
    const [users, set_users] = useState([])
    const [products, setProducts] = useState([])
    const [optionsAct, setOptionsAct] = useState(false)
    const [cart, setCart] = useState([])
    const [loading, set_loading] = useState(true)

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

        
    }, [])

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
    }else{

        let ordersProducts = []
        orders.forEach((cart) => {
            cart.forEach((item) => {
                products.forEach((product) => {
                    if (item.product === product.id) {
                        ordersProducts.push(product)
                    }
                })
            })
        })

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={theme.color}
                    barStyle='light-content'
                />
                <Header method={() => navigation.goBack()} text={"Orders"} />
                {
                    orders.length !== 0 ? (
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.bgColor,
        flex: 1,
        paddingVertical: sizes.ExtraLarge,
    }
});


export default OrderScreen;
