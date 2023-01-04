import React  from "react";
import { FlatList, StyleSheet, View, StatusBar } from 'react-native';
import {colors, testUsers} from "../constants/Data"
import { CartItem, Header } from "../constants/Components";

const theme = colors.lightTheme;
function CheckOutScreen({route, navigation}) {
    const userId = route.params.id;
    const user = testUsers[0];

    return (
        <View style = {styles.container}>
            <StatusBar
                backgroundColor={theme.color}
                barStyle='light-content'
            />
            <Header method = {() => navigation.goBack()} text = {'Check Out'}/>
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
                                method={() => console.log('') }
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
        backgroundColor: theme.bgColor,

    },
})
