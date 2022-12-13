import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {colors, testUsers, sizes} from '../constants/Data';
import { firestore } from "../constants/Sever";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";
import { Entypo } from '@expo/vector-icons';

const theme = colors.lightTheme;
function CartScreen({route, navigation}) {
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

    getUsers().then(r => console.log("Promise resolved!"));

    let user = {}
    users.forEach((item) => {
        if (item.id === userId) {
            user = item
            console.log("got user: " + user.name)
        }
    })

    const cart = [];


    const RemoveItem = (item) => {
        let index = cart.indexOf(item);
        cart.slice(index)
    }

    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    vertical
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={cart}
                    renderItem={({item}) => {
                        return (
                            <CartItem
                                product = {item.product}
                                item = {item}
                                method = {() => {console.log()}}
                                amount = {item.amountSellected}
                            />
                        );
                    }}
                />
            </View>
        </View>
    );
}

function CartItem(props) {
    return (
        <View style={{
            elevation: sizes.ExtraSmall,
            marginVertical: sizes.ExtraSmall,
        }}>
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    backgroundColor: colors.white,
                    borderRadius: sizes.Small,
                    height: 150,
                    alignItems: 'flex-start',
                    justifyContent: "flex-start",
                    padding: 5,
                }}

                onPress={props.method}
            >
                <View style={{
                    height: 100,
                    alignSelf: "center",
                    justifyContent: "center",
                }}>
                    <Image
                        style={{
                            flex: 1,
                            alignSelf: "center",
                        }}
                        resizeMode="contain"
                        source={props.product.image} />
                </View>
                <View>
                    <Text style={{ fontSize: sizes.Medium, color: colors.black }}>{props.title}</Text>
                    <Text style={{ fontSize: sizes.Small, color: colors.grey }}>{props.description}</Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start"
                }}>
                    <Button
                        style={{
                            borderRadius: sizes.ExtraLarge,
                            borderWidth: 1,
                            borderColor: colors.defaultBG4,
                            padding: 5,
                            alignItems: "center",
                            justifyContent: "center",
                            marginHorizontal: 10,
                        }}
                        method={() => RemoveItem(props.item)}
                        text={"Cancel"}
                        textStyle={{ fontSize: sizes.Small, color: colors.white }}
                    /><Button
                        style={{
                            borderRadius: sizes.ExtraLarge,
                            backgroundColor: colors.defaultBG4,
                            padding: 5,
                            alignItems: "center",
                            justifyContent: "center",
                            marginHorizontal: 10,
                        }}
                        method={() => RemoveItem(props.item)}
                        text={"Edit"}
                        textStyle={{ fontSize: sizes.Small, color: colors.white }}
                    />

                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.bgColor,
        flex: 1,
    },
})

export default CartScreen;
