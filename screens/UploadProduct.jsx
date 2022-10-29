import React, {useState} from 'react'
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Button, InfoInput} from '../constants/Components';
import {colors, sizes} from '../constants/Data'
import * as ImagePicker from "expo-image-picker"


const UploadProduct = ({route, navigation}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("0");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("....");
    const [selectedImage, setSelectedImage] = useState(null);


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

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.field}>
                    <Text>{"Product: " + title}</Text>
                    <InfoInput
                        method={(val) => setTitle(val)}
                        placeholder={"product name"}
                    />

                </View>
                <View style={styles.field}>
                    <Text>{"Description: " + description}</Text>
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
                    <Text>{"Category: " + category}</Text>
                    <InfoInput
                        method={(val) => setCategory(val)}
                        placeholder={"category"}
                    />

                </View>
                <View style={styles.field}>
                    <View style={{
                        flexDirection: "row"
                    }}>
                        <Text>{"Tags: "}</Text>
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
                                backgroundColor: colors.defaultBG4,
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
                        flexDirection: "column",
                    }}>
                        <ImageSample image={selectedImage}/>
                    </View>
                    <View>
                        <Button
                            method={() => GetImage()}
                            text={"Get Image"}
                            textStyle={{color: colors.defaultBG4, fontSize: sizes.Small}}
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
                    method={() => console.log("Uploaded")}
                    text={"Upload"}
                    textStyle={{color: colors.white, fontSize: sizes.Medium}}
                />

                <Button
                    style={styles.button_outline}
                    method={() => navigation.navigate("Home")}
                    text={"Cancel"}
                    textStyle={{color: colors.defaultBG4, fontSize: sizes.Medium}}
                />

            </View>
        </View>
    )
}

const ImageSample = (props) => {
    return (
        <View>
            <Image source={props.image} />
        </View>
    );
}

const Tag = (props) => {
    return (
        <View style={{
            backgroundColor: colors.defaultBG4,
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
        backgroundColor: colors.white,
        padding: sizes.ExtraSmall,
    },

    button: {
        borderRadius: sizes.ExtraLarge,
        padding: 5,
        backgroundColor: colors.defaultBG4,
        marginHorizontal: 5,
        marginTop: 20,
        width: 150,
        alignItems: "center",
    },

    button_outline: {
        borderRadius: sizes.ExtraLarge,
        borderWidth: 1,
        padding: 5,
        borderColor: colors.defaultBG4,
        marginHorizontal: 5,
        marginTop: 20,
        width: 150,
        alignItems: "center",
    },

    field: {
        borderBottomWidth: 1,
        borderBottomColor: colors.defaultBG4,
        marginVertical: 5,
        padding: 2.5,
    },
})
