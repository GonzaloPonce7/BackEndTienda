class Product {

    constructor(title, description, price, thumbnail, stock, code, status = true, category) {
        this.id= undefined;
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.stock = stock
        this.code = code
        this.status = status
        this.category = category
    }
    
    setId(id) {
        this.id=id;
    }
}

module.exports = Product