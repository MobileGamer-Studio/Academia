export class Product {
    constructor(title, description, price, category, seller, image, tags) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.category = category;
        this.seller = seller;
        this.image = image;
        this.tag = tags;

        this.tag.push(this.title);
        this.tag.push(this.seller);
    }
}