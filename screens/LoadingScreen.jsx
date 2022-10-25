import {onAuthStateChanged} from 'firebase/auth';
import React from 'react'
import {Image, StyleSheet, View} from 'react-native'
import {colors, images} from '../constants/Data';
import {auth, firestore, saveData} from "../constants/Sever";
import {collection, doc, getDocs, setDoc} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function GetData(){
    let users = [];
    try {
        users = await getDocs(collection(firestore, "Users"));
        if (users === null){
            console.log("No data gotten from firebase")
        }else{
            console.log("data was gotten from firebase: "+ users);
            await AsyncStorage.setItem("Users", JSON.stringify(users));
        }
    }catch (err) {
        console.log(err)
    }
}

const LoadingScreen = ({route, navigation}) => {
    GetData().then(r => console.log("Getting Data..... "+ r))
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
