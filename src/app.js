/*TODO: El servidor debe contar con los siguientes endpoints:
ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
Si no se recibe query de límite, se devolverán todos los productos
Si se recibe un límite, sólo devolver el número de productos solicitados.
Ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos. */


const ProductManager = require('../ProductManager')
const {manager} = require('../test')
const express = require('express');
const app = express();
const port = 7000;

app.get("/products", async (req, res) => {

  let limit = req.query.limit;
  let products = await manager.getProducts()
  if(limit){
    if(!isNaN(limit) && limit >= 1 && limit <= products.length) {
      res.status(200).send({products: products.slice(0, limit)});
    }else{
      res.status(400).send({status: "error", error: "Valores incorrectos"})
    }
  }else{
    res.status(200).send({products: products});
  }

});

app.get("/products/:pid", async (req, res) => {
  const pid = req.params.pid;
  let product
  try {
    product = await manager.getProductById(pid)

    res.status(200).send({product: product});
  } catch (error) {
    res.status(400).send({status: "error", error: error.message})
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});