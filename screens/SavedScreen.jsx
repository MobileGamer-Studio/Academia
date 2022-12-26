import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList, StyleSheet} from 'react-native';
import { colors, sizes} from '../constants/Data';
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { SearchBar, ProfilePicture, Header } from '../constants/Components';
import { firestore } from "../constants/Sever";
import { getDocs, collection, setDoc, doc, onSnapshot } from "firebase/firestore";

const theme = colors.lightTheme;
function SavedScreen({navigation, route}) {
    const userId = route.params.id;
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})

    const [savedList, setSavedList] = useState([])

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

            setSavedList(doc.data().followers)
        });


    }, [])
    return (
        <View style={styles.container}>
            <Header method = {() => navigation.goBack()} text = {'Saved Items'}/>

        </View>
    );
}

export default SavedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
        alignItems: 'center',
    },
});