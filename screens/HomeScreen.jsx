import React, {useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {categories, colors, sizes, suggestedProducts, testUsers, topSellers} from '../constants/Data';
import {NavBar, ProductCategory, ProductVertical, RoundButton, SearchBar, UserProfile} from '../constants/Components';
import {firestore} from "../constants/Sever";
import {getDocs, collection, setDoc, doc} from "firebase/firestore";

function HomeScreen({route, navigation}) {
    const userId = route.params.id;
    const [users, setUsers] = useState([])

    console.log("CHECK 1 \n User id:"+ userId +"\n Users: " +users +"\n User: "+ user)

    async function getUsers() {
        const querySnapshot = await getDocs(collection(firestore, "Users"));
        let data = []
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        });
        setUsers(data)
    }

    async function saveUsers() {
        for (const item of users) {
            await setDoc(doc(firestore, "Users", item.id), item);
        }
    }

    saveUsers().then(r => console.log(r));
    
    getUsers().then(r => console.log(r));

    let user = {}
    users.forEach((item) => {
        if (item.id === userId) {
            user = item
            console.log("got user: ${user}")
        }
    })
    
    console.log("CHECK 2 \n User id:" + userId + "\n Users: " + users + "\n User: " + user)

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                backgroundColor: colors.defaultBG4,
            }}>
                <SearchBar/>
                <RoundButton
                    image={user.profilePicture}
                    height={45}
                    width={45}
                    color={colors.white}
                    method={() => navigation.navigate("UserAccount", {id: userId, user: user})}
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
                        vertical
                        numColumns= {2}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        data={suggestedProducts}
                        renderItem={({item}) => {
                            return (
                                <ProductVertical
                                    product={item}
                                    title={item.title}
                                    price={item.price}
                                    image={item.image}
                                    seller={item.seller}
                                    method={() => navigation.navigate("Product", {item})}
                                />
                            )
                        }}new 
                    />
                </View>
                <View style={{
                    marginVertical: sizes.Small,
                }}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        data={testUsers}
                        renderItem={({item}) => {
                            return (
                                <UserProfile
                                    user={item}
                                    color={item.colors}
                                    image={item.profilePicture}
                                    method={() => navigation.navigate("Account", {user : item, id: userId})}
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
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: colors.white,
                                            alignItems: "center",
                                            alignSelf: "flex-end",
                                            padding: 5,
                                            margin: 5,
                                            borderRadius: sizes.ExtraSmall,
                                        }}
                                        onPress={() => navigation.navigate("Product", {item})}
                                    >
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
            <NavBar
                home={() => navigation.navigate("Home", {id: userId})}
                search={() => navigation.navigate("Search", {search : "null"})}
                add={() => navigation.navigate("UploadProduct" , {user: user})}
                cart={() => navigation.navigate("Cart" , {user: user})}
                settings={() => navigation.navigate("Settings" , {user: user})}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.defaultBG4,
        paddingVertical: sizes.ExtraLarge,
    },
})

export default HomeScreen;
