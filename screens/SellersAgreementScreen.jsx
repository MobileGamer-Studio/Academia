import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react';
import { firestore } from "../constants/Sever";
import { onSnapshot, doc,  } from "firebase/firestore";


export default function SellersAgreementScreen({route, navigation}) {
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


  if ( loading === true) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }else{
    return (
      <View>
        <Text>SellersAgreementScreen</Text>
      </View>
    )
    
  }
}