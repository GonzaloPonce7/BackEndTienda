import { Router } from "express";
import { ProductController } from "../controllers/ProductController.js";
import { validateRoles } from "../middleware/validateUsers.js";


const router = Router();
const productController = new ProductController()


router.get("/", validateRoles(['admin']), productController.getFiltered)

router.get("/:pid",validateRoles(['admin']), productController.getById)

router.delete("/:pid", validateRoles(['admin']),productController.deleteById)

router.post("/", validateRoles(['admin']),productController.create)

export { router };