import React from 'react';
import {View, Text, TouchableOpacity, Image, FlatList, StyleSheet} from 'react-native';
import { colors, sizes} from '../constants/Data';
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { SearchBar, ProfilePicture } from '../constants/Components';
import { firestore } from "../constants/Sever";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";

const theme = colors.lightTheme;
function SavedScreen(props) {
    return (
        <View style={styles.container}>

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