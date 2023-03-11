import { Router } from "express";
import { ProductController } from "../controllers/ProductController.js";
import { validateRoles } from "../middleware/validateUsers.js";

const router = Router();
const productController = new ProductController()

//TODO: darle funcionalidad al buscador de productos de home

router.get("/", productController.getFiltered)

router.get("/:pid", productController.getById)

router.delete("/:pid", validateRoles(['ADMIN']),productController.deleteById)

router.post("/", validateRoles(['ADMIN']),productController.create)

export { router };