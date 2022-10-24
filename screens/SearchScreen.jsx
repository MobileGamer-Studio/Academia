import React, {useState} from 'react'
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native'
import {colors, sizes, testProducts} from '../constants/Data';
import {ProductCategory, SearchBar} from '../constants/Components';


const Product = ({props}) => {
    return (
        <View>
            <TouchableOpacity
                style={{
                    backgroundColor: colors.white,
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

export default function SearchScreen({navigation, route}) {

    const [searchResult, setSearchResult] = useState([])
    const [relatedTags, setRelatedTags] = useState([])

    const searchText = route.params.search;

    const Search = (val) => {
        if (val ==- "null") return setSearchResult(testProducts);
        val = val.toLowerCase();
        testProducts.forEach(product => {
            if (product.tags.includes(val)) {
                console.log("found one")
                searchResult.push(product)
            }
        })
        console.log(val, "found in: ", searchResult);

        searchResult.forEach(result => {
            result.tags.forEach(tag => {
                if (!relatedTags.includes(tag)) {
                    let id = relatedTags.length.toString()
                    relatedTags.push({
                        Tag: tag,
                        Id: id,
                    })
                }
            })
        })
    }

    Search(searchText);
    return (
        <View style={styles.container}>
            <View>
                <SearchBar
                    method={(val) => Search(val)}
                />
            </View>
            <ScrollView>
                <View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.Id}
                        data={relatedTags}
                        renderItem={({ item }) => {
                            return (
                                <ProductCategory
                                    text={item.Tag}
                                    method={() => Search(item.Tag)}//navigation.navigate("Search", {search: item.name})}
                                />
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
                                <Product
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
                        <FlatList
                            renderItem={({item}) => {
                                return  (
                                   <View/> 
                                );
                            }}
                        />
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: sizes.ExtraLarge,
        flex: 1,
    }
})
