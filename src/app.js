const express = require('express');
const app = express();
const port = 8080;
//Rutes
const productsRoute = require('./routes/products')
const cartsRoute = require('./routes/carts')

app.use(express.json())

app.use('/api/products', productsRoute)
app.use('/api/carts', cartsRoute)

app.get('/api', (res, req) => {
  res.send('Estoy en app')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});