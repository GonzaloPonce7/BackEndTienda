import { CartRepository } from "../repository/cartRepository.js";
import { cartModel } from "../dao/models/CartModel.js";
import { ProductRepository } from "../repository/productsRepository.js";
import { TicketRepository } from "../repository/ticketRepository.js";
import { v4 as uuidv4 } from "uuid";
import { Mail } from "../services/mail.js";

//TODO: incorporar Mail al finalizar el ticket
// Redirect a /ticket/:tid

export class CartController {
  constructor() {
    this.cartRepository = new CartRepository();
    this.productRepository = new ProductRepository();
    this.ticketRepository = new TicketRepository();
  }

  getAll = async (req, res) => {
    const carts = await this.cartRepository.getAll();
    res.status(200).json(carts);
  };

  getById = async (req, res) => {
    const cart = await this.cartRepository.getById(req.session.user.cartId);
    console.log(cart);
    console.log(req.session.user.cartId);
    res.status(200).json(cart);
  };

  createCart = async (req, res) => {
    const cart = await this.cartRepository.create(req.body);
    res.status(200).json(cart);
  };

  checkAndConfirm = async (req, res) => {
    // verificar stock, confirmar productos en stock, dejar en carrito los que no hay en stock y redireccionar a /:cid/purchase

    const user = req.session.user;
    if(!user) res.send("No existe el usuario")
    const cart = await this.cartRepository.getById(user.cartId);
    let productsCheked = [];

    if (!cart || cart.products.length == 0) {
      res.send("El carrito no existe o esta vacio");
    }

    for (const p of cart.products) {
      const productInStock = await this.productRepository.getById(p.productId);
      if (p.quantity < productInStock.stock) {
        // restarlo en stock de base de datos, copiar a finalCart
        productInStock.stock -= p.quantity;
        await this.productRepository.update(productInStock);
        productsCheked.push({
          productId: p.productId,
          title: productInStock.title,
          quantity: p.quantity,
          subtotal: p.quantity * productInStock.price,
        });
      }
    }

    productsCheked.forEach((e) => {
      const i = cart.products.findIndex((p) => p.productId == e.productId);
      if (i >= 0) {
        let result = cart.products.splice(i, 1);
      } 
    });
    await this.cartRepository.update(cart);

    let date = new Date(Date.now());

    let code = uuidv4();

    let total = 0
    productsCheked.forEach(p => total += p.subtotal)

    const ticket = { user: user.email , date, products: productsCheked, code, total };

    const result = await this.ticketRepository.create(ticket);

    res.status(200).send({tid: result._id})//.redirect(`/ticket/${result._id}`);
  };

  deleteProductInCart = async (req, res) => {
    //Eliminar el producto buscado en el carrito buscado
    const cid = req.params.cid;
    const pid = req.params.pid;
    const deletedProduct = await this.cartRepository.deleteProductInCart(
      cid,
      pid
    );
    res.status(200).json(deletedProduct);
  };

  deleteAllProducts = async (req, res) => {
    const cid = req.session.user.cartId;
    await this.cartRepository.deleteAllProducts(cid);
    res.status(200).send("Carrito vaciado");
  };

  addProductToCart = async (req, res) => {
    const cid = req.session.user.cartId;
    const pid = req.body.pid;
    const quantity = req.body.quantity;
    const productVerified = await this.productRepository.getById(pid);
    let response;
    if (productVerified) {
      response = await this.cartRepository.addProduct(cid, pid, quantity);
      if (response.modifiedCount >= 1) {
        res.status(200).send("Carrito actualizado");
      } else {
        res.status(400).send("No se pudo actualizar el carrito");
      }
    } else {
      res.status(400).send("Producto no existente");
    }
  };

  modifyQuantity = async (req, res) => {
    //Actualizar la quantity del producto buscado
    const cid = req.session.user.cartId;
    const pid = req.body.product._id;
    const newQuantity = req.body.quantity;
    await this.cartRepository.modifyQuantity(cid, pid, newQuantity);
    res.status(200).send("Modificado correctamente");
  };
}
