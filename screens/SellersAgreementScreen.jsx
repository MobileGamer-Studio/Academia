import { View, Text, StatusBar, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import { firestore } from "../constants/Sever";
import { onSnapshot, doc, } from "firebase/firestore";
import { Header, Loading } from '../constants/Components';
import { colors, sizes } from "../constants/Data";

const theme = colors.lightTheme
export default function SellersAgreementScreen({ route, navigation }) {
  const userId = route.params.id;
  const userRef = doc(firestore, "Users", userId)
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState("Loading")

  useEffect(() => {
    const userSub = onSnapshot(userRef, (item) => {
      setUser(item.data())

      if (user !== {}) {
        setLoading(false)
      }
    });
  }, [])


  if (loading === true) {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={theme.color}
          barStyle='light-content'
        />
        <Header method={() => navigation.goBack()} text={'Terms & Services'} />
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
        <Header method={() => navigation.goBack()} text={'Terms & Services'} />
        <ScrollView>
          <Text style={{
            fontSize: 20,
            margin: 10,
          }}>
            Seller Terms and Agreement for Academia by MobileGamer Studio:
          </Text>
          <Text style={styles.section}>
            Monthly Fee: All sellers must pay a monthly fee in order to continue selling on the Academia platform. The fee will be based on the number of products sold and the monthly earnings of the seller.
          </Text>
          <Text style={styles.section}>
            Payment: The monthly fee must be paid by the due date in order to keep the seller account active. If the fee is not paid, the seller's account will be set to inactive, and eventually removed from the platform.
          </Text>
          <Text style={styles.section}>
            Free Trial Period: The first three months as a seller on Academia will not incur any fees. This is to allow new sellers to get started on the platform and build their business before committing to the monthly fee.
          </Text>
          <Text style={styles.section}>
            Changes to Terms: MobileGamer Studio reserves the right to change these terms and conditions at any time. Sellers will be notified of any changes via the platform or by email.
          </Text>
          <Text style={styles.section}>
            By using the Academia platform to sell products, you agree to the above terms and conditions. If you have any questions or concerns, please contact MobileGamer Studio for further assistance.
          </Text>
          <View>
            <Text>I agree, </Text>
          </View>
          


        </ScrollView>
        <TouchableOpacity style={{
            height: 50,
            width: 150,
            backgroundColor: theme.color,
            borderRadius: sizes.Large,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            position: "absolute",
            bottom: 10,
            right: 10,
            elevation: 2,
            flexDirection: "row",
          }} onPress={() => navigation.navigate('Payment', {id: userId})}>
            <Text style={{ color: theme.bgColor, fontSize: 18 }}>Continue</Text>
          </TouchableOpacity>
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
