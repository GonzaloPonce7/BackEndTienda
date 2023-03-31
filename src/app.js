import __dirname from './utils.js';
import  express  from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import {viewsRouter} from './routes/views.router.js';
import {router as productsRoute } from './routes/productsRoutes.js';
import {router as cartsRoute} from './routes/cartsRoutes.js';
import { sessionRouter } from './routes/sessionsRoutes.js';
import { testRouter } from './routes/testRoutes.js';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import path from "path";
import { initPassport } from './middleware/passportConfig.js';
import {generateToken, authToken} from './utils.js';
import compression from 'express-compression'
import { addLogger } from './logger/index.js';



const app = express();
const port = 8080;
const httpServer =  app.listen(port, () => {addLogger.info(`Listening on port ${port}`)});
const io = new Server(httpServer)
const MONGO_URL = 'mongodb+srv://esencia:kBK8iqHim9BTWlDU@cluster0.vfdmkug.mongodb.net/?retryWrites=true&w=majority'


app.use(session({
  store: MongoStore.create({
    mongoUrl: MONGO_URL,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    dbName: 'ecommerce',
    collectionName: "sessions",
    ttl: 20
  }),
  secret: 'user',
  resave: false,
  saveUninitialized: true
}))

initPassport()
app.use(passport.initialize())
app.use(passport.session())

//app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression())


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
//app.set("views", path.join(process.cwd() + "/src/views"));
app.set('view engine', 'handlebars')
app.set("io", io);


app.use(express.static(__dirname + '/public'))
app.use('/', viewsRouter)
app.use('/api/products', productsRoute)
app.use('/api/carts', cartsRoute)
app.use('/sessions', sessionRouter)
app.use('/api/test', testRouter)

io.on('connection', async socket => {
  console.log(`New client connected id: ${socket.id}`)
  
  let products = await productsManager.getProducts()
  
  io.sockets.emit('products', products)
  
  socket.on('addProduct', async (product) => {
    try {
      await productsManager.addProduct(product)

      io.sockets.emit("products", await productManager.getProducts());
    } catch (error) {
      addLogger.warning(error.message);
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

mongoose.set('strictQuery', false)
try {
  await mongoose.connect(MONGO_URL,{dbName:'ecommerce'})
  
} catch (error) {
  addLogger.warning(error);
}
const db = mongoose.connection;
db.on('error', addLogger.warning(console, "conection error: "))
db.once('open', () => addLogger.info("confritas la db"))