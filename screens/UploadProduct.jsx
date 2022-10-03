import React, { useState, useEffect } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { colors, sizes } from '../constants/Data'


const InfoInput = (props) => {
    return (
        <View>
            <TextInput
                style={{
                    borderRadius: sizes.ExtraSmall,
                    borderWidth: 1,
                    margin: sizes.ExtraSmall,
                    paddingHorizontal: sizes.Small,
                    backgroundColor: colors.white,
                    height: 50,
                    width: 350,
                    borderColor: colors.defaultBG4,
                }}
                onChangeText={props.method}
                placeholder={props.placeholder}
                value={props.valueType}
                keyboardType={props.keyboardType}
            />
        </View>
    );
}

const Item = (props) => {
    return (
        <View>
            <View style={{
                backgroundColor: colors.white,
                flexDirection: "row",
            }}>
                <Text>{props.itemName}</Text>
            </View>
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
            }}>{"#" + props.tagName + ", "}</Text>
        </View>
    );
}

const UploadProduct = ({route, navigation}) => {
    let tagsList = [];

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("0");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("....");

    const addTag = (val) => {
        //tagsList.push(val);
        tags.push(val)
        console.log(tags);
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <View>
                    <Text>{"Product: " + title}</Text>
                    <InfoInput
                        method={(val) => setTitle(val)}
                        placeholder={"product name"}
                    />

                </View>
                <View>
                    <Text>{"Description: " + description}</Text>
                    <InfoInput
                        method={(val) => setDescription(val)}
                        placeholder={"description"}
                    />

                </View>
                <View>
                    <Text>{"Naira " + price}</Text>
                    <InfoInput
                        method={(val) => setPrice(val)}
                        placeholder={"price"}
                    />

                </View>
                <View>
                    <Text>{"Category: " + category}</Text>
                    <InfoInput
                        method={(val) => setCategory(val)}
                        placeholder={"category"}
                    />

                </View>
                <View>
                    <View style={{
                        flexDirection: "row"
                    }}>
                        <Text>{"Tags: "}</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            // keyExtractor={(item) => item.id}
                            data={tags}
                            renderItem={({ item }) => {
                                return (
                                    <Tag tagName={item} />
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
                            <Text style={{ color: colors.white }}>Add Tag</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{
                flexDirection: "row",
                bottom: 0,
                alignItems: "center",
                justifyContent: "space-evenly"
            }}>
                <TouchableOpacity style={{
                    borderRadius: sizes.ExtraLarge,
                    padding: 5,
                    backgroundColor: colors.defaultBG4,
                    marginHorizontal: 5,
                    marginTop: 20,
                    width: 150,
                    alignItems: "center",
                }}>
                    <Text style={{ color: colors.white, fontSize: sizes.Medium }}>Upload</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    borderRadius: sizes.ExtraLarge,
                    padding: 5,
                    borderColor: colors.defaultBG4,
                    borderWidth: 2,
                    marginHorizontal: 5,
                    marginTop: 20,
                    width: 150,
                    alignItems: "center",
                }}
                onPress = {() => navigation.navigate("Home")}
                >
                    <Text style={{ color: colors.defaultBG4, fontSize: sizes.Medium }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
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
    }
})
