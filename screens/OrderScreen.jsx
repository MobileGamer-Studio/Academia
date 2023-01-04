import React from 'react'
import {FlatList, StyleSheet, Text, TouchableOpacity, View, StatusBar} from 'react-native'
import {colors, sizes} from '../constants/Data'
import {ProductMax} from '../constants/Components'

const theme = colors.lightTheme;
const OrderScreen = ({navigation}) => {
    let user = User;
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={theme.color}
                barStyle='light-content'
            />
            <View>
                <FlatList
                    vaertical
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={user.sellerInfo.orders}
                    renderItem={({item}) => {
                        return (
                            <View>
                                <FlatList
                                    vertical
                                    numColumns={2}
                                    showsVerticalScrollIndicator={false}
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
        backgroundColor: theme.bgColor,
        flex: 1,
        paddingVertical: sizes.ExtraLarge,
    }
});


export default OrderScreen;
