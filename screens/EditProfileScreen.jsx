import React, {useState} from "react"
import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from "react-native"
import {Button, InfoInput, ProfilePicture} from "../constants/Components";
import * as ImagePicker from "expo-image-picker";
import {colors, images, sizes, User} from "../constants/Data";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Variables
let users = [];

async function GetUserData(id) {
    const data = await AsyncStorage.getItem('Users');
    users = JSON.parse(data);

    console.log("Users: " + users + "\n Data: " + data);
    const user = await GetData(id, users);
    return user;
}

function EditProfileScreen({route, navigation}) {
    const userId = route.params.id;
    const user = GetUserData(userId).then(r => console.log(r));

    //Variables
    const [name, setName] = useState(user.name);
    const [description, setDescription] = useState(user.description);
    const [location, setLocation] = useState(user.location);
    const [profilePicture, setProfilePicture] = useState(user.profilePicture);

    const GetImage = async () => {
        let pickedImage = ImagePicker.launchImageLibraryAsync()
        console.log(pickedImage);
        if (pickedImage.cancelled === true) {
            return images.defaultProfile;
        }
        currentUser.profilePicture = pickedImage.url;
    }

    const UpdateProfile = async (newData) => {
        let index = users.indexOf(user)
        users[index] = newData;
        await AsyncStorage.mergeItem("Users", JSON.stringify(users))
    }


    return (
        <View style={styles.container}>
            <View>

            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <ProfilePicture image = {{uri: profilePicture}}/>
                </View>
                <View style={styles.field}>
                    <Text>{"Username: " + name}</Text>
                    <InfoInput
                        method={(val) => user.name = val}
                        placeholder={"username"}
                    />
                </View>
                <View style={styles.field}>
                    <Text>{"Description: " + name}</Text>
                    <InfoInput
                        method={(val) => user.description = val}
                        placeholder={"description"}
                    />
                </View><View style={styles.field}>
                <Text>{"Location: " + name}</Text>
                <InfoInput
                    method={(val) => user.location = val}
                    placeholder={"Whitesands, Medowhall"}
                />
            </View>
            </ScrollView>
            <View>
                <Button
                    style={styles.button}
                    method={() => {
                        let newData = User;
                        newData.name = name;
                        newData.description = description;
                        newData.location = location;
                        newData.profilePicture = profilePicture;


                        UpdateProfile(newData);
                    }}
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
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: "flex-start",
        paddingTop: sizes.ExtraLarge,
    },

    field: {
        borderBottomWidth: 1,
        borderBottomColor: colors.defaultBG4,
        marginVertical: 5,
        padding: 2.5,
    },

    button: {
        borderRadius: sizes.ExtraLarge,
        padding: 5,
        backgroundColor: colors.defaultBG4,
        marginHorizontal: 5,
        marginTop: 20,
        width: 150,
        alignItems: "center",
    },

    button_outline: {
        borderRadius: sizes.ExtraLarge,
        borderWidth: 1,
        padding: 5,
        borderColor: colors.defaultBG4,
        marginHorizontal: 5,
        marginTop: 20,
        width: 150,
        alignItems: "center",
    },

})
