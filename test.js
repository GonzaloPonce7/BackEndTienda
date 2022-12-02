const {ProductManager} = require('./ProductManager')

// Main

let manager = new ProductManager();
// console.log("Se instancio la clase Manager");

// let p1 = new Product("birra", "birra", 15, "tuviejha", 20, "asd")
// let p2 = new Product("birra", "birra", 15, "tuviejha", 20, "asd")
// let p3 = new Product("birra", "fea", 15, "tuviejha", 20, "wer")
// manager.addProduct(p1)
// manager.addProduct(p2)
// manager.addProduct(p3)
// manager.getProductById(1)

// TODO: probar funciones una por una

// manager.print();

// console.log(manager.getProductById(2));
// manager.getProductById(34)


// // Agregar un producto al catalogo

// // manager.addProduct(new Product("...."));

// // manager.print()
module.exports.manager = manager