const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const {cartsManager, productsManager}  = require("../test");


router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await cartsManager.getCartById(cid);
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCart = await cartsManager.createCart()
    res.status(200).send(`Se creo un carrito con el id: ${newCart.id}`)
  } catch (error) {
    res.status(404).send({ status: "error", error: " Error interno: No se pudo crear el carrito" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  try {
    await productsManager.getProductById(pid)
    console.log("paso productbyid");
    await cartsManager.addProductToCart(pid,cid)
    res.status(200).send(`Se agrego erl producto con el id: ${pid} en el carrtio con el id: ${cid}`)
  } catch (error) {
    res.status(404).send({ status: "error", error: "No se pudo agregar el producto " + error.message});
  }
});

module.exports = router;