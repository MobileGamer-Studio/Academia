import React, {useState, useEffect} from "react"
import {Text, View, StyleSheet, ScrollView, Alert} from "react-native"
import {Button, Header, InfoInput, ProfilePicture} from "../constants/Components";
import * as ImagePicker from "expo-image-picker";
import {colors, images, sizes, User} from "../constants/Data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firestore } from "../constants/Sever";
import { getDocs, collection, onSnapshot, doc, setDoc } from "firebase/firestore";

const theme = colors.lightTheme;

function EditProfileScreen({route, navigation}) {

    const userId = route.params.id;
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    
    //Variables
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [profilePicture, setProfilePicture] = useState("https://firebasestorage.googleapis.com/v0/b/academia-c3d0e.appspot.com/o/Images%2FProfile%2FprofileIcon.png?alt=media&token=d0c063e1-d61e-4630-a6af-bba57f100d9d");


    useEffect(() => {
        const usersSub = onSnapshot(collection(firestore, "Users"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            setUsers(data)
        });

        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            setUser(doc.data())

            setName(doc.data().name)
            setDescription(doc.data().description)
            setLocation(doc.data().location)
            setProfilePicture(doc.data().profilePicture)
        });

    }, [])

    const GetImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            //allowsEditing: true,
            quality: 1,
        });

        if (result.cancelled === false) {
            console.log(result);
            setSelectedImage(result.uri);
        } else {
            alert('You did not select any image.');
        }
    }

    const UpdateProfile = async (newData) => {
        const updatedUser = user
        updatedUser.name = newData.name
        updatedUser.description = newData.description
        updatedUser.location = newData.location
        updatedUser.profilePicture = newData.profilePicture

        if (updatedUser === user) {
            Alert.alert(
                "No Changes",
                "You have not made any changes to your profile",
                [
                    {
                        text: "OK",
                        onPress: () => console.log("OK Pressed"),
                    }
                ],
                { cancelable: true }
            )
        }


        await setDoc(doc(firestore, "Users", userId), updatedUser)
    }


    return (
        <View style={styles.container}>
            <Header method={navigation.goBack()} text = {'Edit Profile'}/>
            <View>

            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <ProfilePicture image = {profilePicture}/>
                </View>
                <View style={styles.field}>
                    <Text>{"Username: " + name}</Text>
                    <InfoInput
                        method={(val) => setName(val)}
                        placeholder={"username"}
                    />
                </View>
                <View style={styles.field}>
                    <Text>{"Description: " + description}</Text>
                    <InfoInput
                        method={(val) => setDescription(val)}
                        placeholder={"description"}
                    />
                </View><View style={styles.field}>
                <Text>{"Location: " + location}</Text>
                <InfoInput
                    method={(val) => setLocation(val)}
                    placeholder={"Whitesands, Medowhall"}
                />
            </View>
            </ScrollView>
            <View>
                <Button
                    style={styles.button}
                    method={() => UpdateProfile()}
                    text={"Update"}
                    textStyle={{ color: colors.white, fontSize: sizes.Medium }}
                />
            </View>
        </View>
    );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.bgColor,
        flex: 1,
        justifyContent: "flex-start",
        paddingTop: sizes.ExtraLarge,
    },

    field: {
        borderBottomWidth: 1,
        borderBottomColor: theme.color,
        marginVertical: 5,
        padding: 2.5,
    },

    button: {
        borderRadius: sizes.ExtraLarge,
        padding: 5,
        backgroundColor: theme.color,
        marginHorizontal: 5,
        marginTop: 20,
        width: 150,
        alignItems: "center",
    },

    button_outline: {
        borderRadius: sizes.ExtraLarge,
        borderWidth: 1,
        padding: 5,
        borderColor: theme.color,
        marginHorizontal: 5,
        marginTop: 20,
        width: 150,
        alignItems: "center",
    },

})
