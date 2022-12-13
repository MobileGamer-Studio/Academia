import React, {useState} from 'react'
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Button, InfoInput} from '../constants/Components';
import {Category, colors, Product, sizes} from '../constants/Data'
import * as ImagePicker from "expo-image-picker"
import {MaterialIcons} from "@expo/vector-icons"
import { firestore } from "../constants/Sever";
import {setDoc, doc, collection } from "firebase/firestore";

const theme = colors.lightTheme
const UploadProduct = ({route, navigation}) => {

    const user = route.params.user;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("0");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("....");
    const [selectedImage, setSelectedImage] = useState({uri: ""});


    async function GetImage() {
        let pickedImage = ImagePicker.launchImageLibraryAsync()
        console.log(pickedImage);
        if (pickedImage.cancelled === true) {
            return;
        }

        setSelectedImage(pickedImage.uri);
        console.log(selectedImage);
    }

    const addTag = (val) => {
        //tagsList.push(val);
        tags.push(val);
        console.log(tags);
    }

    async function uploadProduct(){
        const newProduct = Product;
        newProduct.title = title;
        newProduct.description = description;
        newProduct.category = Category;
        newProduct.category.name = category;
        newProduct.price = price;
        newProduct.seller = user.name;
        newProduct.tags = tags;
        newProduct.image = selectedImage.uri;
        newProduct.id = user.id + "_" + newProduct.title 


        user.sellerInfo.productList.push(newProduct);
        await setDoc(doc(firestore, "Users", user.id), user);
        await setDoc(doc(firestore, "Products", newProduct.id), newProduct);

        console.log(newProduct +"\n"+ user)
    }

    return (
        <View style={styles.container}>
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
                        backgroundColor: colors.white,
                        alignItems: "center",
                        alignSelf: "center",
                    }}>
                        <Image 
                            source={{ uri: selectedImage }}
                            style={{
                                flex: 1,
                                borderRadius: sizes.ExtraLarge,
                            }}
                        />
                    </View>
                    
                </View>
            </ScrollView>
            <View style={{
                flexDirection: "row",
                bottom: 0,
                alignItems: "center",
                justifyContent: "space-evenly"
            }}>
                <Button
                    style={styles.button}
                    method={() => uploadProduct()}
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

const ImageSample = (props) => {
    return (
        <View style = {{
            backgroundColor: colors.white,
            height: 200,
            width: 200,
            alignItems: "center",
            alignSelf: "center",
        }}>
            <Image style={{
                height: 200,
                width: 200,
                flex: 1,
                borderRadius: sizes.ExtraLarge,
            }} 
            source={{uri: props.image}} />
        </View>
    );
}

const Tag = (props) => {
    return (
        <View style={{
            backgroundColor: theme.color,
            marginHorizontal: 10,
            height: 25,
            borderRadius: sizes.ExtraLarge,
            paddingHorizontal: 10
        }}>
            <Text style={{
                color: colors.white,
                fontSize: sizes.Small + 2,
            }}>{"#" + props.tagName}</Text>
        </View>
    );
}

export default UploadProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: sizes.ExtraLarge,
        backgroundColor: theme.bgColor,
        paddingVertical: sizes.Large,
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
        borderBottomColor: theme.color,
        marginVertical: 5,
        padding: 2.5,
    },
})
