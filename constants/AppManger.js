import * as data from "./Data"
import {products} from "./Data";


const Users = data.users;
const Products = data.products;

let newList = []

function ManageProducts() {
    for (const user in  Users) {
        for (const product in user.sellerInfo.productList) {
            data.products.push(product);
        }
    }
}

function ManageSuggestedUsers(){
    let suggestedUsers;

    for (const user in Users) {

    }

}

export function ManageSuggestedProducts(){
    let suggestedProducts;

    products.forEach(product => {
        if(suggestedProducts.length <= 20){
            console.log(product)
        }
    })

}

function ManageApp() {

}
