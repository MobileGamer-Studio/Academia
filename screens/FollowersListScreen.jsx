import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from "react-native";
import {sizes, testUsers} from "../constants/Data";


function User(props) {
    const user = props.user;
    return (
        <View>
            <TouchableOpacity style = {{
                flexDirection: "row",
            }}>

            </TouchableOpacity>
        </View>
    );
}

function FollowersListScreen() {
    return(
        <View style = {styles.container}>
            <View>
                <FlatList
                    vertical
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={testUsers}
                    renderItem={({ item }) => {
                        return (
                            <User/>
                        )
                    }}
                />
            </View>
        </View>
    );
}
export default FollowersListScreen;

const styles = StyleSheet.create({
    container: {
        paddingVertical: sizes.ExtraLarge,
        flex: 1,
    }
})