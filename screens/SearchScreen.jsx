import React, {useState} from 'react'
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput} from 'react-native'
import {colors, sizes, testProducts} from '../constants/Data';
import {ProductCategory, ProductVertical, SearchBar} from '../constants/Components';
import { MaterialIcons } from '@expo/vector-icons';

const theme = colors.lightTheme;

export default function SearchScreen({navigation, route}) {

    const [searchResult, setSearchResult] = useState(testProducts)
    const [relatedTags, setRelatedTags] = useState([])

    const searchText = route.params.search;

    function GetRelatedTags() {
        let tags = []
        searchResult.forEach(result => {
            result.tags.forEach(tag => {
                tags.push.apply(tags, tag)
            })

            tags.forEach(tag => {
                let id = relatedTags.length.toString()
                relatedTags.push({
                    Tag: tag,
                    Id: id
                })
            })
        })

    }

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

    return (
        <View style={styles.container}>
            <View style = {{
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
            <View>
                <View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.Id}
                        data={relatedTags}
                        renderItem={({ item }) => {
                            return (
                                // <ProductCategory
                                //     text={item.Tag}
                                //     method={() => Search(item.Tag)}//navigation.navigate("Search", {search: item.name})}
                                // />
                                <View></View>
                            );
                        }}
                    />
                </View>
                <View>
                    <FlatList
                        vertical
                        numColumns={1}
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
                <View>
                    <Text>Suggested</Text>
                    <View>
                        
                    </View>
                </View>
            </View>

        </View>
    )
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
