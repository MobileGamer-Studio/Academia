import React, {useState} from "react"
import {Text, View} from "react-native"
import {InfoInput, ProfilePicture} from "../constants/Components";
import * as ImagePicker from "expo-image-picker"
import {colors, sizes} from "../constants/Data";
import {currentUser} from "./LoadingScreen";

function EditProfileScreen({navigation}) {
    const [name, setName] = useState(currentUser.name);
    const [description, setDescription] = useState(currentUser.description);
    const [location, setLocation] = useState(currentUser.location);
    const [profilePicture, setProfilePicture] = useState(currentUser.profilePicture);

    async function GetImage() {
        let pickedImage = ImagePicker.launchImageLibraryAsync()
        console.log(pickedImage);
        if (pickedImage.cancelled === true) {
            return;
        }
        currentUser.profilePicture = pickedImage.url
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
                        method={(val) => currentUser.name = val}
                        placeholder={"username"}
                    />
                </View>
                <View style={styles.field}>
                    <Text>{"Description: " + name}</Text>
                    <InfoInput
                        method={(val) => currentUser.description = val}
                        placeholder={"description"}
                    />
                </View><View style={styles.field}>
                <Text>{"Location: " + name}</Text>
                <InfoInput
                    method={(val) => currentUser.loacation = val}
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
