import {onAuthStateChanged} from 'firebase/auth';
import React from 'react'
import {Image, StyleSheet, View} from 'react-native'
import {colors, images, users} from '../constants/Data';
import {auth} from "../constants/Sever";


//passed data
export let currentUser;

const LoadingScreen = ({route, navigation}) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            console.log("Now Loading")
            users.forEach((item) => {
                if (item.loginDetails.email === user.email) {
                    currentUser = item
                    console.log("First Test Passed")
                    // navigation.navigate("Home")
                    navigation.navigate("Home", {currentUser})
                }
            });
            currentUser = {
                name: "",
                description: "",
                profilePicture: images.defaultProfile,
                followers: [],
                following: [],
                location: "----",
                sellerInfo: {
                    rating: 0,
                    productList: [],
                    amountSelling: "0",
                },
                loginDetails: {
                    email: user.email,
                    password: "",
                },
                id: "0",
            }
            //navigation.navigate("Home")
            navigation.navigate("Home", {currentUser})

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
