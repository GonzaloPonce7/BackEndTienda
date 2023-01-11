import __dirname from './utils.js';
import  express  from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import {viewsRouter} from './routes/views.router.js'
import {router as productsRoute } from './routes/productsRoutes.js';
import {router as cartsRoute} from './routes/cartsRoutes.js';
import { productsManager } from './test.js';
import mongoose from 'mongoose'

//const express = require('express');
//const productsRoute = require('./routes/products')
//const cartsRoute = require('./routes/carts')
//const {productsManager} = require("../test");

//kBK8iqHim9BTWlDU

const app = express();
const port = 8080;
const httpServer =  app.listen(port, () => {console.log(`Listening on port ${port}`)});
const io = new Server(httpServer)


app.engine('handlebars', handlebars.engine())

app.set('views engine', 'handlebars')
app.set('views', __dirname + '/views')
app.set("io", io);

app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use('/', viewsRouter)
app.use('/api/products', productsRoute)
app.use('/api/carts', cartsRoute)

io.on('connection', async socket => {
  console.log(`New client connected id: ${socket.id}`)
  
  let products = await productsManager.getProducts()
  
  io.sockets.emit('products', products)
  
  socket.on('addProduct', async (product) => {
    try {
      await productsManager.addProduct(product)

      io.sockets.emit("products", await productManager.getProducts());
    } catch (error) {
      console.log(error.message);
    }
  })
  
  socket.on('deleteProduct', async (id) => {
    try {
      await productsManager.deleteProduct(id)
      
      io.sockets.emit("products", await productManager.getProducts());
    } catch (error) {
      console.log(error.message);
    }
  })
})

const MONGO_URL = 'mongodb+srv://esencia:kBK8iqHim9BTWlDU@cluster0.vfdmkug.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', false)
try {
  await mongoose.connect(MONGO_URL,{dbName:'ecommerce'})
  
} catch (error) {
  console.log(error);
}
const db = mongoose.connection;
db.on('error', console.error.bind(console, "conection error: "))
db.once('open', () => console.log("confritas la db"))