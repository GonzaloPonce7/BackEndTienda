import express from 'express'
import { productsManager } from '../test.js';
//const {productsManager} = require("../test");


const router = express.Router()

router.get('/', async (req, res) => {
    let products = await productsManager.getProducts()

    res.render('home', {products})
})

router.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts')
})

export {router as viewsRouter }