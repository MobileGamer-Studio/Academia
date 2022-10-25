import react, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {colors, testUsers} from "../constants/Data"
import React from "react";

function CheckOutScreen({route, navigation}) {
    const user = testUsers[0];

    return (
        <View style = {styles.container}>
            <View>
                <FlatList
                    vertical
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={user.userInfo.cart}
                    renderItem={({item}) => {
                        return (
                            <CartItem/>
                        );
                    }}
                />
            </View>
        </View>
    );
}

function CartItem(props){

}

export default CheckOutScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor : colors.defaultBG2,

    },
})
