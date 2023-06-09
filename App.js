import React, {useState, useEffect} from 'react';
import {colors} from './constants/Data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


//Screens
import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import AccountScreen from './screens/AccountScreen';
import CartScreen from "./screens/CartScreen";
import ProductScreen from './screens/ProductScreen';
import SettingScreen from './screens/SettingScreen';
import SearchScreen from './screens/SearchScreen';
import LandingScreen from './screens/LandingScreen';
import UserAccount from './screens/UserAccount';
import UploadProduct from "./screens/UploadProduct";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";
import EditProfileScreen from './screens/EditProfileScreen';
import OrderScreen from './screens/OrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import CheckOutScreen from "./screens/CheckOutScreen";
import FollowingListScreen from './screens/FollowingListScreen';
import FollowersListScreen from './screens/FollowersListScreen';
import ChatListScreen from './screens/ChatListScreen';
import ChatScreen from './screens/ChatScreen';
import AccountListScreen from './screens/AccountListScreen';
import SavedScreen from './screens/SavedScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import UploadProductPreview from './screens/UploadProductPreview';
import AdsScreen from './screens/AdsScreen';
import ListScreens from './screens/ListScreens';
import DealScreen from './screens/DealScreen';
import SellersAgreementScreen from './screens/SellersAgreementScreen';
import PaymentScreen from './screens/PaymentScreen';


const Stack = createNativeStackNavigator();

function App() {
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        getTheme();
    }, []);

    const getTheme = async () => {
        try {
            const value = await AsyncStorage.getItem('theme');
            if (value !== null) {

                setTheme(JSON.parse(value));
            } else {
                setTheme(colors.light);
            }
        } catch (e) {
            console.log(e);
        }
    }; 
    
    const setThemeValue = async (value) => {
        try {
            await AsyncStorage.setItem('theme', JSON.stringify(value));
            setTheme(value);
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Loading"
                    component={LoadingScreen}
                    options={{headerShown: false, }}
                    initialParams={{theme: theme}}
                />
                <Stack.Screen
                    name="Landing"
                    component={LandingScreen}
                    options={{headerShown: false}}
                    initialParams={{theme: theme}}
                />
                <Stack.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{headerShown: false}}
                    initialParams={{ theme: theme }}
                />

                {/* Accounts */}
                <Stack.Screen
                    name="UserAccount"
                    component={UserAccount}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />
                <Stack.Screen
                    name="Account"
                    component={AccountScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EditProfile"
                    component={EditProfileScreen}
                    options={{ headerShown: false }}
                />

                {/* Products */}
                <Stack.Screen
                    name="Product"
                    component={ProductScreen}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />
                <Stack.Screen
                    name="ProductPreview"
                    component={UploadProductPreview}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />
                <Stack.Screen
                    name="UploadProduct"
                    component={UploadProduct}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />
                <Stack.Screen
                    name="ProductList"
                    component={ProductListScreen}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />

                <Stack.Screen
                    name="Deal"
                    component={DealScreen}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />

                <Stack.Screen
                    name="Following"
                    component={FollowingListScreen}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />

                <Stack.Screen
                    name="Followers"
                    component={FollowersListScreen}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />

                <Stack.Screen
                    name="Checkout"
                    component={CheckOutScreen}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />
                <Stack.Screen
                    name="Cart"
                    component={CartScreen}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />                
                <Stack.Screen
                    name="Orders"
                    component={OrderScreen}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />

                <Stack.Screen
                    name="Settings"
                    component={SettingScreen}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />
                <Stack.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{headerShown: false}}
                    initialParams={{ theme: theme }}
                />

                <Stack.Screen
                    name="Chats"
                    component={ChatListScreen}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />
                <Stack.Screen
                    name="Chat"
                    component={ChatScreen}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />
                <Stack.Screen
                    name="Accounts"
                    component={AccountListScreen}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />
                <Stack.Screen
                    name="Saved"
                    component={SavedScreen}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />
                <Stack.Screen
                    name="List"
                    component={ListScreens}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />
                <Stack.Screen
                    name="Notifications"
                    component={NotificationsScreen}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />
                <Stack.Screen
                    name="SellersAgreement"
                    component={SellersAgreementScreen}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />
                <Stack.Screen
                    name="Payment"
                    component={PaymentScreen}
                    options={{ headerShown: false }}
                    initialParams={{ theme: theme }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
