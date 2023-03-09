import  express  from "express";
import { CartController } from "../controllers/CartController.js";
import { validateRoles } from "../middleware/validateUsers.js";


const router = express.Router();
const cartController = new CartController()

router.get("/",validateRoles(['ADMIN']), cartController.getAll)

router.post('/', validateRoles(['ADMIN', 'CLIENT']), cartController.createCart)

router.post('/:cid/purchase', validateRoles(['ADMIN', 'CLIENT']), cartController.checkAndConfirm)

router.delete('/:cid/products/:pid',validateRoles(['ADMIN', 'CLIENT']), cartController.deleteProductInCart)

router.delete('/:cid', validateRoles(['ADMIN', 'CLIENT']), cartController.deleteAllProducts)

router.put('/:cid', validateRoles(['ADMIN', 'CLIENT']), cartController.updateProducts)

router.put('/:cid/products/:pid', validateRoles(['ADMIN', 'CLIENT']), cartController.modifyQuantity)


export {router}