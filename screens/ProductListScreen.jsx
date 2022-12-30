import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, Text, Image } from "react-native";
import { ProfilePicture, Loading, Header, Button } from '../constants/Components';
import { colors, sizes, images} from "../constants/Data";
import { firestore, logOut } from "../constants/Sever";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { ProductVertical } from './HomeScreen';

const theme = colors.lightTheme;
function ProductListScreen({route, navigation}) {
    const userId = route.params.id;
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    const [productList, setProductList] = useState([])

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

            setProductList(doc.data().sellerInfo.productList)

            if(user !== {}){
                setLoading(false)
            }
        });

    }, [])


    if (loading === true) {
        return (
            <View style={styles.container}>
                <Header method={() => navigation.goBack()} text={'Products'} />
                <Loading />
            </View>
        )
    } else {
        const userProducts = []
        productList.forEach((product) => {
            products.forEach((item) => {
                if (product === item.id) {
                    userProducts.push(item)
                }
            })
        })

        return (
            <View style={styles.container}>
                <Header method={() => navigation.goBack()} text={'Products'} />
                {
                    userProducts.length !== 0 ? (
                        <View style={{
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <FlatList
                                vertical
                                columnWrapperStyle = {{justifyContent: "space-around"}}
                                numColumns={2}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                data={userProducts}
                                renderItem={({ item }) => {
                                    return (
                                        <Product title = {item.title} price = {item.price} image = {item.image} seller = {item.seller} />
                                    )
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
                                }}>You have no products</Text>
                                <Button
                                    style={{}}
                                    method={() => navigation.navigate("Accounts", { id: user.id })}
                                    text={"Upload Your First Product"}
                                    textStyle={{ color: theme.color, fontSize: sizes.Small }}
                                />
                            </View>)
                }
            </View>
        )
    }
}

const Product = (props) => {
    return(
    <TouchableOpacity style={{
        backgroundColor: theme.outline3,
        borderRadius: sizes.ExtraSmall,
        width: '45%',
        height: 200,
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 10,
    }} onPress={() => navigation.navigate('Product', { id: userId, productId: props.id })}>
        <View style={{
            height: 10,
            width: 100,
            alignSelf: "center",
            alignItems: "center",
        }}>
            <Image
                style={{
                    flex: 1,
                }}
                resizeMode="contain"
                source={{ uri: props.image }} />
        </View>
        <View style={{
            margin: 5,
            backgroundColor: theme.bgColor,
            borderRadius: sizes.ExtraSmall,
            padding: 5,
            height: 80,
            justifyContent: "center",
        }}>
            <Text style={{ fontSize: sizes.Small }}>{props.title}</Text>
            <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: sizes.ExtraSmall }}>{props.rating + " star"}</Text>
                <Text style={{ fontSize: 12 }}>{props.price + ' Naira'}</Text>
            </View>
        </View>
    </TouchableOpacity>
    );
}

export default ProductListScreen;



const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.bgColor,
        flex: 1,
    },

    product: {
        backgroundColor: theme.bgColor,
        flexDirection: "column",
        padding: sizes.ExtraSmall,
        borderRadius: sizes.Medium,
        margin: sizes.Small,
        width: 150,
        justifyContent: "space-between"
    },
})