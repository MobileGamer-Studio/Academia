import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { firestore } from "../constants/Sever";
import { onSnapshot, doc } from "firebase/firestore";

export default function PaymentScreen({ route, navigation }) {
    const userId = route.params.id;
    const userRef = doc(firestore, "Users", userId)
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [loadingMessage, setLoadingMessage] = useState("Loading")


    useEffect(() => {
        const userSub = onSnapshot(userRef, (item) => {
            setUser(item.data())
        });
    }, [])

    if (loading === true) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    } else {
        return (
            <View>
                <Text>SellersAgreementScreen</Text>
            </View>
        )

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
})

