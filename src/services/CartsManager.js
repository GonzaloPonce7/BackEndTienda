import fs from 'fs'
import pathModule from 'path'
import { Cart } from '../dao/daoFs/Cart.js';
import { CartItem } from '../dao/daoFs/CartItem.js';
import __dirname from '../utils.js';


//const fs = require("fs");
//const pathModule = require('path')
//const  Cart  = require("../models/Cart");
//const  CartItem  = require("../models/CartItem");

class CartsManager {
  constructor(path = (__dirname + "/db/carritos.json")) {
    this.path = path;
    this.carts = this.readFileInit(path) || this.writeFileInit(path);
  }

  createCart = async () => {
    const cart = new Cart(this.findMaxId() + 1)
    this.carts.push(cart);
    await this.writeFile(this.carts);
    return cart
  };

  getCartById = async (id) => {
    this.carts = await this.readFile();
    
    let cartFinded = this.carts.find((c) => c.id == id);
    if (cartFinded === undefined) {
      throw new Error("Carrito no existente en la lista");
    } else {
      return cartFinded;
    }
  }

  addProductToCart = async (productId, cartId) => {
    let cartFinded = await this.getCartById(cartId)  
    
    let itemFinded = cartFinded.items.find((i) => i.productId == productId);
    if (itemFinded) {
      itemFinded.quantity++
    } else {
      cartFinded.items.push(new CartItem(productId, 1))
    }
    await this.writeFile(this.carts)
  }

  findMaxId = () => {
    let maxValue = 0;
    for (let i = 0; i < this.carts.length; i++) {
      if (this.carts[i].id > maxValue) maxValue = this.carts[i].id;
    }
    return maxValue;
  };

  readFileInit = () => {
    let contenido = undefined;

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
      let text = fs.writeFileSync(this.path, JSON.stringify(contenido));
      //contenido = JSON.parse(text);
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
      throw new Error('Error de lectuta');
    }
  };
}

//module.exports = CartsManager;
export {CartsManager};