import {onAuthStateChanged} from 'firebase/auth';
import React from 'react';
import {Image, StyleSheet, View, ActivityIndicator} from 'react-native';
import {colors, images, sizes} from '../constants/Data';
import {auth, logOut} from "../constants/Sever";

const theme = colors.lightTheme;
//
const LoadingScreen = ({route, navigation}) => {    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            navigation.navigate("Home", { id : user.uid });
        } else {
            console.log("No user logged in")
            navigation.navigate("Landing");

        }
    })

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
                        height: 300,
                        width: 300,
                        alignSelf: "center",
                    }}
                    resizeMode="contain"
                    source={images.academia_white}
                />
            </View>
            <ActivityIndicator size={sizes.ExtraLarge} color={theme.bgColor}/>
        </View>
    );
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.color,
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
});
