import React from 'react'
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {colors, orders, sizes} from '../constants/Data'
import {ProductMax} from '../constants/Components'

const OrderScreen = ({navigation}) => {
    return (
        <View style={styles.container}>

            <View>
                <FlatList
                    vaertical
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={orders}
                    renderItem={({item}) => {
                        return (
                            <View>
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item1) => item1.id}
                                    data={item}
                                    renderItem={({item1}) => {
                                        return (
                                            <ProductMax
                                                product={item1}
                                                title={item1.title}
                                                price={item1.price}
                                                image={item1.image}
                                                seller={item1.seller}
                                                method={() => navigation.navigate("Product", {item1})}
                                            />
                                        );
                                    }}
                                />
                                <TouchableOpacity style={{
                                    alignSelf: "flex-end"
                                }}>
                                    <Text>Edit Order</Text>
                                </TouchableOpacity>
                            </View>
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
        paddingVertical: sizes.ExtraLarge,
    }
});


export default OrderScreen;
