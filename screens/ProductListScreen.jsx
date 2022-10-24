import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Image } from "react-native";
import { colors, sizes } from "../constants/Data";
import { Button } from "../constants/Components";
import { GetUserData } from "../constants/AppManger";

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


function ProductListScreen({route, navigation}) {
    const userId = route.params.id;
    const user = GetUserData(userId);


    return (
        <View style={styles.container}>
            <Text>
                Products
            </Text>
            <View>

            </View>
            <View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={user.sellerInfo.productList}
                    renderItem={({ item }) => {
                        return (
                            <Product
                                product={item}
                            />
                        )
                    }}
                />
            </View>
        </View>
    );
}

export default ProductListScreen;



const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultBG2,
        flex: 1,
        justifyContent: "flex-start",
        paddingTop: sizes.ExtraLarge,
    },

    product: {
        backgroundColor: colors.white,
        flexDirection: "column",
        padding: sizes.ExtraSmall,
        borderRadius: sizes.Medium,
        margin: sizes.Small,
        width: 150,
        justifyContent: "space-between"
    },
})