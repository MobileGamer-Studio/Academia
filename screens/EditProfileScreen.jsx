import React, {useState} from "react"
import {Text, View, StyleSheet, ScrollView} from "react-native"
import {Button, Header, InfoInput, ProfilePicture} from "../constants/Components";
import * as ImagePicker from "expo-image-picker";
import {colors, images, sizes, User} from "../constants/Data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firestore } from "../constants/Sever";
import { getDocs, collection } from "firebase/firestore";

const theme = colors.lightTheme;

function EditProfileScreen({route, navigation}) {

    const userId = route.params.id;
    const [users, setUsers] = useState([])

    async function getUsers() {
        const querySnapshot = await getDocs(collection(firestore, "Users"));
        let data = []
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        });
        setUsers(data)
    }

    getUsers();

    let user = {}
    users.forEach((item) => {
        if (item.id === userId) {
            user = item
            console.log("got user: " + user)
        }
    })

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
        // user.profilePicture = pickedImage.url;
        setProfilePicture({ uri: pickedImage.url });
    }

    async function saveUsers() {
        users.forEach(async (item) => {
            await setDoc(doc(firestore, "Users", item.id), item);
        })
    }

    const UpdateProfile = async (newData) => {
        let index = users.indexOf(user)
        users[index] = newData;
        await AsyncStorage.mergeItem("Users", JSON.stringify(users))
    }


    return (
        <View style={styles.container}>
            <Header method={navigation.goBack()} text = {'Edit Profile'}/>
            <View>

            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <ProfilePicture image = {{uri: profilePicture}}/>
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
