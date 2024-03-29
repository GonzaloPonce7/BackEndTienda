import __dirname from './utils.js';
import  express  from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import {viewsRouter} from './routes/views.router.js';
import {router as productsRoute } from './routes/productsRoutes.js';
import {router as cartsRoute} from './routes/cartsRoutes.js';
import { sessionRouter } from './routes/sessionsRoutes.js';
import { testRouter } from './routes/testRoutes.js';
import { chatRouter } from './routes/chatRoutes.js';
import { MessagesRepository } from './repository/messageRepository.js';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { initPassport } from './middleware/passportConfig.js';
import compression from 'express-compression'
import { addLogger } from './logger/index.js';
import { sessionsUpdater } from './middleware/updateLastSession.js';
import config from './config/config.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import cors from 'cors';


const app = express();
const httpServer =  app.listen(config.port, () => {addLogger.info(`Listening on port ${config.port}`)});
const io = new Server(httpServer)


app.use(session({
  store: MongoStore.create({
    mongoUrl: config.mongoURI,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    dbName: config.mongoDbName,
    collectionName: "sessions",
    ttl: 20
  }),
  secret: 'user',
  resave: true,
  saveUninitialized: true
}))

const swaggerOptions = {
  definition: {
      openapi: '3.0.1',
      info: {
          title: "Documentacion test para api birra",
          description: ""
      }
  },
  apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)
app.use('/swagger', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

initPassport()
app.use(passport.initialize())
app.use(passport.session())
app.use(sessionsUpdater)

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression())


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.set("io", io);


app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use(express.static(__dirname + '/public'))
app.use('/', viewsRouter)
app.use('/api/products', productsRoute)
app.use('/api/carts', cartsRoute)
app.use('/sessions', sessionRouter)
app.use('/api/test', testRouter)
app.use("/api/chat", chatRouter)

io.on('connection', async socket => {
  addLogger.info(`New client connected id: ${socket.id}`)
  
  const messageService = new MessagesRepository() 

  let products = await productsManager.getProducts()
  
  io.sockets.emit('products', products)

  socket.on("message", async data => {
    await messageService.create(data)
    let messages = await messageService.get()
    socketServer.emit("logs", messages)
    })
  
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
      addLogger.error(error.message);
    }
  })
})

mongoose.set('strictQuery', false)
try {
  await mongoose.connect(config.mongoURI,{dbName:config.mongoDbName})
  
} catch (error) {
  addLogger.error(error);
}
const db = mongoose.connection;
db.once('open', () => addLogger.info("confritas la db"))