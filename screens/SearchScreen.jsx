import React, {useState} from 'react'
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {categories, colors, products, sizes} from '../constants/Data';
import {ProductCategory, SearchBar} from '../constants/Components';

export default function SearchScreen({navigation, route}) {
    let items = [];
    const [searchResult, setSearchResult] = useState(products)

    const searchText = route.params.search;

    const Search = (val) => {
        if (!val.length) return setSearchResult(products);
        val = val.toLowerCase();
        for (let i = 0; i < products.length; i++) {
            let item = products[i].tags
            for (let x = 0; x < item.length; x++) {
                if (item[x].toLowerCase().includes(val)) {
                    items.push(products[i])
                } else {

                }
            }
        }
        setSearchResult(items)
        console.log(val, "\n", searchResult);
    }

    const goThroughData = (val) => {
        if (!val.length) return setSearchResult(products);

        const filterData = products.filter(item => item.tags.filter(tag => tag.toLowerCase().includes(val)));

        if (filterData.length) {
            setSearchResult(filterData)
        }
        console.log(filterData, "\n", searchResult);
    }

    //Search(searchText);
    return (
        <View style={styles.container}>
            <View>
                <SearchBar
                    method={(val) => Search(val)}
                />
            </View>
            <View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={categories}
                    renderItem={({item}) => {
                        return (
                            <ProductCategory
                                text={item.name}
                                method={() => navigation.navigate("Search", {search: item.name})}
                            />
                        );
                    }}
                />
            </View>
            <View>
                <FlatList
                    vertical
                    showsVerticalScrollIndicator={false}
                    data={searchResult}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: colors.white,
                                    marginVertical: sizes.ExtraSmall,
                                    marginHorizontal: 5,
                                    borderRadius: 10,
                                    padding: sizes.ExtraSmall,
                                    flexDirection: "row",
                                    height: 200,
                                }}

                                onPress={() => console.log(item)}
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
                                        source={item.image}
                                    />
                                </View>
                                <View style={{
                                    flexDirection: "column",
                                }}>
                                    <Text>{item.title}</Text>
                                    <Text>{item.description}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: sizes.ExtraLarge,
        flex: 1,
    }
})
