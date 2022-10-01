import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {categories, colors, sizes, suggestedProducts, topSellers, users} from '../constants/Data';
import { ProductCategory, ProductMax, RoundButton, SearchBar, UserProfileMin} from '../constants/Components';
import {FaHome} from "react-icons/fa"

const homeIMG = FaHome;

const NavBar = () => {
    return(
        <View style= {{
            backgroundColor: colors.white,
        }}>
            <FaHome />
        </View>
    )
}

function HomeScreen({route, navigation}) {
    // const currentUser = route.params.user;
    const currentUser = users[0]
    console.log(currentUser);

    return (
        <View style={styles.container}>
            <View style= {{
            backgroundColor: colors.white,
            }}>
                <Image source={homeIMG}/>
            </View>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                backgroundColor: colors.defaultBG2,
            }}>
                <SearchBar/>
                <RoundButton
                    // image={currentUser.profilePicture}
                    height={45}
                    width={45}
                    color={colors.white}
                    method={() => {
                        let item = currentUser;
                        navigation.navigate("UserAccount", {item});
                    }}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    marginVertical: sizes.ExtraSmall,
                }}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        data={categories}
                        renderItem={({item}) => {
                            return (
                                <ProductCategory
                                    text={item.name}
                                    method={() => navigation.navigate("Search", {item})}
                                />
                            )
                        }}
                    />
                </View>
                <View style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100%",
                    alignItems: "center",
                    marginVertical: sizes.ExtraSmall,
                }}>
                    <Text style={{
                        fontSize: sizes.Medium,
                        alignSelf: "flex-start",
                        marginLeft: sizes.Small,
                    }}>
                        Suggested
                    </Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        data={suggestedProducts}
                        renderItem={({item}) => {
                            return (
                                <ProductMax
                                    product={item}
                                    title={item.title}
                                    price={item.price}
                                    image={item.image}
                                    seller={item.seller}
                                    method={() => navigation.navigate("Product", {item})}
                                />
                            )
                        }}
                    />
                </View>
                <View style={{
                    marginVertical: sizes.Small,
                }}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        data={users}
                        renderItem={({item}) => {
                            return (
                                <UserProfileMin
                                    user={item}
                                    color={item.colors}
                                    image={item.profilePicture}
                                    method={() => navigation.navigate("Account", {item})}
                                />
                            )
                        }}
                    />
                </View>
                <View style={{
                    marginVertical: sizes.Small,
                }}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        data={topSellers}
                        renderItem={({item}) => {
                            return (
                                <View style={{
                                    backgroundColor: item.color,
                                    width: 300,
                                    height: 200,
                                    borderRadius: sizes.Medium,
                                    margin: sizes.Small,
                                    padding: sizes.ExtraSmall,
                                    justifyContent: "space-between",
                                }}>
                                    <Text style={{
                                        fontSize: sizes.ExtraLarge,
                                        color: colors.white,
                                    }}>
                                        {item.title}
                                    </Text>
                                    <TouchableOpacity style={{
                                        backgroundColor: colors.white,
                                        alignItems: "center",
                                        alignSelf: "flex-end",
                                        padding: 5,
                                        margin: 5,
                                        borderRadius: sizes.ExtraSmall,
                                    }}

                                                      onPress={() => navigation.navigate("Product", {item})}>
                                        <Text style={{
                                            fontSize: sizes.Medium,
                                        }}>
                                            Check Out
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.defaultBG2,
        paddingVertical: sizes.ExtraLarge,
    },
})

export default HomeScreen;
