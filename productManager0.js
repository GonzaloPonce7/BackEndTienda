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

class ProductManager {
    constructor() {
        this.products = [];
    };
    
    addProduct = (product)=> {
        if (this.isValid(product)) {
            //es valido
            // valido si el producto que ingresa no repite codigo con otro producto en la lista
            if (this.products.find(p => p.code === product.code)) {
                console.log("Codigo repetido");
            }else{
                //this.product.id = this.products.length -> autoincrementa si no se borra ningun elemento
                // this.product.id = this.findMaxId() + 1;
                product.setId(this.findMaxId() + 1);
                
                this.products.push(product);
            }
        } else {
            console.log("Producto no valido: Faltan campos");
        }
    };

    getProducts = ()=> {
        return this.products
    };

    findMaxId = ()=> {
        let maxValue = 0
        for (let i = 0; i < this.products.length; i++) {
            if(this.products[i].id > maxValue) maxValue = this.products[i].id
            //maxValue = (this.products[i].id > maxValue)? this.products[i].id : maxValue;
        }
        return maxValue
    }
    
    getProductById = (id)=> {
        let productFinded = this.products.find(p => p.id == id)
        if (productFinded === undefined) {
            console.log("Not found");
        } else {
            return productFinded
        }
    }

    print = ()=> {
        this.products.forEach(p => {
            console.log(p);
        });
    }

    isValid = (product)=> {
        if(product.code && product.title && product.thumbnail && product.stock && product.price && product.description){
            return true
        }
        return false
    }

}

// Main

let manager = new ProductManager()
let p1 = new Product("birra", "birra", 15, "tuviejha", 20, "asd")
let p2 = new Product("birra", "birra", 15, "tuviejha", 20, "asd")
let p3 = new Product("birra", "fea", 15, "tuviejha", 20, "wer")
manager.addProduct(p1)
manager.addProduct(p2)
manager.addProduct(p3)

manager.print();

console.log(manager.getProductById(2));
manager.getProductById(34)


// Agregar un producto al catalogo

// manager.addProduct(new Product("...."));

// manager.print()