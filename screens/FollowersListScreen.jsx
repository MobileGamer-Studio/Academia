import React from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, Text } from "react-native";
import { ProfilePicture, RoundButton } from '../constants/Components';
import { colors, sizes, testUsers } from "../constants/Data";



function FollowersListScreen({route, navigation}) {
    const user = route.params.user;
    return(
        <View style = {styles.container}>
            <View>
                <FlatList
                    vertical
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={user.followers}
                    renderItem={({ item }) => <User name={item.name} image={item.profilePicture} method={() => navigation.navigate("Account", { user: item })} />}
                />
            </View>
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
                borderBottomColor: colors.defaultBG4,
                padding: 10,
            }}

                onPress={props.method}>
                <ProfilePicture color={colors.defaultBG2} image={props.image} height={40} width={40} />
                <Text style={{ marginHorizontal: 10 }}>{props.name}</Text>
            </TouchableOpacity>
        </View>
    );
}


export default FollowersListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})