import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {colors, sizes, users} from '../constants/Data';
import {Button, ProductMin, ProfilePicture} from '../constants/Components';
import {GetUserData} from "../constants/AppManger";

// function GetUserData(id) {
//     let user;
//     users.forEach((item) => {
//         if (item.id === id) {
//             console.log("from function: ")
//             console.log("UserId: " + item.id + ", User Data: " + item + ",item");
//             user = item;
//             console.log("UserId: " + item.id + ", User Data: " + user + ", user");
//         }
//     })
//     return user;
//     // console.log("error in getting user")
// }

function UserProfile(props) {
    return (
        <View style={styles.userProfile}>
            <ProfilePicture color={colors.defaultBG2} image={props.image}/>
            <View style={{
                flexDirection: 'column',
            }}>
                <Text style={{
                    paddingHorizontal: 10,
                    fontSize: sizes.Medium,
                }}>{props.name}</Text>
                <Text style={{
                    paddingHorizontal: 10,
                    fontSize: sizes.Small,
                }}>{props.description}</Text>
                <Text style={{
                    paddingHorizontal: 10,
                    fontSize: sizes.Small,
                }}>{props.followers + " followers"}</Text>
            </View>
            <Button title={"follow"} method={props.follow}/>
        </View>
    );
}

function AccountScreen({route, navigation}) {

    const userId = route.params.id;
    const user = GetUserData(userId)



    function Follow() {
        console.log("")
    }

    return (
        <View style={styles.container}>
            <UserProfile
                name={user.name}
                description={user.description}
                image={user.profilePicture}
                follow={() => Follow()}
            />
            <View style={{
                flexDirection: "column",
                alignItems: "center",
            }}>
                <Text style={{
                    fontSize: sizes.Medium,
                    alignSelf: "flex-start",
                    margin: sizes.ExtraSmall,
                }}>Products</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={user.sellerInfo.productList}
                    renderItem={({item}) => {
                        return (
                            <ProductMin
                                product={item}
                                title={item.title}
                                price={item.price}
                                image={item.image}
                                method={() => navigation.navigate("Product", {item})}
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
        backgroundColor: colors.defaultBG2,
        paddingTop: 10,
        paddingHorizontal: 5,
    },

    userProfile: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignContent: 'center',
        padding: sizes.Medium,
        //elevation: sizes.Medium,
        margin: sizes.ExtraSmall,
    },
});

export default AccountScreen;
