import React from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, sizes, testUsers} from '../constants/Data';
import {Button, CartItem} from "../constants/Components";
import {GetData} from "../constants/AppManger";

function CartScreen({route, navigation}) {
    const userId = route.params.id;
    const user = testUsers[0];


    const RemoveItem = (item) => {
        let index = user.userInfo.cart.indexOf(item);
        user.userInfo.cart.slice(index)
    }

    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    vertical
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={user.userInfo.cart}
                    renderItem={({item}) => {
                        return (
                            <CartItem
                                product = {item.product}
                                item = {item}
                                method = {() => {console.log()}}
                                amount = {item.amountSellected}
                            />
                        );
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
    },
})

export default CartScreen;
