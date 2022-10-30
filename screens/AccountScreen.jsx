import React, {useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors, sizes, testUsers, testProducts} from '../constants/Data';
import {Button, ProductSmall, ProfilePicture, ProductVertical} from '../constants/Components';
import { firestore } from "../constants/Sever";
import { getDocs, collection} from "firebase/firestore";
import { Entypo } from '@expo/vector-icons';

function AccountScreen({route, navigation}) {

    const user = route.params.user;
    const userId = route.params.id;



    return (
        <View style={styles.container}>
            <View style = {styles.userProfile}>
                <View style={{ alignItems: "flex-end", marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("", { id: userId })}>
                        <Entypo name="dots-three-vertical" size={24} color={colors.defaultBG4} />
                    </TouchableOpacity>
                </View>
                <View style = {{
                    alignItems: "center",
                }}>
                    <ProfilePicture color={colors.defaultBG2} image={user.profilePicture} height = {100} width = {100}/>
                    <Text style={{ color: colors.defaultBG4, fontSize: 20 }}>{user.name}</Text>
                </View>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',

                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 10,
                    }}>
                        <TouchableOpacity style={{
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}
                        
                        onPress = {() => navigation.navigate("Following", {user: user})}>
                            <Text style={{ color: colors.defaultBG4 }}>Following</Text>
                            <Text style={{ color: colors.defaultBG4 }}>{user.following.length}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}
                        
                        onPress = {() => navigation.navigate("Followers", {user: user})}>
                            <Text style={{ color: colors.defaultBG4 }}>Followers</Text>
                            <Text style={{ color: colors.defaultBG4 }}>{ user.followers.length }</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}>
                            <Text style={{ color: colors.defaultBG4 }}>Products</Text>
                            <Text style={{ color: colors.defaultBG4 }}>10</Text>
                        </TouchableOpacity>

                    </View>
                    <View>
                        <Text style={{ color: colors.defaultBG4 }}>{user.description}</Text>
                    </View>
                    <View style = {{flexDirection: "row"}}>
                        <Button
                            style={styles.follow}
                            method={() => console.log("Follow")}
                            text={"Follow"}
                            textStyle={{ color: colors.white, fontSize: sizes.Medium }}
                        />
                        <Button
                            style={styles.message_btn}
                            method={() => navigation.navigate("Chat", {rec : user, id: userId})}
                            text={"Message"}
                            textStyle={{ color: colors.defaultBG4, fontSize: sizes.Medium }}
                        />
                    </View>
                </View>
            </View>

            <View>
                <Text style={{ marginLeft: 15, marginTop: 15, fontSize: 25 }}>Products</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={user.sellerInfo.productList}
                    renderItem={({ item }) => {
                        return (
                            <ProductVertical
                                product={item}
                                title={item.title}
                                price={item.price}
                                image={item.image}
                                seller={item.seller}
                                method={() => navigation.navigate("Product", { item })}
                            />
                        )
                    }}
                />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.defaultBG4,
    },

    follow: {
        borderRadius: sizes.ExtraLarge,
        padding: 5,
        backgroundColor: colors.defaultBG4,
        marginHorizontal: 5,
        marginTop: 20,
        width: 150,
        alignItems: "center",
    },

    unfollow: {
        borderRadius: sizes.ExtraLarge,
        padding: 5,
        backgroundColor: colors.defaultBG4_Selected,
        marginHorizontal: 5,
        marginTop: 20,
        width: 150,
        alignItems: "center",
    },

    message_btn: {
        borderRadius: sizes.ExtraLarge,
        borderWidth: 1,
        padding: 5,
        borderColor: colors.defaultBG4,
        marginHorizontal: 5,
        marginTop: 20,
        width: 150,
        alignItems: "center",
    },

    userProfile: {
        flexDirection: 'column',
        padding: sizes.Small,
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        borderBottomLeftRadius: 75,
        borderBottomRightRadius: 75,
        paddingTop: 60,
        paddingBottom: 50,
    },
});

export default AccountScreen;
