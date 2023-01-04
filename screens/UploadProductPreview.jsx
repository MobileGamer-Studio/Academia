import react, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert,StatusBar } from 'react-native';
import { colors, sizes, images, Product } from '../constants/Data';
import { Header, Loading } from '../constants/Components';
import { firestore, storage } from '../constants/Sever';
import { collection, onSnapshot, setDoc, doc } from 'firebase/firestore';
import { Button } from '../constants/Components';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
// import * as Notifications from 'expo-notifications';

// Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: true,
//         shouldSetBadge: true,
//     }),
// });

const theme = colors.lightTheme;
function UploadProductPreview({ route, navigation }) {
    const product = route.params.product;
    const userId = route.params.id;

    const [loading, setLoading] = react.useState(true);
    const [loadingMessage, setLoadingMessage] = react.useState('');
    const [user, setUser] = react.useState({});

    //
    // const [expoPushToken, setExpoPushToken] = useState('');
    // const [notification, setNotification] = useState(false);
    // const notificationListener = useRef();
    // const responseListener = useRef();


    useEffect(() => {
        const userSub = onSnapshot(doc(firestore, "Users", userId), (doc) => {
            setUser(doc.data())
            
            if (user !== {}){
                setLoading(false)
            }

        });

        // registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        //     setNotification(notification);
        // });

        // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        //     console.log(response);
        // });

        // return () => {
        //     userSub();
        //     Notifications.removeNotificationSubscription(notificationListener);
        //     Notifications.removeNotificationSubscription(responseListener);
        // }
    }, [])

    const uploadProduct = async () => {
        setLoading(true);
        setLoadingMessage('Uploading Product...')
        const newProduct = Product;
        newProduct.title = product.title;
        newProduct.details = product.details;
        newProduct.price = product.price;
        newProduct.sellersId = userId;
        newProduct.seller = user.name;
        newProduct.discount = product.discount;
        newProduct.amountAvailable = product.amountAvailable;
        newProduct.tags = product.tags;
        newProduct.id = userId + "-" + newProduct.title

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', product.image, true);
            xhr.send(null);
        });




        const imageRef = ref(storage, userId + '/' + product.id + '.jpg');
        const uploadTask = await uploadBytes(imageRef, blob).then(async () => {
            newProduct.image = await getDownloadURL(imageRef)
            console.log(newProduct.image)
        });

        blob.close();

        


        if (user.sellerInfo.productList.includes(newProduct.id) === false) {
            user.sellerInfo.productList.push(newProduct.id);

            await setDoc(doc(firestore, "Users", userId), user);
            await setDoc(doc(firestore, "Products", newProduct.id), newProduct);
            setLoading(false);
            Alert.alert(
                "Product Uploaded",
                'Your product has been uploaded successfully',
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate('Home', {id: userId})
                    },
                ]
            )
        } else {
            setLoading(false);
            Alert.alert(
                "Product Already Exists",
                'You have already uploaded a product with this name',
                [
                    {
                        text: "OK",
                        onPress: () => navigation.goBack()
                    }
                ]
            )
        }

        console.log(newProduct + "\n" + user)
        
    }


    if (loading === true) {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={theme.color}
                    barStyle='light-content'
                />
                <Header method={() => navigation.goBack()} text={'Preview'} />
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
                <Header method={() => navigation.goBack()} text={'Preview'} />

                <View style={{
                    width: 350,
                    backgroundColor: theme.bgColor,
                    padding: 10,
                    borderRadius: sizes.Large,
                    elevation: 1,
                    shadowColor: colors.grey,
                    alignItems: 'center',
                    marginTop: 20,
                }}>
                    <Text style={styles.section}>{'Product Title: ' +product.title}</Text>
                    <Text style={styles.section}>{'Description: ' +product.details}</Text>
                    <Text style={styles.section}>{'Price: ' +product.price}</Text>
                    <Text style={styles.section}>{'Discount: ' +product.discount}</Text>
                    <Text style={styles.section}>{'Amount Available: ' +product.amountAvailable}</Text>
                    <Text style={styles.section}>{'Seller: '+product.seller}</Text>
                    
                    <View style={styles.section}>
                        <Text style={{ marginHorizontal: 5 }}>{"Tags: "}</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            // keyExtractor={(item) => item.id}
                            data={product.tags}
                            renderItem={({ item }) => {
                                return (
                                    <Tag tagName={item} />
                                );
                            }}

                        />
                    </View>

                    <View style={{
                        height: 200,
                        width: 200,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                    }}>
                        <Image style={{
                            height: 200,
                            width: 200,

                        }}
                            source={{ uri: product.image }}
                            resizeMode='contain' />
                    </View>
                </View>

                <Button
                    style={styles.button}
                    method={() => {
                        uploadProduct();
                    }}
                    text={"Upload Product"}
                    textStyle={{ color: theme.bgColor, fontSize: sizes.Medium }}
                />


            </View>
        );
    }
}

const Tag = (props) => {
    return (
        <View style={{
            backgroundColor: theme.color,
            marginHorizontal: 10,
            borderRadius: sizes.ExtraLarge,
            paddingHorizontal: 10,
            paddingVertical: 2.5
        }}>
            <Text style={{
                color: colors.white,
                fontSize: sizes.Small,
            }}>{"#" + props.tagName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.bgColor,
    },

    button: {
        borderRadius: sizes.ExtraLarge,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: theme.color,
        marginHorizontal: 5,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },

    section : { borderBottomColor: theme.outline, borderBottomWidth: 1, width: '100%', padding: 5, flexDirection: 'row' },
});


export default UploadProductPreview;
