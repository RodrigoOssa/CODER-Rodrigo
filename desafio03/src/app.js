import express from 'express';
import ProductManager from './ProductManager.js';

const productManager = new ProductManager('./products.json');

const app = express();

app.get('/products', async (req, res) => {
    const { offset } = req.query;
    let products = await productManager.getProducts();
    if (offset && parseInt(offset, 10)) {
        return res.send(products.slice(0, parseInt(offset, 10)))
    } else {
        return res.send(products)
    }
})
app.get('/products/:pid', async (req, res) => {
    const pId = req.params.pid;
    const product = await productManager.getProductById(pId);
    if (product) {
        return res.send(product)
    } else {
        return res.send({ "err": "Se ha ingresado mal el ID o producto inexistente" })
    }
})

app.listen(8080, () => console.log("Servidor on puerto 8080"))