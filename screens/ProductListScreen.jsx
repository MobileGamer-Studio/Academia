import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, Text } from "react-native";
import { ProfilePicture, RoundButton, Header } from '../constants/Components';
import { colors, sizes } from "../constants/Data";
import { firestore, logOut } from "../constants/Sever";
import { collection, doc, onSnapshot } from "firebase/firestore";

const theme = colors.lightTheme;
function ProductListScreen({route, navigation}) {
    const userId = route.params.id;
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})

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

        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            setUser(doc.data())

            setProductList(doc.data().sellerInfo.productList)
        });

    }, [])


    return (
        <View style={styles.container}>
            <Header method={() => navigation.goBack()} text = {'Products'}/>
            <ProductList productList = {productList}/>
        </View>
    );
}

function ProductList(props) {
    if (props.productList.length !== 0) {
        return (
            <View>
                <FlatList
                    vertical
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={props.productList}
                    renderItem={({ item }) => {
                        return (
                            <Product
                                product={item}
                            />
                        )
                    }}
                />
            </View>
        )
    }else{
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Text style={{
                    fontSize: sizes.Large,
                }}>No products</Text>
            </View>
        )
    }
}

const Product = (props) => {
    const product = props.product
    return (
        <TouchableOpacity>
            <View style={styles.product}>
                <View styles={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <Text style={{
                        fontSize: sizes.Medium,
                    }}>{product.title}</Text>
                    <Text style={{
                        fontSize: sizes.Small,
                    }}>{product.price + " naira"}</Text>
                </View>
                <View style={{
                    height: sizes.ExtraLarge,
                    width: sizes.ExtraLarge,
                    alignSelf: "center",
                    justifyContent: "center",
                }}>
                    <Image
                        style={{
                            flex: 1,
                            alignSelf: "center",
                        }}
                        resizeMode="contain"
                        source={product.image} />
                </View>
                <View style={{
                    justifyContent: "flex-end",
                    marginTop: sizes.ExtraSmall,
                }}>
                    <Text style={{
                        fontSize: sizes.ExtraSmall,
                    }}>{"Sold by " + product.seller}</Text>
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