// Para el carrito, el cual tendrá su router en /api/carts/, configurar dos rutas:

// La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
// Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
// products: Array que contendrá objetos que representen cada producto
// La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
// La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
// product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
// quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
// Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto.
// La persistencia de la información se implementará utilizando el file system, donde los archivos “productos.json” y “carrito.json”, respaldan la información.
// No es necesario realizar ninguna implementación visual, todo el flujo se puede realizar por Postman o por el cliente de tu preferencia.

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