import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native'
import {colors, sizes, testUsers, users} from '../constants/Data'
import {Button, ProfilePicture} from "../constants/Components";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Clickable = (props) => {
    return (
        <View style={{
            flexDirection: "column",
            margin: 5,
        }}>
            <TouchableOpacity onPress={props.method}>
                <Text style={{
                    fontSize: sizes.Small,
                    color: colors.white,
                }}>
                    {props.value}
                </Text>
                <Text style={{
                    fontSize: sizes.ExtraSmall,
                    color: colors.white,
                }}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const Products = ({props}) => {
    return (
        <ScrollView>
            <TouchableOpacity style={{
                height: 300,
                width: 200,
                backgroundColor: colors.white,
                padding: sizes.ExtraSmall,
                margin: 10,
                justifyContent: "space-between",
                borderRadius: sizes.Small,
            }}>
                <View style={{
                    alignItems: "flex-start",
                }}>
                    <Text style={{
                        fontSize: sizes.Large,
                    }}>
                        {props.title}
                    </Text>
                </View>
                <View style={{
                    height: 125,
                    width: 125,
                    alignSelf: "center",
                    justifyContent: "center",
                }}>
                    <Image
                        style={{
                            flex: 1,
                            alignSelf: "center",
                        }}
                        resizeMode="contain"
                        source={props.image}/>
                </View>
                <View style={{
                    alignItems: "flex-start",
                }}>
                    <TouchableOpacity
                        onPress={props.method}
                    >
                        <Text style={{
                            fontSize: sizes.Small
                        }}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

async function GetUserData(id) {
    const data = await AsyncStorage.getItem('Users');
    const users = JSON.parse(data);

    console.log("Users: " + users + "\n Data: " + data);
    const user = await GetData(id, users);
    return user;
}

const UserAccount = ({route, navigation}) => {
    const userId = route.params.id;
    const user = GetUserData(userId);
    console.log("User: " + user + " \n From Account Screen");


    return (
        <View style={styles.container}>
            <View>
                <View>
                    <ProfilePicture image = {user.profilePicture}/>
                    <Text>{user.name}</Text>
                </View>
                <View>
                    {/* <Clickable value={user.followers.length} title={"Followers"}/>
                    <Clickable value={user.following.length} title={"Following"}/>
                    <Clickable value={user.sellerInfo.productList.length} title={"Posts"}/> */}
                </View>
            </View>
        </View>
    );
}

export default UserAccount;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: "flex-start",
        paddingTop: sizes.ExtraLarge,
    },

    section: {
        borderTopWidth: 1,
        borderColor: colors.grey,
    }
});
