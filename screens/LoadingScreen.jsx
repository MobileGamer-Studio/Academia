import {onAuthStateChanged} from 'firebase/auth';
import react, {useState} from 'react';
import {Image, StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import {colors, images, sizes} from '../constants/Data';
import {auth, logOut} from "../constants/Sever";

const theme = colors.lightTheme;
//
const LoadingScreen = ({route, navigation}) => {   
    const [loadingMessage, setLoadingMessage] = useState('Getting user data...')
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setLoadingMessage('Starting App')
            navigation.navigate("Home", { id : user.uid });
        } else {
            setLoadingMessage('User not logged in')
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
                        height: 300,
                        width: 300,
                        alignSelf: "center",
                    }}
                    resizeMode="contain"
                    source={images.academia_white}
                />
            </View>
            <ActivityIndicator size={sizes.ExtraLarge} color={theme.bgColor}/>
            <Text style = {{color: colors.white}}>{loadingMessage}</Text>
        </View>
    );
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.color,
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
});
