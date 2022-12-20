import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, Text } from "react-native";
import { ProfilePicture, RoundButton, Header } from '../constants/Components';
import { colors, sizes, testUsers } from "../constants/Data";
import { firestore, logOut } from "../constants/Sever";
import { collection, doc, onSnapshot } from "firebase/firestore";


const theme = colors.lightTheme;
function FollowersListScreen({route, navigation}) {
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

    return(
        <View style = {styles.container}>
            <Header method = {() => navigation.goBack()} text = {'Followers'}/>
            <FollowersList followersList = {followersList}/>
        </View>
    );
}

function FollowersList(props) {
    if (props.followersList.length !== 0) {
        return (
            <View>
                <FlatList
                    vertical
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={props.followersList}
                    renderItem={({ item }) => <User name={item} />}
                />
            </View>
        )
    } else {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Text style={{
                    fontSize: sizes.Large,
                }}>Not Followed By Anyone</Text>
            </View>
        )
    }
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
                backgroundColor: theme.bgColor,
            }}

                onPress={props.method}>
                <ProfilePicture color={colors.white} image={props.image} height={40} width={40} />
                <Text style={{ marginHorizontal: 10 }}>{props.name}</Text>
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