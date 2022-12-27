import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, images, sizes} from '../constants/Data';

function LandingScreen({navigation}) {

    return (
        <View style={styles.container}>
            <View style={{
                height: 300,
                width: 300,
                alignSelf: "center",
                justifyContent: "center",
            }}>
                <Image
                    style={{
                        flex: 1,
                        alignSelf: "center",
                    }}
                    resizeMode="contain"
                    source={images.academia}
                />
            </View>
            <View style={{
                height: 300,
                width: 300,
                alignSelf: "center",
                justifyContent: "center",
            }}>
                <Image
                    style={{
                        flex: 1,
                        alignSelf: "center",
                    }}
                    resizeMode="contain"
                    source={images.welcome}
                />
            </View>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                margin: sizes.Large,
            }}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => navigation.navigate("SignIn")}>
                    <Text style={{
                        color: colors.white,
                        fontSize: sizes.Medium,
                    }}>SignIn</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => navigation.navigate("SignUp")}>
                    <Text style={{
                        color: colors.white,
                        fontSize: sizes.Medium,
                    }}>SignUp</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        alignItems: "center",
        paddingVertical: sizes.ExtraLarge,
        justifyContent: "space-evenly",
    },

    buttonStyle: {
        backgroundColor: colors.defaultBG4,
        paddingHorizontal: sizes.ExtraLarge,
        paddingVertical: sizes.Small,
        margin: sizes.Medium,
        borderRadius: sizes.ExtraLarge,
    },


})

export default LandingScreen;
