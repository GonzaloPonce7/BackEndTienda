import  express  from "express";
import { CartController } from "../controllers/CartController.js";
import { validateRoles } from "../middleware/validateUsers.js";


const router = express.Router();
const cartController = new CartController()


router.get('/', validateRoles(['admin', 'user']), cartController.getById)

router.post('/purchase', validateRoles(['admin', 'user']), cartController.checkAndConfirm)

router.delete('/:cid/products/:pid',validateRoles(['admin', 'user']), cartController.deleteProductInCart)

router.delete('/', validateRoles(['admin', 'user']), cartController.deleteAllProducts)

router.post('/', validateRoles(['admin', 'user']), cartController.addProductToCart)

router.put('/:cid/products/:pid', validateRoles(['admin', 'user']), cartController.modifyQuantity)


export {router}