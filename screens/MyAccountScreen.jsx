import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {colors, sizes} from '../constants/Data'
import {ProfilePicture} from "../constants/Components";


const Clickable = (props) => {
    return (
        <View style={{
            flexDirection: "column",
        }}>
            <TouchableOpacity onPress={props.method}>
                <Text style={{
                    fontSize: sizes.Small,
                }}>
                    {props.value}
                </Text>
                <Text style={{
                    fontSize: sizes.ExtraSmall,
                }}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        </View>
    );
}


const MyAccountScreen = ({route, navigation}) => {
    const user = route.params.currentUser;

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                margin: 5,
            }}
            >
                <View style={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <ProfilePicture image={user.profilePicture} color={colors.white}/>
                    <Text>{user.name}</Text>
                </View>
                <View style = {{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <View>
                        <Clickable value={user.following.length} title={"Following"} methods={() => {
                        }}/>
                    </View>
                    <View>
                        <Clickable value={user.followers.length} title={"Followers"} methods={() => {
                        }}/>
                    </View>
                    <View>
                        <Clickable value={user.sellerInfo.productList.length} title={"Products"} methods={() => {

                        }}/>
                    </View>
                </View>
            </View>
            <View>

            </View>
            <View>
                <Text style={{
                    fontSize: sizes.Medium,
                    alignSelf: "flex-start",
                    marginLeft: sizes.Small,
                }}>
                    Products
                </Text>
                <View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        data={user.sellerInfo.productList}
                        renderItem={({item}) => {
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
                                                {item.title}
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
                                                source={item.image}/>
                                        </View>
                                        <View style={{
                                            alignItems: "flex-start",
                                        }}>
                                            <TouchableOpacity
                                                onPress={navigation.navigate("Product", { item })}
                                            >
                                                <Text style={{
                                                    fontSize: sizes.Small
                                                }}>Edit</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </View>

            </View>
            <View>
                <TouchableOpacity style={{
                    backgroundColor: colors.black,
                    borderRadius: sizes.ExtraLarge,
                    width: 150,
                    alignItems: 'center',
                    padding: 5,
                    margin: 5,
                }}>
                    <Text style={{
                        fontSize: sizes.Medium,
                        color: colors.white,
                    }}>
                        Add Product
                    </Text>
                </TouchableOpacity>
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
