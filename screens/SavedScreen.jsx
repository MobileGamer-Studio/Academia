import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList, StyleSheet} from 'react-native';
import { colors, sizes, images} from '../constants/Data';
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { SearchBar, ProfilePicture, Header, Loading, Button} from '../constants/Components';
import { firestore } from "../constants/Sever";
import { getDocs, collection, setDoc, doc, onSnapshot } from "firebase/firestore";

const theme = colors.lightTheme;
function SavedScreen({navigation, route}) {
    const userId = route.params.id;
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    const [savedList, setSavedList] = useState([])

    useEffect(() => {
        const usersSub = onSnapshot(collection(firestore, "Users"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            //console.log("Current data: ", data);
            setUsers(data)
        });

        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            setUser(doc.data())

            setSavedList(doc.data().userInfo.savedList)

            if (user !== {}) {
                setLoading(false)
            }
        });


    }, [])
    
    if (loading === true) {
        return (
            <View style={styles.container}>
                <Header method={() => navigation.goBack()} text={'Saved'} />
                <Loading />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Header method={() => navigation.goBack()} text={'Saved'} />
                {
                    savedList.length !== 0 ? (
                        <View>
                            <FlatList
                                vertical
                                numColumns={2}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                data={savedList}
                                renderItem={({ item }) => {
                                    return (
                                        <Product
                                            product={item}
                                        />
                                    )
                                }}
                            />
                        </View>
                    ) : (
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <View style={{
                                height: 300,
                                width: 300,
                                alignItems: "center",
                            }}>
                                <Image
                                    source={images.empty}
                                    style={{
                                        height: 300,
                                        width: 300,
                                        flex: 1,
                                    }}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={{
                                fontSize: sizes.Medium,
                            }}>You have no saved products</Text>
                            <Button
                                style={{}}
                                method={() => navigation.navigate("Search", { id: user.id })}
                                text={"Add Your First Product"}
                                textStyle={{ color: theme.color, fontSize: sizes.Small }}
                            />
                        </View>)
                    }
            </View>
        );
    }
}

export default SavedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
        alignItems: 'center',
    },
});