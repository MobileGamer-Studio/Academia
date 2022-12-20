import React, {useState} from 'react'
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native'
import {colors, sizes, testProducts} from '../constants/Data';
import {ProductCategory, ProductVertical, SearchBar} from '../constants/Components';


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
                margin: sizes.ExtraSmall,
            }}>
                <SearchBar
                    method={(val) => Search(val)}
                    colors = {theme.outline}
                />
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
        <View>
            <TouchableOpacity
                style={{
                    backgroundColor: theme.bgColor,
                    marginVertical: sizes.ExtraSmall,
                    marginHorizontal: 5,
                    borderRadius: 10,
                    padding: sizes.ExtraSmall,
                    flexDirection: "column",
                }}

                onPress={props.method}
            >
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
                <View style={{
                    flexDirection: "column",
                }}>
                    <Text>{props.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: sizes.ExtraLarge,
        flex: 1,
    }
})
