import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {firestore} from "./constants/Sever";

//Screens
import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import AccountScreen from './screens/AccountScreen';
import CartScreen from "./screens/CartScreen"
import ProductScreen from './screens/ProductScreen';
import SettingScreen from './screens/SettingScreen';
import SearchScreen from './screens/SearchScreen';
import LandingScreen from './screens/LandingScreen';
import MyAccountScreen from './screens/MyAccountScreen';
import UploadProduct from "./screens/UploadProduct";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";
import {getData, saveData} from './constants/Sever';
import {users} from './constants/Data';
import {collection, getDocs} from "firebase/firestore";


const Stack = createNativeStackNavigator();

async function Start(){
    users.forEach(element => {
        saveData(element, "Users", element.name).then(r => console.log(r));
    });
    console.log(getData("Users"));
    const querySnapshot = await getDocs(collection(firestore, "Users"));
    querySnapshot.forEach((doc) => {
        if(!users.includes(doc.data())){
            users.push(doc.data());
        }else{
            console.log("User is already added")
        }
    });
    console.log("Users: ", users);
}

export default function App() {
    Start().then(r => console.log(r));
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Loading"
                    component={LoadingScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Landing"
                    component={LandingScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Account"
                    component={AccountScreen}
                />
                <Stack.Screen
                    name="UserAccount"
                    component={MyAccountScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Cart"
                    component={CartScreen}
                />
                <Stack.Screen
                    name="Product"
                    component={ProductScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="UploadProduct"
                    component={UploadProduct}
                    options={{headerShown: false}}
                />
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
                    name="SignIn"
                    component={SignInScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{headerShown: false}}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
