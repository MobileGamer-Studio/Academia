import {onAuthStateChanged} from 'firebase/auth';
import React from 'react'
import {Image, StyleSheet, View} from 'react-native'
import {colors, images, users} from '../constants/Data';
import {auth, firestore, saveData} from "../constants/Sever";
import { collection, getDocs } from "firebase/firestore";
import { ManageAppData } from '../constants/AppManger';

// async function Start() {
//     users.forEach(element => {
//         saveData(element, "Users", element.name).then(r => console.log(r));
//     });

//     const querySnapshot = await getDocs(collection(firestore, "Users"));
//     querySnapshot.forEach((doc) => {
//         if (users.includes(doc.data()) === false) {
//             users.push(doc.data());
//         } else {
//             console.log("User is already added")
//         }
//     });
//     users.forEach(user => {
//         console.log("User: " + user);
//     })
// }


const LoadingScreen = ({route, navigation}) => {
    ManageAppData();
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
