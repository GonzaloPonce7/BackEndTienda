const { Product } = require("../models/Product");
const fs = require("fs");

class ProductManager {
  constructor(path = "./listaProductos.txt") {
    this.path = path;
    this.products = this.readFileInit(path) || this.writeFileInit(path);
  }

  addProduct = async (product) => {
    //TODO: agregar almacenamiento en el archivo y poder actualizarlo cada ves que se agregue un producto
    if (this.isValid(product)) {
      //es valido
      // valido si el producto que ingresa no repite codigo con otro producto en la lista
      if (this.products.find((p) => p.code === product.code)) {
        console.log("Codigo repetido");
      } else {
        //this.product.id = this.products.length -> autoincrementa si no se borra ningun elemento
        // this.product.id = this.findMaxId() + 1;
        product.setId(this.findMaxId() + 1);
        this.products.push(product);
        await this.writeFile(this.products);
      }
    } else {
      throw new Error("Producto no valido: Faltan campos");
    }
  };

  updateProduct = async (id, product) => {
    //TODO: recibe el id del producto y lo actualiza en el archivo
    let productFinded = await this.getProductById(id);
    if (productFinded == undefined) {
      console.log("Producto no encontrado");
    } else {
      if (product.title && product.title != "") {
        productFinded.title = product.title;
      }
      if (product.description && product.description != "") {
        productFinded.description = product.description;
      }
      if (product.price && product.price >= 0) {
        productFinded.price = product.price;
      }
      if (product.thumbnail && product.thumbnail != "") {
        productFinded.thumbnail = product.thumbnail;
      }
      if (product.stock && product.stock >= 0) {
        productFinded.stock = product.stock;
      }
      if (product.code && product.code != "") {
        productFinded.code = product.code;
      }
      if (product.status && product.status != "") {
        productFinded.status = product.status;
      }
      if (product.category && product.category != "") {
        productFinded.category = product.category;
      }
      await this.writeFile(this.products);
    }
  };

  deleteProduct = async (id) => {
    // Buscar el producto en el [] por id y borrarlo de la lista
    let findIndex = this.products.findIndex((p) => p.id == id);
    if (findIndex === undefined) {
      throw new Error("Producto no existente en la lista");
    } else {
      this.products.splice(findIndex, 1);
      await this.writeFile(this.products);
    }
  };

  getProducts = async () => {
    return await this.readFile();
  };

  getProductById = async (id) => {
    this.products = await this.readFile();

    let productFinded = this.products.find((p) => p.id == id);
    if (productFinded === undefined) {
      throw new Error("Producto no existente en la lista");
    } else {
      return productFinded;
    }
  };

  findMaxId = () => {
    let maxValue = 0;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id > maxValue) maxValue = this.products[i].id;
      //maxValue = (this.products[i].id > maxValue)? this.products[i].id : maxValue;
    }
    return maxValue;
  };

  print = () => {
    this.products.forEach((p) => {
      console.log(p);
    });
  };

  readFileInit = () => {
    let contenido = [];

    try {
      let text = fs.readFileSync(this.path, "utf-8");
      contenido = JSON.parse(text);
    } catch (error) {
      console.log(
        "Error al intentar leer el archivo, se inicializara vacio:",
        error.message
      );
    }
    return contenido;
  };

  writeFileInit = () => {
    let contenido = [];

    try {
      let text = fs.writeFileSync(this.path, "utf-8");
      contenido = JSON.parse(text);
    } catch (error) {
      console.log(
        "Error al intentar leer el archivo, se inicializara vacio:",
        error.message
      );
    }
    return contenido;
  };

  readFile = async () => {
    try {
      let contenido = await fs.promises.readFile(this.path, "utf-8");
      console.log("Archivo Leido", contenido);
      return JSON.parse(contenido);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  writeFile = async (dataBase) => {
    try {
      const data = JSON.stringify(dataBase);
      await fs.promises.writeFile(this.path, data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  isValid = (product) => {
    if (
      product.code &&
      product.title &&
      product.thumbnail &&
      product.stock &&
      product.price &&
      product.description &&
      product.status &&
      product.category
    ) {
      return true;
    }
    return false;
  };
}

module.exports.ProductManager = ProductManager;
