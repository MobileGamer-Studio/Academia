import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, Text } from "react-native";
import { ProfilePicture, RoundButton, Header } from '../constants/Components';
import { colors, sizes, testUsers } from "../constants/Data";
import { firestore, logOut } from "../constants/Sever";
import { collection, doc, onSnapshot } from "firebase/firestore";


const theme = colors.lightTheme;
function NotificationsScreen({ route, navigation }) {
    const userId = route.params.id;
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})

    const [followersList, setFollowersList] = useState([])

    useEffect(() => {
        const usersSub = onSnapshot(collection(firestore, "Users"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            //console.log("Current data: ", data);
            setUsers(data)
        });

        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            setUser(doc.data())

            setFollowersList(doc.data().followers)
        });

    }, [])

    return (
        <View style={styles.container}>
            <Header method = {() => navigation.goBack()} text = {'Notifications'}/>
            <View>
                <FlatList
                    vertical
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={user.followers}
                    renderItem={({ item }) => <User name={item} />}
                />
            </View>
        </View>
    );
}


function User(props) {
    return (
        <View>
            <TouchableOpacity style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                borderBottomWidth: 1,
                borderBottomColor: theme.color,
                padding: 10,
            }}

                onPress={props.method}>
                <ProfilePicture color={colors.defaultBG2} image={props.image} height={40} width={40} />
                <Text style={{ marginHorizontal: 10 }}>{props.name}</Text>
            </TouchableOpacity>
        </View>
    );
}


export default NotificationsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
    }
})