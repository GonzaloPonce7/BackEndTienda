import express from 'express'
import { productModel } from '../dao/models/ProductModel.js'
import { cartModel } from '../dao/models/CartModel.js'
import { CartDao } from '../dao/CartDao.js'
import { ProductDao } from '../dao/ProductDao.js'


const router = express.Router()

// Crear una vista en el router de views ‘/products’ para visualizar todos los productos con su respectiva paginación. Cada producto mostrado puede resolverse de dos formas:
// Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc. Además de un botón para agregar al carrito.
// Contar con el botón de “agregar al carrito” directamente, sin necesidad de abrir una página adicional con los detalles del producto.

// Además, agregar una vista en ‘/carts/:cid (cartId) para visualizar un carrito específico, donde se deberán listar SOLO los productos que pertenezcan a dicho carrito. 


router.get('/', async (req, res) => {
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

// router.get('/', async (req, res) => {
//     let products = await productsManager.getProducts()

//     res.render('home', {products})
// })

// router.get('/realtimeproducts', async (req, res) => {
//     res.render('realTimeProducts')
// })

export {router as viewsRouter }