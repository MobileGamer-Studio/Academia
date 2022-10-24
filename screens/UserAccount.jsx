import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native'
import {colors, sizes, users} from '../constants/Data'
import {Button, ProfilePicture} from "../constants/Components";
import {GetUserData} from "../constants/AppManger";

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

const UserAccount = ({route, navigation}) => {
    const userId = route.params.id;
    const user = GetUserData(userId)


    return (
        <View style={styles.container}>
            <View>
                <View>
                    <ProfilePicture image = {user.profilePicture}/>
                    <Text>{user.name}</Text>
                </View>
                <View>
                    <Clickable value={user.followers.length} title={"Followers"}/>
                    <Clickable value={user.following.length} title={"Following"}/>
                    <Clickable value={user.sellerInfo.productList.length} title={"Posts"}/>
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
