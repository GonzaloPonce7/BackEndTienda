import express from 'express'
import { productModel } from '../dao/models/ProductModel.js'
import { cartModel } from '../dao/models/CartModel.js'
import { CartDao } from '../dao/CartDao.js'
import { ProductDao } from '../dao/ProductDao.js'
import passport from 'passport'



const router = express.Router()

router.get('/', async (req, res) => {
    console.log("entro a raiz");
    let limit = req.query.limit;
    let page = req.query.page;
    let sort = req.query.sort;

    let filter = {};

    if (req.query.title) filter.title = req.query.title;
    if (req.query.description) filter.description = req.query.description;
    if (req.query.price) filter.price = req.query.price;
    if (req.query.stock) filter.stock = req.query.stock;
    if (req.query.code) filter.code = req.query.code;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.category) filter.category = req.query.category;

    const result = await ProductDao.getFiltered(filter, page, limit, sort)

    result.prevLink = result.hasPrevPage ? `/products?page=${result.prevPage}` : ''
    result.nextLink = result.hasNextPage ? `/products?page=${result.nextPage}` : ''
    result.isValid = !(page <= 0 || page>result.totalPages)

    res.render('home',  {result})
})

router.get('/cart/:cid', async (req, res) => {
    //Visualizar un carrito especifico por id, donde se debe listar los productos en el carrito seleccionado.
    let cid = req.body.cid || req.params.cid

    const cartFinded = await CartDao.getById(cid)

    res.render('cart', {cartFinded})
})

// Vista de login
router.get('/login', async (req, res) => {
    res.render('sessions/login', {})
})

// Vista para registrar usuarios
router.get('/register', async (req, res) => {
    res.render('sessions/register', {})
})

//Vista para fail log
router.get('/faillogin', (req, res) => {
    res.json({error: 'Failed login'}).render('sessions/faillogin')
})

//Vista par el fail register
router.get('/failregister', async(req, res) => {
    console.error('Failed Stragtregy');
    res.send({error: 'Failed'}).render('/sessions/failregister')
})

router.get(
    '/login_google',
    passport.authenticate('google', {scope: ['email', 'profile']}),
    async (req, res) => {
        res.render('sessions/login', {})
    }
)

router.get(
    '/login_github',
    passport.authenticate('github', {scope: ['user:email']}),
    async (req, res) => {
        res.render('sessions/login', {})
    }
)

// router.get('/', async (req, res) => {
//     let products = await productsManager.getProducts()

//     res.render('home', {products})
// })

// router.get('/realtimeproducts', async (req, res) => {
//     res.render('realTimeProducts')
// })

export {router as viewsRouter }