import React  from "react";
import { FlatList, StyleSheet, View } from 'react-native';
import {colors, testUsers} from "../constants/Data"
import { CartItem } from "../constants/Components";


function CheckOutScreen({route, navigation}) {
    const userId = route.params.id;
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
                            <CartItem
                                product={item.product}
                                item={item}
                                method={() => console.log("") }
                                amount={item.amountSellected}
                            />
                        );
                    }}
                />
            </View>
        </View>
    );
}

export default CheckOutScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor : colors.defaultBG2,

    },
})
