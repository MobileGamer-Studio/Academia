import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, Text, Image, StatusBar } from "react-native";
import { ProfilePicture, Header, Loading} from '../constants/Components';
import { colors, sizes, images } from "../constants/Data";
import { firestore, logOut } from "../constants/Sever";
import { collection, doc, onSnapshot } from "firebase/firestore";


const theme = colors.lightTheme;
function NotificationsScreen({ route, navigation }) {
    const userId = route.params.id;
    const [users, set_users] = useState([])
    const [user, set_user] = useState({})

    const [notificationList, setNotificationList] = useState([])
    const [loading, set_loading] = useState(true)

    useEffect(() => {
        const usersSub = onSnapshot(collection(firestore, "Users"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            //console.log("Current data: ", data);
            set_users(data)
        });

        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            set_user(doc.data())

            setNotificationList(doc.data().userInfo.notifications)

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
                <Header method={() => navigation.goBack()} text={'Notifications'} />
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
                <Header method={() => navigation.goBack()} text={'Notifications'} />
                {
                    notificationList.length !== 0 ? (
                        <View>
                            <FlatList
                                data={notificationList}
                                renderItem={({ item }) => {
                                    return (
                                        <View></View>
                                    )
                                }}
                            />
                        </View>
                    ) : (
                        <View style = {{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                        }}>
                                <View style={{
                                    height: 300,
                                    width: 300,
                                    alignItems: "center",
                                }}>
                                    <Image
                                        source={images.notification}
                                        style={{
                                            height: 300,
                                            width: 300,
                                            flex: 1,
                                        }}
                                        resizeMode="contain"
                                    />
                                </View>
                                <Text style={{
                                    fontSize: sizes.Medium,
                                }}>Looks like you have no notifications</Text>
                        </View>
                    )
                }
            </View>
        );
    }
}


export default NotificationsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
    }
})