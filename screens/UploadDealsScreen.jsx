import React, {useState, useEffect} from 'react'
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, StatusBar} from 'react-native'
import {Button, InfoInput, Header} from '../constants/Components';
import {Category, colors, Deal, sizes} from '../constants/Data'
import * as ImagePicker from "expo-image-picker"
import {MaterialIcons} from "@expo/vector-icons"
import { firestore, storage } from "../constants/Sever";
import {setDoc, doc, collection, onSnapshot } from "firebase/firestore";
import {uploadBytesResumable, getDownloadURL, ref, } from "firebase/storage";

const theme = colors.lightTheme;
const UploadProduct = ({route, navigation}) => {
    const userId = route.params.id;
    const [deals, setDeals] = useState([])
    const [user, set_user] = useState({})


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [discount, setDiscount] = useState(0);
    const [expiryDate, setExpiryDate] = useState('');
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState('');
    const [numAvailable, setNumAvailable] = useState(0);
    const [selectedImage, setSelectedImage] = useState("https://firebasestorage.googleapis.com/v0/b/academia-c3d0e.appspot.com/o/Images%2FCameraIcon-coloured.png?alt=media&token=0ac47e13-7a64-466b-8027-1f9ae3b006d6");





    useEffect(() => {
        const dealsSub = onSnapshot(collection(firestore, "Deals"), (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            setDeals(data);
        });


        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            set_user(doc.data())
        });

    }, [])


    const addTag = (val) => {
        //tagsList.push(val);
        tags.push(val);
        console.log(tags);
        setTag('');
    }

    const uploadDeal = () => {
        const newDeal =  Deal
        newDeal.title = title
        newDeal.colors[1] = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")
        newDeal.colors[2] = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")
        newDeal.details = description
        newDeal.discount = discount
        newDeal.expiryDate = expiryDate
        newDeal.numAvailable = numAvailable
        newDeal.tags = tags

    }



    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={theme.color}
                barStyle='light-content'
            />
            <Header method={() => navigation.goBack()} text={'Upload Deal'} />
            <ScrollView showsVerticalScrollIndicator = {false}>
                <View style={styles.field}>
                    <Text style={{ marginHorizontal: 5 }}>{"Product: " + title}</Text>
                    <InfoInput
                        method={(val) => setTitle(val)}
                        placeholder={"Item name"}
                    />

                </View>
                <View style={styles.field}>
                    <Text style={{ marginHorizontal: 5 }}>{"Details: " + description}</Text>
                    <InfoInput
                        method={(val) => setDescription(val)}
                        placeholder={"Item description"}
                    />

                </View>
                <View style={styles.field}>
                    <View  style = {{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                        <Text style={{ marginHorizontal: 5 }}>{"Discount: -" + discount + '%'}</Text>
                        <Text style={{ marginHorizontal: 5 }}>{"NewPrice:   ₦ " + (price - (discount / 100 * price)).toString()}</Text>
                    </View>
                    <InfoInput
                        method={(val) => setDiscount(val)}
                        placeholder={"Discount given"}
                        keyboardType={'numeric'}
                    />

                </View>
                <View style={styles.field}>
                    <Text style={{ marginHorizontal: 5 }}>{"Number Available: " + numAvailable}</Text>
                    <InfoInput
                        method={(val) => setNumAvailable(val)}
                        placeholder={"Number of items currently available"}
                        keyboardType = {'numeric'}
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
                        const newProduct = Product;
                        newProduct.title = title;
                        newProduct.description = description;
                        newProduct.price = price;
                        newProduct.sellersId = userId;
                        newProduct.seller = user.name;
                        newProduct.discount = discount;
                        newProduct.amountAvailable = numAvailable;
                        newProduct.tags = tags;
                        newProduct.image = selectedImage;
                        newProduct.id = userId + "-" + newProduct.title 

                        navigation.navigate("ProductPreview", {id: user.id, product: newProduct})
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
