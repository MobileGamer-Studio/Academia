import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList, Modal } from 'react-native'
import { colors, sizes } from '../constants/Data'
import { RoundButton, ProductVertical } from "../constants/Components";
import { firestore, logOut } from "../constants/Sever";
import { getDocs, collection } from "firebase/firestore";
import { MaterialIcons, Entypo } from "@expo/vector-icons";

const theme = colors.lightTheme;

function UserAccount({ route, navigation }) {
    const userId = route.params.id;
    const [user, setUser] = useState(route.params.user)
    const [users, setUsers] = useState([])
    const [optionsAct, setOptionsAct] = useState(false)

    async function getUsers() {
        const querySnapshot = await getDocs(collection(firestore, "Users"));
        let data = []
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        });
        setUsers(data)
    }
    getUsers().then(r => console.log("Promise resolved!"));
    //Functions



    //Return
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'column',
                padding: sizes.Small,
                justifyContent: 'space-between',
                backgroundColor: theme.color,
                borderBottomLeftRadius: 75,
                borderBottomRightRadius: 75,
                paddingTop: 60,
                paddingBottom: 50,
                marginBottom: 10,
            }}>
                <Modal 
                    visible = {optionsAct}
                    animationType = "slide"
                    transparent = {true}
                >
                    <View style = {{
                        backgroundColor: colors.white,
                        elevation: 5,
                        width: "80%",
                        margin: 100,
                        alignSelf: "center",
                        borderRadius: 10,
                    }}>
                        <View style = {{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            marginTop: 10,
                            marginRight: 10,
                        }}>
                            <TouchableOpacity onPress={() => setOptionsAct(false)}>
                                <MaterialIcons name="close" size={24} color={colors.defaultBG} />
                            </TouchableOpacity>
                        </View>
                        <View showsVerticalScrollIndicator={false}>
                            <TouchableOpacity style = {styles.popUpSection} onPress = {() => navigation.navigate("Settings", {user: user})}>
                                <MaterialIcons name="settings" size={24} color={colors.defaultBG} />
                                <Text style={{ color: theme.outline, marginHorizontal: 2.5 }}>Settigs</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.popUpSection} onPress={() => navigation.navigate("Saved", { user: user })}>
                                <MaterialIcons name="bookmark" size={24} color={colors.defaultBG} />
                                <Text style={{ color: theme.outline, marginHorizontal: 2.5 }}>Saved</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.popUpSection}>
                                <MaterialIcons name="edit" size={24} color={colors.defaultBG} />
                                <Text style={{ color: theme.outline, marginHorizontal: 2.5 }}>Edit Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.popUpSection}>
                                <MaterialIcons name="share" size={24} color={colors.defaultBG} />
                                <Text style={{ color: theme.outline, marginHorizontal: 2.5 }}>Share</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.popUpSection} onPress={() => {
                                logOut()
                                navigation.navigate("Loading");
                            }}>
                                <MaterialIcons name="logout" size={24} color={colors.defaultBG} />
                                <Text style={{ color: theme.outline, marginHorizontal: 2.5 }}>LogOut</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={{ alignItems: "flex-end", marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => setOptionsAct(true)}>
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
                    <View style={{
                        flexDirection: "row",
                        margin: 10,
                    }}>
                        <MaterialIcons name="location-on" size={24} color={colors.white} />
                        <Text style={{ color: colors.white }}>{user.location}</Text>
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
            <View style={{
                alignItems: "center",
                backgroundColor: theme.color,
                borderRadius: 100,
                position: "absolute",
                bottom: sizes.Small,
                right: sizes.Small,
                padding: sizes.ExtraSmall,
                
            }}>
                <TouchableOpacity onPress={() => navigation.navigate("Chats", { user: user })}>
                    <MaterialIcons name="chat" size={30} color={colors.white} />
                </TouchableOpacity>
            </View>
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
        backgroundColor: theme.bgColor,
        flex: 1,
        justifyContent: "flex-start",
    },

    section: {
        borderTopWidth: 1,
        borderColor: theme.outline,
    },

    popUpSection: {
        borderTopColor: theme.outline,
        borderTopWidth: 1,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },
});
