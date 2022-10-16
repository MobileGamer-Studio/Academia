import React from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, sizes} from '../constants/Data';
import {currentUser} from "./LoadingScreen"
import {Button} from "../constants/Components"


function RemoveItem(item) {
    let index = currentUser.userInfo.cart.indexOf(item);
    currentUser.userInfo.cart.slice(index)
}

function CartItem(props) {
    return (
        <View style={{
            elevation: sizes.ExtraSmall,
            marginVertical: sizes.ExtraSmall,
        }}>
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    backgroundColor: colors.white,
                    borderRadius: sizes.Small,
                    height: 150,
                    alignItems: 'flex-start',
                    justifyContent: "flex-start",
                    padding: 5,
                }}

                onPress={props.method}
            >
                <View style={{
                    height: 100,
                    alignSelf: "center",
                    justifyContent: "center",
                }}>
                    <Image
                        style={{
                            flex: 1,
                            alignSelf: "center",
                        }}
                        resizeMode="contain"
                        source={props.image}/>
                </View>
                <View>
                    <Text style={{fontSize: sizes.Medium, color: colors.black}}>{props.title}</Text>
                    <Text style={{fontSize: sizes.Small, color: colors.grey}}>{props.description}</Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start"
                }}>
                    <Button
                        style={{
                            borderRadius: sizes.ExtraLarge,
                            borderWidth: 1,
                            borderColor: colors.defaultBG4,
                            padding: 5,
                            alignItems: "center",
                            justifyContent: "center",
                            marginHorizontal: 10,
                        }}
                        method={() => RemoveItem(props.item)}
                        text={"Cancel"}
                        textStyle={{fontSize: sizes.Small, color: colors.white}}
                    /><Button
                    style={{
                        borderRadius: sizes.ExtraLarge,
                        backgroundColor: colors.defaultBG4,
                        padding: 5,
                        alignItems: "center",
                        justifyContent: "center",
                        marginHorizontal: 10,
                    }}
                    method={() => RemoveItem(props.item)}
                    text={"Edit"}
                    textStyle={{fontSize: sizes.Small, color: colors.white}}
                />

                </View>
            </TouchableOpacity>
        </View>
    )
}

function CartScreen({route, navigation}) {
    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    vertical
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={currentUser.userInfo.cart}
                    renderItem={({item}) => {
                        return (
                            <CartItem
                                item={item}
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
