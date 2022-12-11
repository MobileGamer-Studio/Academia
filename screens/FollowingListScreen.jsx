import React from 'react';
import {View, TouchableOpacity, StyleSheet, FlatList, Text} from "react-native";
import { ProfilePicture, RoundButton} from '../constants/Components';
import {colors, sizes, testUsers} from "../constants/Data";


const theme = colors.lightTheme;
function FollowingListScreen({route, navigation}) {

    const user = route.params.user;
    //const user = testUsers[0];
    return (
        <View style = {styles.container}>
            <FlatList
                vertical
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                data={user.following}
                renderItem = {({item}) => <User name = {item.name} image = {item.profilePicture} method = {() => navigation.navigate("Account", {user: item})}/>}
            />
        </View>
    );
}


function User(props) {
    return (
        <View>
            <TouchableOpacity style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                borderBottomWidth: 1,
                borderBottomColor: theme.color,
                padding: 10,
            }}
            
            onPress = {props.method}>
                <ProfilePicture color={colors.defaultBG2} image={props.image} height={40} width={40} />
                <Text style = {{marginHorizontal: 10}}>{props.name}</Text>
            </TouchableOpacity>
        </View>
    );
}


export default FollowingListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
    }
})