import React from 'react';
import {View, Text, TouchableOpacity, Image, FlatList, StyleSheet} from 'react-native';
import { colors, sizes} from '../constants/Data';
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { SearchBar, ProfilePicture, Header } from '../constants/Components';
import { firestore } from "../constants/Sever";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";

const theme = colors.lightTheme;
function SavedScreen({navigation, route}) {
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