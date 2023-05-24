import { Router } from "express";
import { UsersController } from "../controllers/UsersController.js";
import { validateRoles } from "../middleware/validateUsers.js";


const router = Router();
const usersController = new UsersController()


//PREMIUM USER
router.get('/users_admin',validateRoles(['admin']), usersController.getAll())

router.post('/users_admin/:uid', validateRoles(['admin']), usersController.updateRole())

router.delete('/users_admin', validateRoles(['admin']), usersController.deleteteOldUsers())