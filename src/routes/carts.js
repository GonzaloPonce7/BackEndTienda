// Para el carrito, el cual tendrá su router en /api/carts/, configurar dos rutas:

// La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
// Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
// products: Array que contendrá objetos que representen cada producto
// La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
// La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
// product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
// quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
// Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto. 
// La persistencia de la información se implementará utilizando el file system, donde los archivos “productos,json” y “carrito.json”, respaldan la información.
// No es necesario realizar ninguna implementación visual, todo el flujo se puede realizar por Postman o por el cliente de tu preferencia.

const express = require('express');
const router = express.Router();
const {manager} = require('../test')


router.get("/", (req, res) => {
    res.send("GIL CARRITO")
});


module.exports = router