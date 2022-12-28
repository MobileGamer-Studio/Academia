import React, {useState, useEffect} from 'react'
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Button, InfoInput, Header} from '../constants/Components';
import {Category, colors, Product, sizes} from '../constants/Data'
import * as ImagePicker from "expo-image-picker"
import {MaterialIcons} from "@expo/vector-icons"
import { firestore } from "../constants/Sever";
import {setDoc, doc, collection, onSnapshot } from "firebase/firestore";

const theme = colors.lightTheme;
const UploadProduct = ({route, navigation}) => {


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState("0");
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState('');
    const [selectedImage, setSelectedImage] = useState("https://firebasestorage.googleapis.com/v0/b/academia-c3d0e.appspot.com/o/Images%2FCameraIcon-coloured.png?alt=media&token=0ac47e13-7a64-466b-8027-1f9ae3b006d6");


    const userId = route.params.id;
    const [products, setProducts] = useState([])
    const [user, setUser] = useState({})


    useEffect(() => {
        const productsSub = onSnapshot(collection(firestore, "Products"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            setProducts(data)
        });

        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            setUser(doc.data())
        });

    }, [])

    const GetImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            //allowsEditing: true,
            quality: 1,
        });

        if (result.cancelled === false) {
            console.log(result);
            setSelectedImage(result.uri);
        } else {
            setSelectedImage("https://firebasestorage.googleapis.com/v0/b/academia-c3d0e.appspot.com/o/Images%2FCameraIcon-coloured.png?alt=media&token=0ac47e13-7a64-466b-8027-1f9ae3b006d6")
            alert('You did not select any image.');
        }
    }

    const addTag = (val) => {
        //tagsList.push(val);
        tags.push(val);
        console.log(tags);
        setTag('');
    }



    const uploadProduct = async () => {
        const newProduct = Product;
        newProduct.title = title;
        newProduct.description = description;
        newProduct.price = price;
        newProduct.seller = userId;
        newProduct.tags = tags;
        newProduct.image = selectedImage;
        newProduct.id = userId + "-" + newProduct.title 


        if (user.sellerInfo.productList.includes(newProduct.id) === false){
            user.sellerInfo.productList.push(newProduct.id);

            await setDoc(doc(firestore, "Users", userId), user);
            await setDoc(doc(firestore, "Products", newProduct.id), newProduct);
        }else{
            alert("Product already exists")
        }

        console.log(newProduct +"\n"+ user)
    }

    return (
        <View style={styles.container}>
            <Header method={() => navigation.goBack()} text={'Upload Product'} />
            <ScrollView showsVerticalScrollIndicator = {false}>
                <View style={styles.field}>
                    <Text style={{ marginHorizontal: 5 }}>{"Product: " + title}</Text>
                    <InfoInput
                        method={(val) => setTitle(val)}
                        placeholder={"product name"}
                    />

                </View>
                <View style={styles.field}>
                    <Text style={{ marginHorizontal: 5 }}>{"Description: " + description}</Text>
                    <InfoInput
                        method={(val) => setDescription(val)}
                        placeholder={"description"}
                    />

                </View>
                <View style={styles.field}>
                    <Text>{"Naira " + price}</Text>
                    <InfoInput
                        method={(val) => setPrice(val)}
                        placeholder={"price"}
                    />

                </View>
                <View style={styles.field}>
                    <Text style={{ marginHorizontal: 5 }}>{"Category: " + category}</Text>
                    <InfoInput
                        method={(val) => setCategory(val)}
                        placeholder={"category"}
                    />

                </View>
                <View style={styles.field}>
                    <View style={{
                        flexDirection: "row",
                        
                    }}>
                        <Text style={{ marginHorizontal: 5 }}>{"Tags: "}</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            // keyExtractor={(item) => item.id}
                            data={tags}
                            renderItem={({item}) => {
                                return (
                                    <Tag tagName={item}/>
                                );
                            }}

                        />
                    </View>
                    <InfoInput
                        method={(val) => setTag(val)}
                        placeholder={"tag"}
                        value={tag}
                    />

                    <View style={{
                        justifyContent: "flex-end",
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity
                            onPress={() => addTag(tag)}
                            style={{
                                borderRadius: sizes.Small,
                                padding: 5,
                                backgroundColor: theme.color,
                                margin: 5,
                                width: 100,
                                alignItems: "center",

                            }}
                        >
                            <Text style={{color: colors.white}}>Add Tag</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View style={{
                        flexDirection: "row"
                    }}>
                        <View style={{ marginHorizontal: 1 }}><MaterialIcons name="image" size={24} color={colors.defaultBG4} /></View>
                        <Button
                            method={() => GetImage()}
                            text={"Get Image"}
                            textStyle={{ color: theme.color, fontSize: sizes.Small }}
                        />

                    </View>
                    <View style={{
                        height: 100,
                        width: 100,
                        justifyContent: "center",
                    }}>
                        <Image
                            style={{
                                flex: 1,
                                alignSelf: "center",
                            }}
                            resizeMode="contain"
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/academia-c3d0e.appspot.com/o/Images%2FCameraIcon-coloured.png?alt=media&token=0ac47e13-7a64-466b-8027-1f9ae3b006d6" }}
                        />
                    </View>

                    {/* <ImageViewer
                        placeholderImageSource={"https://firebasestorage.googleapis.com/v0/b/academia-c3d0e.appspot.com/o/Images%2FCameraIcon-coloured.png?alt=media&token=0ac47e13-7a64-466b-8027-1f9ae3b006d6"}
                        selectedImage={selectedImage}
                    /> */}
                    
                </View>
            </ScrollView>
            <View style={{
                flexDirection: "row",
                bottom: 0,
                alignItems: "center",
                justifyContent: "space-evenly",
            }}>
                <Button
                    style={styles.button}
                    method={() => {
                        uploadProduct()
                        navigation.goBack()
                    }}
                    text={"Upload"}
                    textStyle={{color: colors.white, fontSize: sizes.Medium}}
                />

                <Button
                    style={styles.button_outline}
                    method={() => navigation.navigate("Home", {id: user.id})}
                    text={"Cancel"}
                    textStyle={{ color: theme.color, fontSize: sizes.Medium}}
                />

            </View>
        </View>
    )
}

function ImageViewer({ placeholderImageSource, selectedImage }) {
    const imageSource = selectedImage !== null
        ? selectedImage
        : placeholderImageSource;

    return <Image source={{uri: imageSource}}/>
}

const Tag = (props) => {
    return (
        <View style={{
            backgroundColor: theme.color,
            marginHorizontal: 10,
            borderRadius: sizes.ExtraLarge,
            paddingHorizontal: 10,
            paddingVertical: 2.5
        }}>
            <Text style={{
                color: colors.white,
                fontSize: sizes.Small,
            }}>{"#" + props.tagName}</Text>
        </View>
    );
}

export default UploadProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
        paddingBottom: sizes.Small,
    },

    button: {
        borderRadius: sizes.ExtraLarge,
        padding: 5,
        backgroundColor: theme.color,
        marginHorizontal: 5,
        marginTop: 20,
        width: 150,
        alignItems: "center",
    },

    button_outline: {
        borderRadius: sizes.ExtraLarge,
        borderWidth: 1,
        padding: 5,
        borderColor: theme.color,
        marginHorizontal: 5,
        marginTop: 20,
        width: 150,
        alignItems: "center",
    },

    field: {
        borderBottomWidth: 1,
        borderBottomColor: theme.outline,
        marginVertical: 5,
        padding: 2.5,
    },
})
