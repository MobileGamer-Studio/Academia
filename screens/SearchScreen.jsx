import React, {useState, useEffect} from 'react'
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput, StatusBar} from 'react-native'
import {colors, sizes,    images} from '../constants/Data';
import {ProductCategory, ProductVertical, SearchBar, Loading} from '../constants/Components';
import { MaterialIcons } from '@expo/vector-icons';
import { firestore } from '../constants/Sever';
import { collection, doc, onSnapshot } from "firebase/firestore";

const theme = colors.lightTheme;

export default function SearchScreen({navigation, route}) {
    const userId = route.params.id;
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [searchText, setSearchText] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [relatedTags, setRelatedTags] = useState([])




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


            if (data.length !== 0) {
                setLoading(false)
            }

        })

        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            setUser(doc.data())
        });

        if (products.length !== 0) {
            Search()
        }

    }, [searchText, products])

    function Search() {
        if (searchText === "null" || searchText === '' || searchText === null) {
            return setSearchResult(products);
        }
        const val = searchText.toLowerCase();
        const result = products.filter(item => item.title.toLowerCase().includes(val));
        setSearchResult(result);
        console.log(result)
    }

    if(loading === true){
        return(
            <View style = {styles.container}>
                <StatusBar
                backgroundColor={theme.color}
                barStyle='light-content'
            />
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: theme.color,
                    marginBottom: 10,
                    elevation: 10,
                    padding: 10,
                }}>
                    <MaterialIcons name="arrow-back-ios" size={24} color={colors.white} style={{ marginLeft: 10 }} onPress={() => navigation.goBack()} />
                    <View>
                        <TextInput
                            onChangeText={val => setSearchText(val)}
                            style={{
                                borderRadius: sizes.ExtraLarge,
                                paddingHorizontal: sizes.Small,
                                backgroundColor: theme.bgColor,
                                height: 40,
                                width: 350,
                                marginHorizontal: sizes.ExtraSmall,
                            }}
                            placeholder="snacks, assignments, stationary..."
                            value = {searchText}
                        />
                    </View>
                </View>
                <Loading/>
            </View>
        )
    }else{
        return (
            <View style={styles.container}>
                <StatusBar
                backgroundColor={theme.color}
                barStyle='light-content'
                />
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: theme.color,
                    marginBottom: 10,
                    elevation: 10,
                    padding: 10,
                }}>
                    <MaterialIcons name="arrow-back-ios" size={24} color={colors.white} onPress={() => navigation.goBack()} />
                    <View>
                        <TextInput
                            onChangeText={val => setSearchText(val)}
                            style={{
                                borderRadius: sizes.ExtraLarge,
                                paddingHorizontal: sizes.Small,
                                backgroundColor: theme.bgColor,
                                height: 40,
                                width: 350,
                                marginHorizontal: sizes.ExtraSmall,
                            }}
                            placeholder="snacks, assignments, stationary..."
                        />
                    </View>
                </View>
                {
                    searchResult.length !== 0 ? (
                        <View style={{
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <FlatList
                                vertical
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                data={searchResult}
                                renderItem={({ item }) => {
                                    return (

                                        <ProductVertical title={item.title} image={item.image} price={item.price} discount={item.discount} seller={item.seller} rating={item.ratings} method={() => navigation.navigate('Product', { id: userId, productId: item.id })} />
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
                                        source={images.search}
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
                                }}>No product found</Text>
                            </View>
                    )
                }
            </View>
        )
    }
}


const Product = (props) => {
    return (
        <TouchableOpacity onPress = {props.method} style ={{
            height: 200,
            width: 200,
        }}>
            <View style={{
                height: 100,
                width: 100,
            }}>
                <Image
                    style={{
                        flex: 1,
                    }}
                    resizeMode="contain"
                    source={props.image}
                />
            </View>
            <View>
                    <Text>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
    }
})
