import React, {useState, useEffect} from 'react'
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput} from 'react-native'
import {colors, sizes, testProducts, images} from '../constants/Data';
import {ProductCategory, ProductVertical, SearchBar, Loading} from '../constants/Components';
import { MaterialIcons } from '@expo/vector-icons';
import { firestore } from '../constants/Sever';
import { collection, doc, onSnapshot } from "firebase/firestore";

const theme = colors.lightTheme;

export default function SearchScreen({navigation, route}) {
    const userId = route.params.id;
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [searchResult, setSearchResult] = useState([])
    const [relatedTags, setRelatedTags] = useState([])
    

    const [productList, setProductList] = useState([])

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
            setProductList(data)
            setSearchResult(data)
            

            if (data.length !== 0) {
                setLoading(false)
            }
            
        })

        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            setUser(doc.data()) 
            
            
        });

    }, [])

    function Search(val) {
        if (val === "null" || val === '') {
            return setSearchResult(testProducts);
        }
        val = val.toLowerCase();
        setSearchResult([])
        let list = []
        testProducts.forEach(product => {
            if (product.title.includes(val) === true || product.tags.includes(val) === true) {
                console.log("found one")
                list.push(product)
            }
        })
        setSearchResult(list)  
        console.log(val, "found in: ", searchResult);

        //GetRelatedTags()
    }

    if(loading === true){
        return(
            <View style = {styles.container}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: theme.color,
                    paddingTop: 40,
                    marginBottom: 10,
                    elevation: 10,
                    paddingBottom: 10,
                }}>
                    <MaterialIcons name="arrow-back-ios" size={24} color={colors.white} style={{ marginLeft: 10 }} onPress={() => navigation.goBack()} />
                    <View>
                        <TextInput
                            onChangeText={(val) => Search(val)}
                            style={{
                                borderRadius: sizes.ExtraLarge,
                                paddingHorizontal: sizes.Small,
                                backgroundColor: theme.bgColor,
                                height: 40,
                                width: 350,
                                marginHorizontal: sizes.ExtraSmall,
                            }}
                            placeholder="snacks, assignments, stationaries..."
                        />
                    </View>
                </View>
                <Loading/>
            </View>
        )
    }else{
        return (
            <View style={styles.container}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: theme.color,
                    marginBottom: 10,
                    elevation: 10,
                    paddingBottom: 10,
                    paddingTop: 10,
                }}>
                    <MaterialIcons name="arrow-back-ios" size={24} color={colors.white} style={{ marginLeft: 10 }} onPress={() => navigation.goBack()} />
                    <View>
                        <TextInput
                            onChangeText={(val) => Search(val)}
                            style={{
                                borderRadius: sizes.ExtraLarge,
                                paddingHorizontal: sizes.Small,
                                backgroundColor: theme.bgColor,
                                height: 40,
                                width: 350,
                                marginHorizontal: sizes.ExtraSmall,
                            }}
                            placeholder="snacks, assignments, stationaries..."
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

                                        <ProductVertical
                                            title={item.title}
                                            image={item.image}
                                            method={() => navigation.navigate("Product", { item })}
                                        />
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
