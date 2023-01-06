import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, Text, Image, StatusBar } from "react-native";
import { ProfilePicture, RoundButton, Header, Loading, Button} from '../constants/Components';
import { colors, sizes,   images} from "../constants/Data";
import { firestore, logOut } from "../constants/Sever";
import { collection, doc, onSnapshot } from "firebase/firestore";


const theme = colors.lightTheme;
function FollowersListScreen({ route, navigation }) {

    const userId = route.params.id;
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    const [followersList, setFollowersList] = useState([])

    useEffect(() => {
        const usersSub = onSnapshot(collection(firestore, "Users"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            console.log("Current data: ", data);
            setUsers(data)
        });

        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            setUser(doc.data())

            setFollowersList(doc.data().followers)

            if (user !== {}) {
                setLoading(false)
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
                <Header method={() => navigation.goBack()} text={'Followers'} />
                <Loading />
            </View>
        )
    } else {
        const followers = []
        users.forEach(acc => {
            if (followersList.includes(acc.id)) {
                followers.push(acc)
            }
        });

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={theme.color}
                    barStyle='light-content'
                />
                <Header method={() => navigation.goBack()} text={'Followers'} />
                {
                    followers.length !== 0 ? (
                        <View>
                            <FlatList
                                vertical
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                data={followers}
                                renderItem={({ item }) => <User name={item.name} image={item.profilePicture} method={() => navigation.navigate('Account', { id: userId, accId: item.id })} />}
                            />
                        </View>
                    ) : (
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                                <View style={{
                                    height: 300,
                                    width: 300,
                                    alignItems: "center",
                                }}>
                                    <Image
                                        source={images.follower}
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
                            }}>Not followed by anyone</Text>
                            <Button
                                style={{}}
                                method={() => navigation.navigate("Accounts", { id: user.id })}
                                text={"Find Users To Connect With"}
                                textStyle={{ color: theme.color, fontSize: sizes.Small }}
                            />
                        </View>
                    )
                }
            </View>
        );
    }
}





function User(props) {
    return (
        <View style={{
            borderBottomWidth: 1,
            borderBottomColor: theme.outline,
            padding: 10,
        }}>
            <TouchableOpacity style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
                onPress={props.method}>
                <ProfilePicture color={colors.white} image={props.image} height={40} width={40} />
                <Text style={{ marginHorizontal: 10, fontSize: sizes.Small }}>{props.name}</Text>
            </TouchableOpacity>
        </View>
    );
}


export default FollowersListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
    }
})