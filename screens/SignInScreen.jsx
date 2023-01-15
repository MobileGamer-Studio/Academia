import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar} from 'react-native';
import {colors, images, sizes} from '../constants/Data';
import {SignIn, SignIn_Google} from "../constants/Sever"


const SignInScreen = ({route, navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={theme.bgColor}
                barStyle='dark-content'
            />
            <View>
                <Text style={{
                    fontSize: sizes.ExtraLarge,
                    alignSelf: "flex-start",
                    marginVertical: sizes.Medium,
                    color: colors.defaultBG4,
                }}>Log in to your account</Text>
                <TextInput
                    onChangeText={(val) => setEmail(val)}
                    style={styles.textInput}
                    placeholder="Enter your email"
                />
                <TextInput
                    onChangeText={(val) => setPassword(val)}
                    style={styles.textInput}
                    placeholder="Enter your password"
                />
            </View>
            <View style={{
                alignItems: "center",
            }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: colors.defaultBG4,
                        height: 50,
                        width: 350,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: sizes.ExtraLarge,
                    }}

                    onPress={() => {
                        SignIn(email, password);
                        navigation.navigate("Loading");
                    }}
                >
                    <Text style={{
                        fontSize: sizes.Medium,
                        color: colors.white,
                    }}>SignIn</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    style={{
                        backgroundColor: colors.white,
                        height: 50,
                        width: 350,
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        borderRadius: sizes.ExtraLarge,
                        borderColor: colors.black,
                        borderWidth: 1,
                        marginVertical: sizes.Small,
                        flexDirection: "row",
                        paddingHorizontal: sizes.ExtraLarge,
                    }}
                    onPress={() => {
                        SignIn_Google()
                        navigation.navigate("Loading")
                    }}
                >
                    <View>
                        <Image
                            style={{
                                flex: 1,
                                alignSelf: "center",
                                height: sizes.Large,
                                width: sizes.Large,
                            }}
                            resizeMode="contain"
                            source={images.google}
                        />
                    </View>
                    <Text
                        style={{
                            fontSize: sizes.Medium,
                            color: colors.black,
                        }}
                    >
                        SignIn with Google
                    </Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text style={{
                        fontSize: sizes.Small + 2.5,
                        color: colors.defaultBG4,
                    }}>
                        Don't have an account, create one.
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        alignItems: "center",
        paddingVertical: sizes.ExtraLarge,
        justifyContent: "space-between",
    },

    textInput: {
        borderRadius: sizes.ExtraSmall,
        borderWidth: 1,
        margin: sizes.ExtraSmall,
        paddingHorizontal: sizes.Small,
        backgroundColor: colors.white,
        height: 50,
        width: 350,
        borderColor: colors.defaultBG4,
    },
})

export default SignInScreen;
