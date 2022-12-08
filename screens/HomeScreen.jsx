import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { categories, colors, sizes, suggestedProducts, testUsers, topSellers } from '../constants/Data';
import { NavBar, ProductCategory, ProductVertical, RoundButton, SearchBar, UserProfile } from '../constants/Components';
import { firestore } from "../constants/Sever";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";
import {GetData} from "../constants/AppManger"

function HomeScreen({ route, navigation }) {
    const userId = route.params.id;
    const [users, setUsers] = useState([])

    console.log("CHECK 1 \n User id:" + userId + "\n Users: " + users + "\n User: " + user)

    async function getUsers() {
        const querySnapshot = await getDocs(collection(firestore, "Users"));
        let data = []
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        });
        setUsers(data)
    }

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
                backgroundColor: colors.white
            }}>
                <RoundButton
                    image={user.profilePicture}
                    height={45}
                    width={45}
                    color={colors.white}
                    method={() => navigation.navigate("UserAccount", { id: userId, user: user })}
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text>Hello</Text>
                </View>
                <View style={styles.section}>
                    <Text>Hello</Text>
                </View>
                <View style={styles.section}>
                    <Text>Hello</Text>
                </View>
            </ScrollView>
            <NavBar
                home={() => navigation.navigate("Home", { id: userId })}
                search={() => navigation.navigate("Search", { search: "null" })}
                add={() => navigation.navigate("UploadProduct", { user: user })}
                cart={() => navigation.navigate("Cart", { user: user })}
                settings={() => navigation.navigate("Settings", { user: user })}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingVertical: sizes.ExtraLarge,
    },

    section: {
        marginVertical: sizes.ExtraSmall,
        borderBottomColor: colors.defaultBG4,
        borderBottomWidth: 1,
    },
})

export default HomeScreen;
