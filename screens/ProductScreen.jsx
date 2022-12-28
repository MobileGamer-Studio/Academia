import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, images, sizes} from '../constants/Data';
import {Header} from '../constants/Components';
import {collection, doc, onSnapshot} from 'firebase/firestore';
import {firestore} from '../constants/Sever';

const theme = colors.lightTheme;
function ProductScreen({route, navigation}) {
    const productId = route.params.productId;
    const userId = route.params.id;

    const [product, setProduct] = React.useState({})
    const [user, setUser] = React.useState({})
    const [loading, setLoading] = React.useState(true)
    const [users, setUsers] = React.useState([])

    useEffect(() => {
        const usersSub = onSnapshot(collection(firestore, "Users"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            setUsers(data)
        });

        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            setUser(doc.data())
        });

        const productSub = onSnapshot(doc(firestore, "Products", productId), (doc) => {
            setProduct(doc.data())

            if (product !== {}) {
                setLoading(false)
            }
        });
    })
    

    if(loading === true){
        return (
            <View style={styles.container}>
                <Loading />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={{
                    height: 400,
                    width: 400,
                    alignSelf: "center",
                    alignItems: "center",
                }}>
                    <Image
                        style={{
                            flex: 1,
                        }}
                        resizeMode="contain"
                        source={product.image} />
                </View>
                <View style={{
                    backgroundColor: theme.color,
                    borderTopRightRadius: sizes.Medium + 10,
                    borderTopLeftRadius: sizes.Medium + 10,
                    paddingVertical: sizes.Medium,
                }}>
                    <Text style={{
                        fontSize: sizes.ExtraLarge,
                        marginBottom: 5,
                        color: colors.white,
                        marginHorizontal: sizes.Small
                    }}>{product.title}</Text>
                    <Text style={{
                        fontSize: sizes.Small,
                        color: colors.white,
                        marginHorizontal: sizes.Small,
                    }}>{product.description}</Text>
                    <View>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={product.tags}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity>
                                        <View style={{
                                            margin: 10,
                                            padding: 5,
                                            backgroundColor: theme.bgColor,
                                            borderRadius: sizes.ExtraLarge,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}>
                                            <Text style={{
                                                fontSize: sizes.Small,
                                                color: theme.color,
                                                marginHorizontal: sizes.ExtraSmall,
                                            }}>
                                                {"#" + item}
                                            </Text>
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
                            }}>{product.price + " Naira"}
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
        paddingTop: sizes.ExtraLarge,
        justifyContent: "space-between",
    },
})

export default ProductScreen;
