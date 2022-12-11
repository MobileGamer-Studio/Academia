import React, {useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors, sizes, testUsers, testProducts} from '../constants/Data';
import {Button, ProductSmall, ProfilePicture, ProductVertical} from '../constants/Components';
import { firestore } from "../constants/Sever";
import { getDocs, collection} from "firebase/firestore";
import { Entypo } from '@expo/vector-icons';

const theme = colors.lightTheme;
function AccountScreen({route, navigation}) {

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

    getUsers();

    const acc = route.params.acc;
    const user = route.params.user;

    const [following, setFollowing] = useState(user.following.includes(acc.id))

    function follow() {
        if (following) {
            user.following.splice(user.following.indexOf(acc.id), 1)
            setFollowing(false)
        }else{
            user.following.push(acc.id)
            setFollowing(true)
        }
    }

    return (
        <View style={styles.container}>
            <View style = {styles.userProfile}>
                <View style={{ alignItems: "flex-end", marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("", { id: userId })}>
                        <Entypo name="dots-three-vertical" size={24} color={theme.color} />
                    </TouchableOpacity>
                </View>
                <View style = {{
                    alignItems: "center",
                }}>
                    <ProfilePicture color={colors.defaultBG2} image={acc.profilePicture} height = {100} width = {100}/>
                    <Text style={{ color: theme.color, fontSize: 20 }}>{acc.name}</Text>
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
                        
                        onPress = {() => navigation.navigate("Following", {user: acc})}>
                            <Text style={{ color: theme.color }}>Following</Text>
                            <Text style={{ color: theme.color }}>{acc.following.length}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}
                        
                        onPress = {() => navigation.navigate("Followers", {user: acc})}>
                            <Text style={{ color: theme.color }}>Followers</Text>
                            <Text style={{ color: theme.color }}>{ acc.followers.length }</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}>
                            <Text style={{ color: theme.color }}>Products</Text>
                            <Text style={{ color: theme.color }}>10</Text>
                        </TouchableOpacity>

                    </View>
                    <View>
                        <Text style={{ color: theme.color }}>{acc.description}</Text>
                    </View>
                    <View style = {{flexDirection: "row"}}>
                        {following ? <Button
                            style={styles.unfollow}
                            method={() => follow()}
                            text={"Unfollow"}
                            textStyle={{ color: colors.white, fontSize: sizes.Medium }}
                        /> : <Button
                            style={styles.follow}
                            method={() => follow()}
                            text={"Follow"}
                            textStyle={{ color: colors.white, fontSize: sizes.Medium }}
                        />}
                        <Button
                            style={styles.message_btn}
                            method={() => navigation.navigate("Chat", {rec : acc, id: userId})}
                            text={"Message"}
                            textStyle={{ color: theme.color, fontSize: sizes.Medium }}
                            icon = {"chat"}
                        />
                    </View>
                </View>
            </View>

            <View>
                <Text style={{ marginLeft: 15, marginTop: 15, fontSize: 25, color: colors.white }}>Products</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={acc.sellerInfo.productList}
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
        backgroundColor: theme.color,
    },

    follow: {
        borderRadius: sizes.ExtraLarge,
        padding: 5,
        backgroundColor: theme.color,
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
        borderColor: theme.color,
        marginHorizontal: 5,
        marginTop: 20,
        width: 150,
        alignItems: "center",
    },

    userProfile: {
        flexDirection: 'column',
        padding: sizes.Small,
        justifyContent: 'space-between',
        backgroundColor: theme.bgColor,
        borderBottomLeftRadius: 75,
        borderBottomRightRadius: 75,
        paddingTop: 60,
        paddingBottom: 50,
    },
});

export default AccountScreen;
