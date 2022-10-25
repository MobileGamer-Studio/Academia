
const appData = {
    users: [],
    products: [],
    categories: []
}

console.log("User: "+appData.users);

appData.users = ["Hello", "Name", "Food", "Name", "Hello"]
console.log("User: "+appData.users);

appData.users.push("My own");
console.log("User: "+appData.users);

let list = []
appData.users.forEach(result => {
    if (list.includes(result) === false){
        list.push(result)
    }

})

list.forEach(tag => {
    let id = appData.products.length.toString()
    appData.products.push({
        Tag: tag,
        Id: id,
    })
})

console.log(appData.products)

console.log(JSON.stringify(appData) + "\n" +JSON.stringify(appData.users))