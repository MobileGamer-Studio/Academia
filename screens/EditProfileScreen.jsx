import React, {useState} from "react"
import {Text, View, StyleSheet, TouchableOpacity, ScrollView, ListView} from "react-native"
import {InfoInput, ProfilePicture} from "../constants/Components";
import * as ImagePicker from "expo-image-picker";
import {colors, sizes} from "../constants/Data";
import {GetUserData} from "../constants/AppManger";

function EditProfileScreen({route, navigation}) {
    const userId = route.params.id;
    const user = GetUserData(userId);

    //Variables
    const [name, setName] = useState(user.name);
    const [description, setDescription] = useState(user.description);
    const [location, setLocation] = useState(user.location);
    const [profilePicture, setProfilePicture] = useState(user.profilePicture);

    async function GetImage() {
        let pickedImage = ImagePicker.launchImageLibraryAsync()
        console.log(pickedImage);
        if (pickedImage.cancelled === true) {
            return;
        }
        currentUser.profilePicture = pickedImage.url;
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
})
