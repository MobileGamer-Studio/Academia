import react from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, StatusBar } from 'react-native';
import { firestore } from '../constants/Sever';
import { doc, collection, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, sizes } from '../constants/Data';
import { Header, Loading } from '../constants/Components';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const theme = colors.lightTheme;
export default function DealScreen({ route, navigation }) {
    const userId = route.params.id;
    const dealId = route.params.dealId;
    const [rating, setRating] = useState(null);
    const [deal, setDeal] = useState({})
    const [deals, setDeals] = useState([])
    const [user, set_user] = useState({})
    const [users, set_users] = useState([])
    const [products, setProducts] = useState([])
    const [loading, set_loading] = useState(true)

    const userRef = doc(firestore, "Users", userId);
    const dealRef = doc(firestore, "Deals", dealId);


    useEffect(() => {

        const dealSub = onSnapshot(doc(firestore, "Deals", dealId), (doc) => {
            setDeal(doc.data())

            if (deal !== {}) {
                set_loading(false)
            }

        })

        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            set_user(doc.data())

        });



    }, [])

    const like = async () => {
        if (rating === 'like') {
            setRating(null)
            await updateDoc(userRef, {
                'userInfo.likedDeal': arrayRemove(productId)
            })
            await updateDoc(dealRef, {
                likes: increment(-1)
            })

        } else if (rating === null || rating === 'dislike') {
            setRating('like')
            await updateDoc(userRef, {
                'userInfo.likedDeal': arrayUnion(productId)
            })
            await updateDoc(userRef, {
                'userInfo.dislikedDeal': arrayRemove(productId)
            })

            await updateDoc(dealRef, {
                likes: increment(1)
            })


        }
    }

    const dislike = async () => {
        if (rating === 'dislike') {
            setRating(null)
            await updateDoc(userRef, {
                'userInfo.dislikedDeal': arrayRemove(productId)
            })

            await updateDoc(dealRef, {
                dislikes: increment(-1)
            })


        } else if (rating === null || rating === 'like') {
            setRating('dislike')
            await updateDoc(userRef, {
                'userInfo.dislikedDeal': arrayUnion(productId)
            })

            await updateDoc(userRef, {
                'userInfo.likedDeal': arrayRemove(productId)
            })

            await updateDoc(dealRef, {
                dislikes: increment(1)
            })

        }
    }

    if (loading === true) {
        return (
            <View style={styles.container}>
                <Loading />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={deal.colors.color1}
                    barStyle='dark-content'
                />
                <LinearGradient colors={[deal.colors.color1, deal.colors.color2]} style={{ flexDirection: 'row', padding: 10, alignItems: 'flex-end', justifyContent: 'space-between', height: 200 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style = {{
                        borderRadius: sizes.ExtraLarge,
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        padding: 10,
                    }}><MaterialIcons name="arrow-back-ios" size={24} color={theme.bgColor} /></TouchableOpacity>
                    <View style={{ width: '80%' }}>
                        <Text style={{ color: theme.bgColor, fontSize: sizes.Large, fontWeight: 'bold', margin: 10 }}>{deal.title}</Text>
                    </View>
                    <View style={{
                        backgroundColor: theme.bgColor,
                        borderRadius: sizes.ExtraSmall,
                        width: 50,
                        alignItems: 'center',
                        alignSelf: 'flex-start',
                    }}>
                        <Text style={{
                            color: deal.colors.color2,
                            fontSize: 12,
                            margin: 5,
                        }}>{'-' + deal.discount + '%'}</Text>
                    </View>
                </LinearGradient>

                <View>
                    <Text style={{ color: deal.colors.color2, fontSize: sizes.Small, fontWeight: 'bold', margin: 10 }}>{deal.details}</Text>
                </View>
                {
                    rating === null ? (
                        <View style={{
                            position: "absolute",
                            backgroundColor: colors.white,
                            bottom: 10,
                            width: 100,
                            alignSelf: 'center',
                            padding: 10,
                            borderRadius: sizes.Medium,
                            margin: 10,
                            flexDirection: "row",
                            justifyContent: 'space-around',
                            elevation: 2,

                        }}>
                            <AntDesign name="like2" size={20} color={deal.colors.color2} style={{ marginHorizontal: 10 }} onPress={() => like()} />
                            <AntDesign name="dislike2" size={20} color={deal.colors.color2} style={{ marginHorizontal: 10 }} onPress={() => dislike()} />
                        </View>

                    ) : (
                        rating === 'like' ? (
                            <View style={{
                                position: "absolute",
                                backgroundColor: colors.white,
                                bottom: 10,
                                width: 100,
                                alignSelf: 'center',
                                padding: 10,
                                borderRadius: sizes.Medium,
                                margin: 10,
                                flexDirection: "row",
                                justifyContent: 'space-around',
                                elevation: 2,
                            }}>
                                <AntDesign name="like1" size={20} color={deal.colors.color2} style={{ marginHorizontal: 10 }} onPress={() => like()} />
                                <AntDesign name="dislike2" size={20} color={deal.colors.color2} style={{ marginHorizontal: 10 }} onPress={() => dislike()} />
                            </View>
                        ) : (
                            <View style={{
                                position: "absolute",
                                backgroundColor: colors.white,
                                bottom: 10,
                                width: 100,
                                alignSelf: 'center',
                                padding: 10,
                                borderRadius: sizes.Medium,
                                margin: 10,
                                flexDirection: "row",
                                justifyContent: 'space-around',
                                elevation: 2,
                            }}>
                                <AntDesign name="like2" size={20} color={deal.colors.color2} style={{ marginHorizontal: 10 }} onPress={() => like()} />
                                <AntDesign name="dislike1" size={20} color={deal.colors.color2} style={{ marginHorizontal: 10 }} onPress={() => dislike()} />
                            </View>
                        )
                    )
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
    },

})