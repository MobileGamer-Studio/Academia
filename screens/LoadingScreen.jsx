import { onAuthStateChanged } from 'firebase/auth';
import React from 'react'
import {Image, StyleSheet, View} from 'react-native'
import {colors, images, users} from '../constants/Data';
import {auth} from "../constants/Sever";

const LoadingScreen = ({route, navigation}) => {
    let currentUser;
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            navigation.navigate("Home", {user})
            users.forEach((item) => {
                console.log(item);
                if (item.loginDetails.email === user.email) {
                    currentUser = item
                    console.log("it worked")
                    navigation.navigate("Home", {user})
                }
            });

        } else {
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
                        flex: 1,
                        alignSelf: "center",
                    }}
                    resizeMode="contain"
                    source={images.academia}
                />
            </View>
        </View>
    );
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
});
