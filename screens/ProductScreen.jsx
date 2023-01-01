import react, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { doc, collection, onSnapshot} from 'firebase/firestore';
import {firestore} from '../constants/Sever';
import {MaterialIcons, Entypo} from '@expo/vector-icons';
import {colors, sizes, images} from '../constants/Data';
import { Header, Loading } from '../constants/Components';

const theme = colors.lightTheme;
function ProductScreen({ route, navigation }) {
    const productId = route.params.productId;
    const userId = route.params.id;

    const [product, setProduct] = useState({})
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [optionsAct, setOptionsAct] = useState(false)
    

    useEffect(() => {
        const userSub = onSnapshot(doc(firestore, 'Users', userId), (doc) => {
            setUser(doc.data())
        })

        const productSub = onSnapshot(doc(firestore, 'Products', productId), (doc) => {
            setProduct(doc.data())

            if (product !== {}) {
                setLoading(false)
            }
        })
    })

    if (loading === true) {
        return (
            <View style={styles.container}>
                <Loading />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
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
                    <Text style={{
                        fontSize: sizes.Medium - 5,
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
