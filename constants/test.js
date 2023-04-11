
const { faker } = require('@faker-js/faker');

const product = {
    title: faker.commerce.productName(),
    details: faker.commerce.productDescription,
    price: faker.commerce.price(),
    seller: faker.name.findName(),
    sellersId: '',
    image: faker.image.imageUrl(),
    tags: [faker.commerce.productMaterial(), faker.commerce.productMaterial(), faker.commerce.productMaterial()],
    amountAvailable: faker.random.number(),
    sold: faker.random.number(),
    ratings: faker.random.number(),
    likes: faker.random.number(),
    dislikes: faker.random.number(),
    comments: [faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()],
    discount: faker.random.number(),
    views: [],
    id: faker.random.uuid(),

}


console.log(product);