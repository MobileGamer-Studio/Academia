import * as data from "./Data"


const Users = data.users;
const Products = data.products;

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

function ManageSuggestedProducts(){
    let suggestedProducts;

    for (const products in Products) {

    }

}

function ManageApp() {

}
