import React, {useState} from 'react'
import {FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {colors, sizes} from '../constants/Data'


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

    const [title, setTitle] = useState("Product name");
    const [description, setDescription] = useState("about the product");
    const [price, setPrice] = useState("10000");
    const [category, setCategory] = useState("Snacks");
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
                    <InfoInput
                        method={(val) => setTitle(val)}
                    />
                    <Text>{title}</Text>
                </View>
                <View>
                    <InfoInput
                        method={(val) => setDescription(val)}
                    />
                    <Text>{description}</Text>
                </View>
                <View>
                    <InfoInput
                        method={(val) => setPrice(val)}
                    />
                    <Text>{"Naira " + price}</Text>
                </View>
                <View>
                    <InfoInput
                        method={(val) => setCategory(val)}
                    />
                    <Text>{category}</Text>
                </View>
                <View>
                    <InfoInput
                        method={(val) => setTag(val)}
                    />
                    <TouchableOpacity
                        onPress={() => addTag(tag)}
                        style = {{
                            borderRadius: sizes.ExtraSmall,
                            borderWidth: 1,
                            width: 200,
                        }}
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
                <TouchableOpacity style = {styles.button}>
                    <Text>Upload</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button}>
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
        backgroundColor: colors.white,
        padding: sizes.ExtraSmall,
    },

    button: {
        borderRadius: sizes.ExtraSmall,
        borderWidth: 1,
        padding: sizes.ExtraSmall,
    }
})
