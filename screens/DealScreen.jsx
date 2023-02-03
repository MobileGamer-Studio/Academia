import react from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, StatusBar } from 'react-native';
import { firestore } from '../constants/Sever';
import { doc, collection, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, sizes } from '../constants/Data';
import { Header, Loading } from '../constants/Components';
import { AntDesign } from '@expo/vector-icons';

const theme = colors.lightTheme;
export default function DealScreen({ route, navigation }) {
    const userId = route.params.id;
    const dealId = route.params.dealId;
    const [rating, setRating] = useState(null);
    const [deal, setDeal] = useState({})
    const [deals, setDeals] = useState([])
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const userRef = doc(firestore, "Users", userId);
    const dealRef = doc(firestore, "Deals", dealId);


    useEffect(() => {

        const dealSub = onSnapshot(doc(firestore, "Deals", dealId), (doc) => {
            setDeal(doc.data())

            if (deal !== {}) {
                setLoading(false)
            }

        })

        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            setUser(doc.data())

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
                {
                    rating === null ? (
                        <View style={{
                            position: "absolute",
                            backgroundColor: colors.white,
                            right: 0,
                            top: 110,
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
                                right: 0,
                                top: 110,
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
                                right: 0,
                                top: 110,
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
                <View>
                    <Text style={{ color: deal.colors.color2, fontSize: sizes.Small, fontWeight: 'bold', margin: 10 }}>{deal.details}</Text>
                </View>
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