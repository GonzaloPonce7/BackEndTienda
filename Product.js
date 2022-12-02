class Product {

    constructor(title, description, price, thumbnail, stock, code) {
        this.id= undefined;
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.stock = stock
        this.code = code
    }
    
    setId(id) {
        this.id=id;
    }
}

module.exports.Product = Product