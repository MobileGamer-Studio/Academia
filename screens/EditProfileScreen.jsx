import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, ScrollView, Alert, SafeAreaView, TouchableOpacity, Image, StatusBar } from "react-native"
import { Button, Header, InfoInput, Loading, ProfilePicture } from "../constants/Components";
import * as ImagePicker from "expo-image-picker";
import { colors, images, sizes, User } from "../constants/Data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firestore, storage } from "../constants/Sever";
import { getDocs, collection, onSnapshot, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as Location from "expo-location";

const theme = colors.lightTheme;

function EditProfileScreen({ route, navigation }) {

    const userId = route.params.id;
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState("")

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

            if (user !== {}) {
                setLoading(false)
            }
        });

    }, [])

    const GetCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                "Permission Denied",
                "Permission to access location was denied",
                [
                    {
                        text: "OK",
                        onPress: () => console.log("OK Pressed")
                    }
                ]
            )
        }

        setLocation(JSON.stringify(await Location.getCurrentPositionAsync({})));
        console.log(location);
    }

    const GetImage = async () => {
        setLoading(true);
        setLoadingMessage("Getting Profile Picture")
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (result.cancelled === false) {
            console.log(result);
            setProfilePicture(result.uri);

            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                    console.log(e);
                    reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', result.uri, true);
                xhr.send(null);
            });




            const dpRef = ref(storage, userId + '/' + userId + '.jpg');
            const uploadTask = await uploadBytes(dpRef, blob).then(async () => {
                console.log(await getDownloadURL(dpRef));
                setSelectedImage(await getDownloadURL(dpRef));
            });

            blob.close();




        } else {
            Alert.alert(
                "No Image Selected",
                "You did not select an image",
                [
                    {
                        text: "OK",
                        onPress: () => console.log("OK Pressed")
                    }
                ]
            )
        }
        setLoading(false);
    }

    const UpdateProfile = async () => {
        setLoading(true);
        setLoadingMessage("Updating User Profile")
        const updatedUser = user
        updatedUser.name = name
        updatedUser.description = description
        updatedUser.location = location

        if (selectedImage !== null) {
            updatedUser.profilePicture = selectedImage
        }


        await setDoc(doc(firestore, "Users", userId), updatedUser)
        setLoading(false);
        Alert.alert(
            "Profile Updated",
            "Your profile has been updated successfully",
            [
                {
                    text: "OK",
                    onPress: () => navigation.goBack()
                }
            ]
        )
    }


    if (loading === true) {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={theme.color}
                    barStyle='light-content'
                />
                <Header method={() => navigation.goBack()} text={'Edit Profile'} />
                <Loading message = {loadingMessage}/>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={theme.color}
                    barStyle='light-content'
                />
                <Header method={() => navigation.goBack()} text={'Edit Profile'} />


                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={{
                        alignItems: "center",
                        width: "100%",
                        padding: 20,
                    }}

                        onPress={() => GetImage()}>
                        {
                            selectedImage !== null ? (
                                <View style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: 10,
                                    height: 100,
                                    width: 100,
                                    borderRadius: sizes.ExtraLarge,
                                    borderWidth: 1,
                                    borderColor: theme.color,

                                }}>
                                    <Image style={{
                                        height: 100,
                                        width: 100,
                                        borderRadius: sizes.ExtraLarge,
                                    }}

                                        resizeMode="contain"
                                        source={{ uri: selectedImage }} />
                                </View>
                            ) : (
                                <View style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: 10,
                                    height: 100,
                                    width: 100,
                                    borderRadius: sizes.ExtraLarge,
                                }}>
                                    <Image style={{
                                        height: 100,
                                        width: 100,
                                        borderRadius: sizes.ExtraLarge,
                                    }}

                                        resizeMode="contain"
                                        source={{ uri: profilePicture }} />
                                </View>
                            )
                        }
                    </TouchableOpacity>
                    <View style={styles.field}>
                        <Text>{"Username "}</Text>
                        <InfoInput
                            method={(val) => setName(val)}
                            placeholder={"username"}
                            value={name}
                        />
                    </View>
                    <View style={styles.field}>
                        <Text>{"Description: " + description}</Text>
                        <InfoInput
                            method={(val) => setDescription(val)}
                            placeholder={"description"}
                            value={description}
                        />
                    </View><View style={styles.field}>
                        <Text>{"Location: "+ location}</Text>
                        <InfoInput
                            method={(val) => setLocation(val)}
                            placeholder={"Whitesands, Medowhall"}
                            value={location}
                        />
                        <Button
                            style={{
                                borderRadius: sizes.ExtraLarge,
                                padding: 5,
                                backgroundColor: theme.color,
                                marginHorizontal: 5,
                                marginTop: 5,
                                alignItems: "center",
                            }}
                            method={() => GetCurrentLocation()}
                            text={"Use Current Location"}
                            textStyle={{ color: colors.white, fontSize: sizes.Medium }}
                        />
                    </View>
                </ScrollView>
                <View style={styles.button_container}>
                    <Button
                        style={styles.button}
                        method={() => UpdateProfile()}
                        text={"Update"}
                        textStyle={{ color: colors.white, fontSize: sizes.Medium }}
                    />
                </View>
            </View>
        )
    }
}

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.bgColor,
        flex: 1,
        justifyContent: "flex-start",
    },

    field: {
        borderBottomWidth: 1,
        borderBottomColor: theme.outline,
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

    button_container: {
        alignItems: "center",
        marginBottom: 10,
    }

})
