import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {colors, sizes} from '../constants/Data'
import {ProfilePicture} from "../constants/Components";
import {currentUser} from './LoadingScreen';

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
        <View>
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
        </View>
    )
}


const MyAccountScreen = ({route, navigation}) => {
    // const user = route.params.currentUser;

    return (
        <View style={styles.container}>
            <View style={{
                backgroundColor: colors.defaultBG4,
                alignItems: "center",
            }}>
                <View style={{
                    alignItems: "center"
                }}>
                    <ProfilePicture image={currentUser.profilePicture} color={colors.white}/>
                    <Text style={{color: colors.white, fontSize: sizes.Medium}}>{currentUser.name}</Text>
                </View>
                <View>
                    <View style={{
                        justifyContent: "row",
                        alignItems: "center",
                    }}>
                        <Clickable value={currentUser.followers.length} title={"followers"}/>
                        <Clickable value={currentUser.following.length} title={"followers"}/>
                        <Clickable value={currentUser.sellerInfo.productList.length} title={"products"}/>
                    </View>
                </View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("EditProfile")
                }}>
                    <Text style={{color: colors.white, fontSize: sizes.Small}}>Edit</Text>
                </TouchableOpacity>
            </View>
            <View style={{
                backgroundColor: colors.white,
                borderTopRightRadius: sizes.Medium + 10,
                borderTopLeftRadius: sizes.Medium + 10,
            }}>
                <View>

                </View>
                <View>

                </View>
            </View>
        </View>
    );
}

export default MyAccountScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: "flex-start",
        paddingTop: sizes.ExtraLarge,
    },
});
