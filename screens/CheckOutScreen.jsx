import react, {useState, useEffect}  from "react";
import { FlatList, StyleSheet, View, StatusBar, Text, TouchableOpacity, Image } from 'react-native';
import {colors, sizes, images} from "../constants/Data"
import { Header, Loading } from "../constants/Components";
import { firestore } from "../constants/Sever";
import { collection, onSnapshot, doc } from "firebase/firestore";
import { Entypo, SimpleLineIcons } from '@expo/vector-icons';

const theme = colors.lightTheme;
function CheckOutScreen({route, navigation}) {
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

    if (loading) {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Header title="Check Out" navigation={navigation} />
                <Loading/>
            </View>
        )
    }else{

        let crtProducts = []
        cart.forEach((item) => {
            products.forEach((product) => {
                if (item.product === product.id) {
                    crtProducts.push(product)
                }
            })
        })


        return (
            <View style = {styles.container}>
                <StatusBar
                    backgroundColor={theme.color}
                    barStyle='light-content'
                />
                <Header method = {() => navigation.goBack()} text = {'Check Out'}/>
                <View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        data={crtProducts}
                        renderItem={({item}) => {
                            return (
                                <CartItem
                                    title={item.title} image={item.image} price={item.price} discount={item.discount} seller={item.seller} rating={item.ratings} method={() => navigation.navigate('Product', { id: userId, productId: item.id })}
                                />
                            );
                        }}
                    />
                </View>

                
                <TouchableOpacity style = {{
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
                }} onPress = {() => console.log('')}>
                    <Text style={{color: theme.bgColor, fontSize: 18}}>Buy</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function CartItem(props){
    return(
        <TouchableOpacity style = {styles.cartItem}>
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
                backgroundColor: theme.color2,
                flex: 1,
                borderRadius: sizes.ExtraSmall,
                margin: 10,
                padding: 5,
            }}>
                {
                    props.title.length < 20 ? (
                        <Text style={{ fontSize: sizes.Small, color: theme.bgColor }}>Title: {props.title}</Text>
                    ) : (
                            <Text style={{ fontSize: sizes.Small, color: theme.bgColor }}>Title: {props.title.slice(0, 20) + '...'}</Text>
                    )
                }
                <View>
                        <Text> Price: {props.price}</Text>
                </View>
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
        width: 300,
        height: 200,
        borderRadius: 10,
        elevation: 2,
        margin: 10,
    }
})
