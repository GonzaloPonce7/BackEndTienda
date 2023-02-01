import express from "express";
import { ProductDao } from "../dao/ProductDao.js";
// import { productsManager } from '../test.js';
// import { Product } from '../dao/Product.js';
//const express = require("express");
//const {productsManager} = require("../test");
//const Product = require("../models/Product");

const router = express.Router();


//TODO: darle funcionalidad al buscador de productos de home

router.get("/", async (req, res) => {
  let page = req.query.page || req.query.page;
  let limit = req.query.limit || req.body.limit;
  let sort = req.query.sort || req.body.sort;

  let filter = {};

  if (req.query.title) filter.title = req.query.title;
  if (req.query.description) filter.description = req.query.description;
  if (req.query.price) filter.price = req.query.price;
  if (req.query.stock) filter.stock = req.query.stock;
  if (req.query.code) filter.code = req.query.code;
  if (req.query.status) filter.status = req.query.status;
  if (req.query.category) filter.category = req.query.category;

  const products = await ProductDao.getFiltered(filter, page, limit, sort)
  res.status(200).json(products);
});

router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const product = await ProductDao.getById(pid);
  res.status(200).json(product);
});

router.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;
  await ProductDao.deleteById(pid);
  res.status(200).send('Producto borrado');
});

router.post("/", async (req, res) => {
  const product = await ProductDao.post(req.body);
  res.status(200).json(product);
});

// //Esta es la ruta raiz de /api/products
// router.get("/", async (req, res) => {
//   let limit = req.query.limit;
//   let products = await productsManager.getProducts();
//   if (limit) {
//     if (!isNaN(limit) && limit >= 1 && limit <= products.length) {
//       res.status(200).send({ products: products.slice(0, limit) });
//     } else {
//       res.status(400).send({ status: "error", error: "Valores incorrectos" });
//     }
//   } else {
//     res.status(200).send({ products: products });
//   }
// });

// router.get("/:pid", async (req, res) => {
//   const pid = req.params.pid;
//   let product;
//   try {
//     product = await productsManager.getProductById(pid);

//     res.status(200).send({ product: product });
//   } catch (error) {
//     res.status(404).send({ status: "error", error: error.message });
//   }
// });

// router.post("/", async (req, res) => {
//   const product = req.body;

//   if (validateProduct(product)) {
//     try {
//       await productsManager.addProduct(
//         new Product(
//           product.title,
//           product.description,
//           product.price,
//           product.thumbnail,
//           product.stock,
//           product.code,
//           product.status,
//           product.category
//         )
//       );
//       res.status(200).send({ product: product });
//     } catch (error) {
//       res.status(400).send({ status: "error", error: error.message });
//     }
//   } else {
//     res.status(400).send({
//       status: "error",
//       error: "Uno o mas de los campos no existe o es erroneo",
//       });
//   }

//   req.app
//   .get("io")
//   .sockets.emit("products", await productManager.getProducts());
// });

// router.put('/:pid', async (req , res) => {
// 	const pid = req.params.pid;
// 	const product = req.body;

// 	let productValid = validateProductUpdate(product)
// 	try {
// 		productsManager.updateProduct(pid, productValid)
// 		res.status(200).send({product: productValid})
// 	} catch (error) {
// 		res.status(400).send({ status: "error", error: error.message });
// 	}
// })

// router.delete('/:pid', async(req, res) => {
// 	const pid = req.params.pid;

// 	try {
// 		productsManager.deleteProduct(pid)
// 		res.status(200).send('Producto borrado')
// 	} catch (error) {
// 		res.status(400).send({ status: "error", error: error.message });
// 	}
// })

// function validateProductUpdate(productJson) {
// 	let title, description, price, thumbnail, stock, code, status, category
// 	if (typeof productJson.title == "string") {
// 		title = productJson.title;
// 	}
// 	if (typeof productJson.description == "string") {
// 		description = productJson.description;
// 	}
// 	if (typeof product.price == "number") {
// 		price = productJson.price;
// 	}
// 	if (typeof product.thumbnail == "string") {
// 		thumbnail = productJson.thumbnail;
// 	}
// 	if (typeof product.stock == "number") {
// 		stock = productJson.stock;
// 	}
// 	if (typeof product.code == "string") {
// 		code = productJson.code;
// 	}
// 	if (typeof product.status == "boolean") {
// 		status = productJson.status;
// 	}
// 	if (typeof product.category == "string") {
// 		category = productJson.category;
// 	}
// 	return new Product(title, description, price, thumbnail, stock, code, status, category)
// }

// function validateProduct(product) {
//   if (
//     typeof product.title == "string" &&
//     typeof product.description == "string" &&
//     typeof product.code == "string" &&
//     typeof product.price == "number" &&
//     typeof product.status == "boolean" &&
//     typeof product.stock == "number" &&
//     typeof product.category == "string"
//   ) {
//     return true;
//   }
//   return false;
// }

//module.exports = router;
export { router };
