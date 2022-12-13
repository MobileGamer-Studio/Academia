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


const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
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
                    name="Following"
                    component={FollowingListScreen}
                />

                <Stack.Screen
                    name="Followers"
                    component={FollowersListScreen}
                />

                <Stack.Screen
                    name="Checkout"
                    component={CheckOutScreen}
                />
                <Stack.Screen
                    name="Cart"
                    component={CartScreen}
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
                />
                <Stack.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name="Chats"
                    component={ChatListScreen}
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
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
