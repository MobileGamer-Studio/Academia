import React, {useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors, sizes, testUsers} from '../constants/Data';
import {Button, ProductSmall, ProfilePicture} from '../constants/Components';
import {GetData} from "../constants/AppManger";

function AccountScreen({route, navigation}) {

    const userId = route.params.id;
    const [users, setUsers] = useState([])

    console.log("CHECK 1 \n User id: ${userId} \n Users: ${users}  \n User: ${user}")

    async function getUsers() {
        const querySnapshot = await getDocs(collection(firestore, "Users"));
        let data = []
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        });
        setUsers(data)



    }

    getUsers();

    // getUser();
    let user = {}
    users.forEach((item) => {
        if (item.id === userId) {
            user = item
            console.log("got user: ${user}")
        }
    })

    return (
        <View style={styles.container}>
            <View style = {styles.userProfile}>
                <ProfilePicture color={colors.defaultBG2} image={user.profilePicture} />
                <View style={{
                    flexDirection: 'column',
                }}>
                    <Text style={{
                        paddingHorizontal: 10,
                        fontSize: sizes.Medium,
                    }}>{user.name}</Text>
                    <Text style={{
                        paddingHorizontal: 10,
                        fontSize: sizes.Small,
                    }}>{user.description}</Text>
                    <Text style={{
                        paddingHorizontal: 10,
                        fontSize: sizes.Small,
                    }}>{user.followers + " followers"}</Text>
                </View>
                <Button title={"follow"} method={followButton} />
            </View>
            <ScrollView>
                <View style={{
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                    <Text style={{
                        fontSize: sizes.Medium,
                        alignSelf: "flex-start",
                        margin: sizes.ExtraSmall,
                    }}>Products</Text>
                    <View>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            data={user.sellerInfo.productList}
                            renderItem={({item}) => {
                                return (
                                    <ProductSmall
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
                <View>

                </View>
            </ScrollView>
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
