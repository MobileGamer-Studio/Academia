import { View, Text, StatusBar, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import { firestore } from "../constants/Sever";
import { onSnapshot, doc, } from "firebase/firestore";
import { Header, Loading } from '../constants/Components';
import { colors, currency, sizes } from "../constants/Data";
//import { PayWithFlutterwave, FlutterwaveInit, FlutterwaveButton } from 'flutterwave-react-native';


const theme = colors.lightTheme;
export default function PaymentScreen({ route, navigation }) {
    const userId = route.params.id;
    const userRef = doc(firestore, "Users", userId)
    const [user, set_user] = useState({})
    const [loading, set_loading] = useState(true)
    const [loadingMessage, set_loadingMessage] = useState("Loading")
    const [amount, setAmount] = useState(0)
    const [paymentLink, setPaymentLink] = useState('https://sandbox-flw-web-v3.herokuapp.com/pay/13weq8l5l4zt')
    const [publicKey, setPublicKey] = useState('100202151')


    useEffect(() => {
        const userSub = onSnapshot(userRef, (item) => {
            set_user(item.data())

            if (user !== {}) {
                set_loading(false)
            }

        });
    }, [])


    /* An example function called when transaction is completed successfully or canceled */
    const handleOnRedirect = (data) => {
        console.log(data);
    };

    /* An example function to generate a random transaction reference */
    const generateTransactionRef = (length) => {
        var result = '';
        var characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return `flw_tx_ref_${result}`;
    };

    const Pay = async () => {
        try {
            // initialize payment
            // const paymentLink = await FlutterwaveInit({
            //     tx_ref: generateTransactionRef(),
            //     authorization: publicKey,
            //     amount: amount,
            //     currency: 'NGN',
            //     customer: {
            //         email: user.loginDetails.email,
            //     },
            //     payment_options: 'card',
            // });
            // // use payment link
            // usePaymentLink(paymentLink);
        } catch (error) {
            // handle payment error
            alert(error.message);
        }
    }

    if (loading === true) {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={theme.color}
                    barStyle='light-content'
                />
                <Header method={() => navigation.goBack()} text={'Payment'} />
                <Loading />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={theme.color}
                    barStyle='light-content'
                />
                <Header method={() => navigation.goBack()} text={'Payment'} />
                <View style={{
                    flex: 1,
                    //justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        backgroundColor: theme.bgColor,
                        elevation: 5,
                        width: '90%',
                        height: 200,
                        borderRadius: sizes.Medium,
                        margin: 20,
                        padding: 10,
                    }}>
                        <Text style={styles.section}>Name: {user.name}</Text>
                        <Text style={styles.section}>Email: {user.loginDetails.email}</Text>
                        <Text style={styles.section}>Phone: {user.phone}</Text>
                        <Text style={styles.section}>Amount: {amount}</Text>
                    </View>
                    {/* <PayWithFlutterwave
                    style = {{
                        alignSelf: 'center',
                    }}
                    onRedirect={handleOnRedirect}
                    options={{
                        tx_ref: generateTransactionRef(10),
                        authorization: '100202151',
                        customer: {
                            email: user.loginDetails.email,
                        },
                        amount: amount,
                        currency: 'NGN',
                        payment_options: 'card'
                    }}
                    customButton={(props) => (
                        <TouchableOpacity
                          style = {{
                            backgroundColor: theme.color,
                            width: '80%',
                          }}>
                            <Text style = {{color: 'white', fontSize: 20}}>Pay</Text>
                        </TouchableOpacity>
                    )}
                /> */}
                    <TouchableOpacity style = {{
                        backgroundColor: theme.color,
                        width: '80%',
                        padding: 10,
                        borderRadius: sizes.Large,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 10,
                        elevation: 2,
                    }} onPress = {() => Pay()}
                    >
                    <Text style = {{color: colors.white, fontSize: 20}}>{"Pay " + currency.naira + amount}</Text>
                    </TouchableOpacity>
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

    section: {
        fontSize: 16,
        margin: 5,
    }
})