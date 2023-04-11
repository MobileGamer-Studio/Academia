import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Chat, colors, sizes } from '../constants/Data';
import { MaterialIcons } from '@expo/vector-icons';
import { Header, Loading, SearchBar, ProfilePicture } from '../constants/Components';
import { firestore } from "../constants/Sever";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { LinearGradient } from 'expo-linear-gradient';

const theme = colors.lightTheme;
function AccountListScreen({ navigation, route }) {
    const userId = route.params.id;
    const [loading, set_loading] = useState(true)
    const [users, set_users] = useState([])
    const [user, set_user] = useState({})

    useEffect(() => {
        const usersSub = onSnapshot(collection(firestore, "Users"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            set_users(data)
        });

        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            set_user(doc.data())

            if (user !== {}) {
                set_loading(false)
            }
        });

    }, [])

    if (loading === true) {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={theme.color}
                    barStyle='light-content'
                />
                <Header text={"Accounts"} method={() => navigation.goBack()} />
                <Loading />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={theme.color}
                    barStyle='light-content'
                />
                <Header text={"Accounts"} method={() => navigation.goBack()} />
                <View>
                    <FlatList
                        vertical
                        numColumns={3}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        data={users}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    style={{
                                        elevation: 2,
                                        width: "30%",
                                        margin: 5,
                                    }}

                                    onPress={() => {
                                        if (item.id === userId) {
                                            navigation.navigate("UserAccount", { id: userId })
                                        } else {
                                            navigation.navigate('Account', { id: userId, accId: item.id })
                                        }
                                    }}>
                                    <LinearGradient colors={[theme.color, theme.color2]} style={{
                                        //backgroundColor: theme.color2,

                                        height: 150,
                                        width: 100,
                                        borderRadius: sizes.Small,
                                        alignSelf: 'center',
                                        alignItems: 'center',
                                        justifyContent: 'space-evenly',
                                    }}>

                                        <ProfilePicture image={item.profilePicture} height={70} width={70} />
                                        <View style={{
                                            alignItems: 'center',

                                        }}>
                                            <Text style={{ color: theme.bgColor }}>{item.name}</Text>
                                        </View>

                                    </LinearGradient>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>
        );
    }
}

export default AccountListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
    }
});