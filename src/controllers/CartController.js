import { CartRepository } from "../repository/cartRepository.js";

export class CartController {
  constructor() {
    this.cartRepository = new CartRepository()
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
    console.log(user);
    const ticket = { user, date, cart, code, amount }
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