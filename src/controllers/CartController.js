import { CartRepository } from "../repository/cartRepository.js";
import { cartModel } from "../dao/models/CartModel.js";
import { ProductRepository } from "../repository/productsRepository.js";
import { TicketRepository } from "../repository/ticketRepository.js";
import { v4 as uuidv4 } from "uuid";

export class CartController {
  constructor() {
    this.cartRepository = new CartRepository()
    this.productRepository = new ProductRepository()
    this.ticketRepository = new TicketRepository()
  }

  getAll = async (req, res) => {
    const carts = await this.cartRepository.getAll();
    res.status(200).json(carts);
  };

  createCart = async (req, res) => {
    const cart = await this.cartRepository.createCart(req.body);
    res.status(200).json(cart);
  };

  checkAndConfirm = async (req, res) => {
    // verificar stock, confirmar productos en stock, dejar en carrito los que no hay en stock y redireccionar a /:cid/purchase
    
    const user = req.session.user
    //Traer de la base el carrito del user (id)
    const initCart = await this.cartRepository.getById(user.cartId)
    if(!initCart || initCart.products.length == 0 ) {
      res.send("El carrito no existe o esta vacio")
    }
    const finalCart = new cartModel()
    initCart.products.forEach(async p => {
      const productInStock = await this.productRepository.getById(p.productId)
      if (p.quantity < productInStock.quantity) {
        // restarlo en stock de base de datos, copiar a finalCart
        productInStock.quantity -= p.quantity
        await this.productRepository.updateProducts(productInStock)
        finalCart.products.push(p)
      } 
    })
    //Recorrer finalCart, comparar con initCart e ir borrando los que se pushearon a finalCart
    finalCart.forEach(e => {
    const i = initCart.products.findIndex(p => p._id == e._id)
    if( i >= 0 ) initCart.splice(i, 1)
    })
    await this.cartRepository.update(initCart)

    let date = new Date(Date.now())

    let code = uuidv4()

    let amount = finalCart.products.length 

    const ticket = { user, date, finalCart, code, amount }

    await this.ticketRepository.create(ticket)

    res.status(200).json(ticket);

    //TODO: render de vista ticket
  }

  deleteProductInCart = async (req, res) => {
    //Eliminar el producto buscado en el carrito buscado
    const cid = req.params.cid;
    const pid = req.params.pid;
    const deletedProduct = await this.cartRepository.deleteProductInCart(cid, pid);
    res.status(200).json(deletedProduct);
  };

  deleteAllProducts = async (req, res) => {
    //Eliminar todos los productos del carrito
    const cid = req.params.cid;
    await this.cartRepository.deleteAllProducts(cid);
    res.status(200).send("Carrito vaciado");
  };

  updateProducts = async (req, res) => {
    //Actualizar el carrito con un arreglo de productos
    const cid = req.params.cid;
    const newProducts = req.body.products;
    await this.cartRepository.updateProducts(cid, newProducts);
    res.status(200).send("Carrito actualizado");
  };

  modifyQuantity = async (req, res) => {
    //Actualizar la quantity del producto buscado
    const cid = req.params.cid;
    const pid = req.params.pid;
    const newQuantity = req.body.quantity;
    await this.cartRepository.modifyQuantity(cid, pid, newQuantity);
    res.status(200).send("Modificado correctamente");
  };
}