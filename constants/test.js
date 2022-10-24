const appData = {
    users: [],
    products: [],
    categories: []
}

console.log("User: "+appData.users);

appData.users = ["Hello", "Name", "Food"]
console.log("User: "+appData.users);

appData.users.push("My own");
console.log("User: "+appData.users);