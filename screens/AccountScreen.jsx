import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, sizes} from '../constants/Data';
import {ProductMin, ProfilePicture, Button} from '../constants/Components';

function Follow() {

}

function UserProfile(props) {
    return (
        <View style={styles.userProfile}>
            <ProfilePicture color={colors.defaultBG2} image={props.image}/>
            <View style={{
                flexDirection: 'column',
            }}>
                <Text style={{
                    paddingHorizontal: 10,
                    fontSize: sizes.Medium,
                }}>{props.name}</Text>
                <Text style={{
                    paddingHorizontal: 10,
                    fontSize: sizes.Small,
                }}>{props.description}</Text>
                <Text style={{
                    paddingHorizontal: 10,
                    fontSize: sizes.Small,
                }}>{props.followers + " followers"}</Text>
            </View>
            <Button title = {"follow"} method = {Follow}/>
        </View>
    );
}

function AccountScreen({route, navigation}) {

    const user = route.params.item;

    return (
        <View style={styles.container}>
            <UserProfile
                name={user.name}
                description={user.description}
                followers={user.followers}
                image={user.profilePicture}
            />
            <View style={{
                flexDirection: "column",
                alignItems: "center",
            }}>
                <Text style={{
                    fontSize: sizes.Medium,
                    alignSelf: "flex-start",
                    margin: sizes.ExtraSmall,
                }}>Products</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={user.sellerInfo.productList}
                    renderItem={({item}) => {
                        return (
                            <ProductMin
                                product={item}
                                title={item.title}
                                price={item.price}
                                image={item.image}
                                method={() => navigation.navigate("Product", {item})}
                            />
                        )
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.defaultBG2,
        paddingTop: 10,
        paddingHorizontal: 5,
    },

    userProfile: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignContent: 'center',
        padding: sizes.Medium,
        //elevation: sizes.Medium,
        margin: sizes.ExtraSmall,
    },
});

export default AccountScreen;
