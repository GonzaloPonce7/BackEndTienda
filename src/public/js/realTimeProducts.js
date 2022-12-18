const socket = io();

const addProductForm = document.getElementById("addForm");
const listProducts = document.getElementById("listaProductos");
const deleteProductForm = document.getElementById("deleteForm");

function listarProductos(productJson) {
    const products = productJson.map((product) => `
        <tr>
            <td> ${product.title} </td>
            <td> ${product.description} </td>
            <td> ${product.price} </td>
            <td> <img height="72px" width="72px" src=${product.thumbnail} /> </td>
        </tr>
    `
    )
    .join(" ");

    listProducts.innerHTML = products;
}


socket.on('products', (products) => {
    listarProductos(products)
})

addProductForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(addProductForm)

    const product = {}

    for(const field of formData.entries()){
        product[field[0]] = field[1]
    }

    // Enviamos producto con fetch
    // const response =  await fetch('/api/products',{
    //     body: JSON.stringify(product),
    //     method: 'POST',
    //     headers:{
    //         'Content-Type': 'application/json'
    //     }
    // })

    //Enviamos producto con socket
    socket.emit('addProduct', product)
})

deleteForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(deleteProductForm)
    console.log(formData);

    socket.emit('deleteProduct', formData)

})