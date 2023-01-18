import  express  from "express";
import {cartsManager, productsManager} from '../test.js'
import { CartDao } from "../dao/CartDao.js";
//const express = require("express");
//const {cartsManager, productsManager}  = require("../test");


const router = express.Router();


router.get("/", async (req, res) => {
  const carts = await CartDao.getAll();
  res.status(200).json(carts)
});

router.post('/', async (req, res) => {
  const cart = await CartDao.createCart(req.body);
  res.status(200).json(cart)
})

router.delete('/:cid/products/:pid', async (req, res) => {
  //Eliminar el producto buscado en el carrito buscado
  const cid = req.params.cid;
  const pid = req.params.pid;
  const deletedProduct = await CartDao.deleteProductInCart(cid,pid)
  res.status(200).json(deletedProduct)
})

router.delete('/:cid', async (req, res) => {
  //Eliminar todos los productos del carrito
  const cid = req.params.cid;
  await CartDao.deleteAllProducts(cid)
  res.status(200).send('Carrito vaciado')
})

router.put('/:cid', async (req, res) => {
  //Actualizar el carrito con un arreglo de productos
  const cid = req.params.cid;
  const newProducts = req.body.products;
  await CartDao.updateProducts(cid, newProducts)
  res.status(200).send('Carrito actualizado')
})

router.put('/:cid/products/:pid', async (req, res) => {
  //Actualizar la quantity del producto buscado
  const cid = req.params.cid;
  const pid = req.params.pid;
  const newQuantity = req.body.quantity;
  await CartDao.modifyQuantity(cid, pid, newQuantity)
  res.status(200).send('Modificado correctamente');
})

// router.get("/:cid", async (req, res) => {
//   const cid = req.params.cid;
//   try {
//     const cart = await cartsManager.getCartById(cid);
//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(404).send({ status: "error", error: error.message });
//   }
// });

// router.post("/", async (req, res) => {
//   try {
//     const newCart = await cartsManager.createCart()
//     res.status(200).send(`Se creo un carrito con el id: ${newCart.id}`)
//   } catch (error) {
//     res.status(404).send({ status: "error", error: " Error interno: No se pudo crear el carrito" });
//   }
// });

// router.post("/:cid/product/:pid", async (req, res) => {
//   const cid = req.params.cid;
//   const pid = req.params.pid;
//   try {
//     await productsManager.getProductById(pid)
//     console.log("paso productbyid");
//     await cartsManager.addProductToCart(pid,cid)
//     res.status(200).send(`Se agrego erl producto con el id: ${pid} en el carrtio con el id: ${cid}`)
//   } catch (error) {
//     res.status(404).send({ status: "error", error: "No se pudo agregar el producto " + error.message});
//   }
// });

//module.exports = router;
export {router}