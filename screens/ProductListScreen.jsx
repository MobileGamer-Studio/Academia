import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, Text, Image, StatusBar} from "react-native";
import { ProfilePicture, Loading, Header, Button } from '../constants/Components';
import { colors, sizes, images } from "../constants/Data";
import { firestore, logOut } from "../constants/Sever";
import { collection, doc, onSnapshot } from "firebase/firestore";
import {SimpleLineIcons} from '@expo/vector-icons'

const theme = colors.lightTheme;
function ProductListScreen({ route, navigation }) {
    const userId = route.params.id;
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [loadingMessage, setLoadingMessage] = useState('')

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
                <Header method={() => navigation.goBack()} text={'Products'} />
                <Loading message={loadingMessage} />
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
                <StatusBar
                    backgroundColor={theme.color}
                    barStyle='light-content'
                />
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
                                        <Product title={item.title} image={item.image} price={item.price} discount={item.discount} seller={item.seller} rating={item.ratings} method={() => navigation.navigate('Product', { id: userId, productId: item.id })} />
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
                                method={() => navigation.navigate("UploadProduct", { id: userId })}
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
        <TouchableOpacity style={{
            flexDirection: 'row',
            backgroundColor: theme.bgColor,
            elevation: 2,
            borderRadius: sizes.Medium,
            padding: 10,
            margin: 10,
        }} onPress = {props.method}>
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
                        <Text style={{ fontSize: sizes.Small, color: theme.color2 }}>{props.title}</Text>
                    ) : (
                        <Text style={{ fontSize: sizes.Small, color: theme.color2 }}>{props.title.slice(0, 25) + '...'}</Text>
                    )
                }
                <Text style={{ color: theme.color2, fontSize: sizes.ExtraSmall }}>{props.rating + " star"}</Text>
                {
                    props.discount === 0 ? (
                        <View>
                            <Text style={{ color: theme.color2, fontSize: 12 }}>{props.price + '   ₦'}</Text>
                        </View>
                    ) : (
                        <View>
                            <Text style={{ color: theme.color2, fontSize: 12, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{props.price + '   ₦'}</Text>
                            <Text style={{ color: theme.color2, fontSize: 12 }}>{(props.price - (props.discount / 100 * props.price)) + '   ₦'}</Text>

                            <View style={{
                                    flexDirection: 'row',
                                    backgroundColor: theme.color2,
                                    elevation: 1,
                                    padding: 2.5,
                                    margin: 5,
                                    borderRadius: sizes.Small,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                            }}>
                                <Text style={{ color: theme.bgColor }}>{'-' + props.discount + '% discount'}</Text>
                            </View>
                        </View>
                    )
                }

                <View  style = {{
                    flexDirection: 'row',
                    backgroundColor: theme.bgColor,
                    elevation: 1,
                    padding: 10,
                    margin: 5,
                    borderRadius: sizes.Small,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                }}>
                    <SimpleLineIcons name="like" size={12} color={theme.color2} style={{ marginHorizontal: 10}} onPress={props.method} />
                    <Text style={{ color: theme.color2, fontSize: 12 }}>Likes</Text>
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