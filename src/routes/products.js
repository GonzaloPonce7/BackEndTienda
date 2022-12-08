// Para el manejo de productos, el cual tendrá su router en /api/products/ , configurar las siguientes rutas:
// La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior
// La ruta GET /:pid deberá traer sólo el producto con el id proporcionado

// La ruta raíz POST / deberá agregar un nuevo producto con los campos:
// id: Number/String (A tu elección, el id NO se manda desde body, se autogenera como lo hemos visto desde los primeros entregables, asegurando que NUNCA se repetirán los ids en el archivo.
// title:String,
// description:String
// code:String
// price:Number
// status:Boolean
// stock:Number
// category:String
// thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto
// Status es true por defecto.
// Todos los campos son obligatorios, a excepción de thumbnails

// La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
// La ruta DELETE /:pid deberá eliminar el producto con el pid indicado.

const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const productsManager = require('../test')

//Esta es la ruta raiz de /api/products
router.get("/", async (req, res) => {
  let limit = req.query.limit;
  let products = await productsManager.getProducts();
  if (limit) {
    if (!isNaN(limit) && limit >= 1 && limit <= products.length) {
      res.status(200).send({ products: products.slice(0, limit) });
    } else {
      res.status(400).send({ status: "error", error: "Valores incorrectos" });
    }
  } else {
    res.status(200).send({ products: products });
  }
});

router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  let product
  try {
    product = await productsManager.getProductById(pid)

    res.status(200).send({product: product});
  } catch (error) {
    res.status(400).send({status: "error", error: error.message})
  }
});

//routes.post()


module.exports = router;