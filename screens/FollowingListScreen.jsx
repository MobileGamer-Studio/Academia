import React from 'react';
import {View, TouchableOpacity, Text, ListView, StyleSheet} from "react-native";
import {ProfilePicture} from "../constants/Components";
import {sizes} from "../constants/Data";



function FollowingListScreen() {
    return (
        <View style = {styles.container}>

        </View>
    );
}


function User(props) {
    return (
        <View>
            <TouchableOpacity>

            </TouchableOpacity>
        </View>
    );
}


export default FollowingListScreen;

const styles = StyleSheet.create({
    container: {
        paddingVertical: sizes.ExtraLarge,
        flex: 1,
    }
})