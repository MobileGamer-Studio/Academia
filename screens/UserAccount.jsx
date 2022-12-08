import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList } from 'react-native'
import { colors, sizes } from '../constants/Data'
import { RoundButton, ProductVertical } from "../constants/Components";
import { firestore } from "../constants/Sever";
import { getDocs, collection } from "firebase/firestore";
import { MaterialIcons, Entypo } from "@expo/vector-icons";



function UserAccount({ route, navigation }) {
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

    getUsers().then(r => console.log("!"));

    const user = route.params.user




    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'column',
                padding: sizes.Small,
                justifyContent: 'space-between',
                backgroundColor: colors.defaultBG4,
                borderBottomLeftRadius: 75,
                borderBottomRightRadius: 75,
                paddingTop: 60,
                paddingBottom: 50,
                marginBottom: 10,
            }}>
                <View style={{ alignItems: "flex-end", marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("", { id: userId })}>
                        <Entypo name="dots-three-vertical" size={24} color={colors.white} />
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'column',
                    alignItems: 'center',

                }}>

                    <RoundButton
                        image={user.profilePicture}
                        height={100}
                        width={100}
                        color={colors.white}
                        method={() => navigation.navigate("EditProfile", { id: userId })}
                    />
                    <Text style={{ color: colors.white, fontSize: 20 }}>{user.name}</Text>
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
                        <View style={{
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}>
                            <Text style={{ color: colors.white }}>Following</Text>
                            <Text style={{ color: colors.white }}>{10}</Text>
                        </View>
                        <View style={{
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}>
                            <Text style={{ color: colors.white }}>Followers</Text>
                            <Text style={{ color: colors.white }}>10</Text>
                        </View>
                        <View style={{
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}>
                            <Text style={{ color: colors.white }}>Products</Text>
                            <Text style={{ color: colors.white }}>10</Text>
                        </View>

                    </View>
                    <View>
                        <Text style={{ color: colors.white }}>{user.description}</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={{
                backgroundColor: colors.white,
                bottom: 0,
            }}>
                <View>
                    <Text style={{ marginLeft: 15, marginTop: 15, fontSize: 25 }}>Products</Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        data={[]}
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
            </ScrollView>
        </View>
    );
}

export default UserAccount;

function Clikable(props) {
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: "flex-start",
    },

    section: {
        borderTopWidth: 1,
        borderColor: colors.grey,
    }
});
