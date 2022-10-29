import React, {useState} from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native'
import {colors, sizes, testUsers, users} from '../constants/Data'
import {Button, ProfilePicture} from "../constants/Components";
import AsyncStorage from '@react-native-async-storage/async-storage';



function UserAccount({route, navigation}) {
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

    let user = {}
    users.forEach((item) => {
        if (item.id === userId) {
            user = item
            console.log("got user: ${user}")
        }
    })


    return (
        <View style={styles.container}>
            <View>
                <View>
                    <ProfilePicture image={user.profilePicture} />
                    <Text>{user.name}</Text>
                </View>
                <View>

                </View>
            </View>
        </View>
    );
}

export default UserAccount;

function Clikable(params) {
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
        paddingTop: sizes.ExtraLarge,
    },

    section: {
        borderTopWidth: 1,
        borderColor: colors.grey,
    }
});
