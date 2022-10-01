import React, {useState} from 'react'
import {FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {colors, sizes} from '../constants/Data'


const InfoInput = (props) => {
    return (
        <View>
            <TextInput
                style={{
                    height: 40,
                    backfaceVisibility: colors.white,
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
    return(
        <View>
            <View style={{
                backgroundColor: colors.white,
                flexDirection: "row",
            }}>
                <Text>{props.itemName}</Text>
                <TouchableOpacity>
                    <View>
                        <Image/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const UploadProduct = () => {
    let tagsList = [];

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState(tagsList);
    const [tag, setTag] = useState("");

    const addTag = (val) => {
        tagsList.push(val);
        setTags(tagsList);
        console.log(tagsList);
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <View>
                    //Title
                    <InfoInput
                        method={(val) => setTitle(val)}
                    />
                    <Text>{title}</Text>
                </View>
                <View>
                    //Description
                    <InfoInput
                        method={(val) => setDescription(val)}
                    />
                    <Text>{description}</Text>
                </View>
                <View>
                    //Price
                    <InfoInput
                        method={(val) => setPrice(val)}
                    />
                    <Text>{"Naira " + price}</Text>
                </View>
                <View>
                    //Category
                    <InfoInput
                        method={(val) => setCategory(val)}
                    />
                    <Text>{category}</Text>
                </View>
                <View>
                    //tags
                    <InfoInput
                        method={(val) => setTag(val)}
                    />
                    <TouchableOpacity
                        onPress={() => addTag(tag)}
                    >
                        <Text>Add Tag</Text>
                    </TouchableOpacity>
                    <View>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            data={tags}
                            renderItem={({item}) => {
                                return (
                                    <Item item = {item}/>
                                );
                            }}
                        />
                    </View>
                </View>
            </View>
            <View style={{
                flexDirection: "row"
            }}>
                <TouchableOpacity style={{}}>
                    <Text>Upload</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{}}>
                    <Text>Cancel</Text>
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
        backgroundColor: colors.defaultBG2,
    }
})
