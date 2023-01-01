import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, Text, Image } from "react-native";
import { ProfilePicture, Loading, Header, Button } from '../constants/Components';
import { colors, sizes, images} from "../constants/Data";
import { firestore, logOut } from "../constants/Sever";
import { collection, doc, onSnapshot } from "firebase/firestore";

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
                            width: '100%',

                        }}>
                            <FlatList
                                vertical
                                // columnWrapperStyle = {{justifyContent: "space-around"}}
                                // numColumns={2}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                data={userProducts}
                                renderItem={({ item }) => {
                                    return (
                                        <Product title={item.title} image={item.image} price={item.price} seller={item.seller} rating={item.ratings} method={() => navigation.navigate('Product', { id: userId, productId: item.id })} />
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

function Product(props) {
    return (
        <TouchableOpacity style = {{
            height: 150,
            width: 300,
            flexDirection: "row",
            padding: 10,
            backgroundColor: theme.bgColor,
            elevation: 1,
            margin: 5,
            borderRadius: sizes.Small,
        }}>
            <View style={{
                height: 100,
                width: 100,
                alignSelf: "center",
                alignItems: "center",
            }}>
                <Image
                    style={{
                        flex: 1,
                        height: 70,
                        width: 70,
                    }}
                    resizeMode="contain"
                    source={{ uri: props.image }} />
            </View>
            <View style = {{
                flex:1,
            }}>
                <View>
                    {
                        props.title.length < 15 ? (
                            <Text style={{ fontSize: sizes.Small }}>{props.title}</Text>
                        ) : (
                            <Text style={{ fontSize: sizes.Small }}>{props.title.slice(0, 15) + '...'}</Text>
                        )
                    }
                    <Text style={{ fontSize: sizes.ExtraSmall }}>{props.rating + " star"}</Text>
                    <Text style={{ fontSize: 12 }}>{props.price + ' Naira'}</Text>
                </View>
                <Button
                    style={{
                        borderRadius: sizes.ExtraLarge,
                        padding: 2,
                        backgroundColor: theme.color,
                        marginHorizontal: 5,
                        marginTop: 20,
                        alignItems: "center",
                    }}
                    method={() => navigation.navigate("Home", { id: user.id })}
                    text={"edit"}
                    textStyle={{ color: colors.white, fontSize: sizes.Medium }}
                />
            </View>
        </TouchableOpacity>
    )
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
        paddingHorizontal: sizes.ExtraSmall,
        paddingBottom: sizes.ExtraLarge,
        borderRadius: sizes.Medium,
        margin: sizes.Small,
        width: 150,
        justifyContent: "space-between"
    },
})