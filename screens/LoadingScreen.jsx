import {onAuthStateChanged} from 'firebase/auth';
import react, {useState} from 'react';
import {Image, StyleSheet, View, ActivityIndicator, Text, StatusBar} from 'react-native';
import {colors, images, sizes} from '../constants/Data';
import {auth, logOut} from "../constants/Sever";
import { LinearGradient } from 'expo-linear-gradient';

const theme = colors.lightTheme;
//
const LoadingScreen = ({route, navigation}) => {   
    const [loadingMessage, set_loadingMessage] = useState('Getting user data...')
    onAuthStateChanged(auth, (user) => {
        if (user) {
            set_loadingMessage('Starting App')
            navigation.navigate("Home", { id : user.uid });
        } else {
            navigation.navigate("Landing");
        }
    })

    return (
        <LinearGradient style={styles.container} colors = {[theme.color,theme.color2]}>
            <StatusBar
                backgroundColor={theme.color}
                barStyle='light-content'
            />
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
        </LinearGradient>
    );
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        //backgroundColor: theme.color,
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
});
