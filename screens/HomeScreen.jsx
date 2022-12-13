import React, { useState } from 'react';
import { FlatList, ScrollView, Image,  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { categories, colors, sizes, suggestedProducts, images } from '../constants/Data';
import { NavBar, ProductCategory, ProductVertical, RoundButton, SearchBar, UserProfile } from '../constants/Components';
import { firestore } from "../constants/Sever";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";
import { Entypo } from '@expo/vector-icons';

const theme = colors.lightTheme;
function HomeScreen({ route, navigation }) {
    const userId = route.params.id;
    const [users, setUsers] = useState([])

    async function getUsers() {
        const querySnapshot = await getDocs(collection(firestore, "Users"));
        let data = []
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        });
        setUsers(data)
    }

    getUsers().then(r => console.log("Promise resolved!"));

    let user = {}
    users.forEach((item) => {
        console.log("item: " + item.name)
        if (item.id === userId) {
            user = item
            console.log("got user: "+ user.name)
        }
    })
    //console.log("CHECK \n User id:" + userId + "\n Users: " + users + "\n User: " + user)


    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.white,
            }}>
                <View style={{
                    height: 40,
                    alignSelf: "center",
                    justifyContent: "center",
                }}>
                    <Image
                        style={{
                            flex: 1,
                            alignSelf: "center",
                        }}
                        resizeMode="contain"
                        source={images.academia}
                    />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
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
                <View style={styles.section}>
                    <Text>Check Out</Text>
                    <View style={{}}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            data={categories}
                            renderItem={({ item }) => {
                                return (
                                    <View></View>
                                )
                            }}
                        />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text>Suggested</Text>
                    <View style={{}}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            data={categories}
                            renderItem={({ item }) => {
                                return (
                                    <View></View>
                                )
                            }}
                        />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text>Best Sellers</Text>
                    <View style={{}}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            data={categories}
                            renderItem={({ item }) => {
                                return (
                                    <View></View>
                                )
                            }}
                        />
                    </View>
                </View>
                
                
            </ScrollView>
            <NavBar
                home={() => navigation.navigate("Home", { id: userId })}
                search={() => navigation.navigate("Search", { search: "null" })}
                add={() => navigation.navigate("UploadProduct", { user: user })}
                cart={() => navigation.navigate("Cart", { user: user })}
                profile={() => navigation.navigate("UserAccount", { user: user })}
                image = {user.profilePicture}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
        paddingVertical: sizes.ExtraLarge,
    },

    section: {
        marginVertical: sizes.ExtraSmall,
        borderBottomColor: theme.color,
        borderBottomWidth: 1,
    },

    sectionTitle: {
        fontSize: sizes.Large,
        fontWeight: "bold",
        color: theme.textColor,
        margin: sizes.ExtraSmall,
    },
})

export default HomeScreen;
