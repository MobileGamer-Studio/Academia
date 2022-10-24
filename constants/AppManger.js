import { User } from "./Data";
import { firestore, getData, saveData } from "./Sever";
import { collection, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";


export async function SaveAppData() {
    console.log("Saving data.... STEP 1");

    try {
        //
        const resultUser = await AsyncStorage.getItem('Users');
        const resultProduct = await AsyncStorage.getItem('Products');
        const resultCategories = await AsyncStorage.getItem('Categories');


        //
        const users = JSON.parse(resultUser);
        const products = JSON.parse(resultProduct);
        const categories = JSON.parse(resultCategories);


        //
        console.log(users + " test 1")
        console.log(products + " test 1")
        console.log(categories + " test 1")


        //
        users.forEach((user) => {
            console.log(user + "test 2")
            saveData(user, "Users", user.name);
        })
        products.forEach((product) => {
            console.log(product + "test 2")
            saveData(product, "Products", product.title);
        })
        categories.forEach((category) => {
            console.log(category + "test 2")
            saveData(category, "Categories", category.name);
        })
    } catch (error) {
        
    }
    
}

export async function GetAppData() {
    const data = {
        users: [],
        products: [],
        categories: []
    }

    console.log("Getting data.... STEP 2");
    data.users = await getDocs(collection(firestore, "Users"));
    data.products = await getDocs(collection(firestore, "Products"));
    data.categories = await getDocs(collection(firestore, "Categories"));

    await AsyncStorage.setItem("Users", JSON.stringify(data.users))
    await AsyncStorage.setItem("Products", JSON.stringify(data.products))
    await AsyncStorage.setItem("Categories", JSON.stringify(data.categories))

}



export function GetData(id, data) {
    console.log("Getting data..... STEP 3")
    data.forEach((user) => {
        console.log(user);
        if (id === user.id) {
            console.log("user gotten: " + user);
            return user;
        }
    })
    return User;
}

export function ManageAppData() {
    SaveAppData()
    GetAppData()
}

