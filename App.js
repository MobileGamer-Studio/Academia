import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import AccountScreen from './screens/AccountScreen';
import CartScreen from "./screens/CartScreen"
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
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen
                    name="Ads"
                    component={AdsScreen}
                    options={{ headerShown: false }}
                /> */}
                <Stack.Screen
                    name="Loading"
                    component={LoadingScreen}
                    options={{headerShown: false, }}
                    
                />
                <Stack.Screen
                    name="Landing"
                    component={LandingScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{headerShown: false}}
                />

                {/* Accounts */}
                <Stack.Screen
                    name="UserAccount"
                    component={UserAccount}
                    options={{ headerShown: false }}
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
                />
                <Stack.Screen
                    name="ProductPreview"
                    component={UploadProductPreview}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UploadProduct"
                    component={UploadProduct}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProductList"
                    component={ProductListScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Deal"
                    component={DealScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Following"
                    component={FollowingListScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Followers"
                    component={FollowersListScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Checkout"
                    component={CheckOutScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Cart"
                    component={CartScreen}
                    options={{ headerShown: false }}
                />                
                <Stack.Screen
                    name="Orders"
                    component={OrderScreen}
                    options={{ headerShown: false }}
                />


                {/*  */}
                <Stack.Screen
                    name="Settings"
                    component={SettingScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name="Chats"
                    component={ChatListScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Chat"
                    component={ChatScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Accounts"
                    component={AccountListScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Saved"
                    component={SavedScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="List"
                    component={ListScreens}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Notifications"
                    component={NotificationsScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SellerAgreement"
                    component={SellersAgreementScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Payment"
                    component={PaymentScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
