import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {cart, colors} from '../constants/Data';
import {CartItem} from '../constants/Components';


function CartScreen({route, navigation}) {
    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    vertical
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={cart}
                    renderItem={({item}) => {
                        return (
                            <CartItem
                                image={item.image}
                                title={item.title}
                                description={item.description}
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
