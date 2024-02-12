import { Router } from "express";
import ThingsManager from "../src/ThingsManager.js";

const productsRouter = Router();
const productManager = new ThingsManager('./data/products.json')
/* 
modelo del producto
{
    id: autogenerado,
    title: "",
    description: "",
    code: "",
    price: number,
    status: bool, => true defecto
    stock: number,
    category: "",
    thumbnails:[]   => no obligatorio
}
*/
productsRouter.get('/api/products', async (req, res) => {
    try {
        const { limit } = req.query;
        const getProducts = await productManager.getThings();
        const products = limit ?
            getProducts.slice(0, parseInt(limit, 10)) :
            getProducts;
        if (products) {
            return res.status(200).send(products)
        } else {
            return res.status(400).send({ err: "ERROR", msg: "Hubo un error en la request" })
        }
    } catch (err) {
        console.log(err)
    }

})
productsRouter.get('/api/products/:pid', async (req, res) => {
    try {
        const pId = req.params.pid;
        const product = await productManager.getThingsById(pId)
        if (product) {
            return res.status(200).send(product)
        } else {
            return res.status(400).send({ err: "ERROR", msg: "Hubo un error en la request" })
        }
    } catch (err) {
        console.log(err)
    }
})
productsRouter.post('/api/products', async (req, res) => {
    try {
        const newProduct = req.body;
        const addProduct = await productManager.addThings(newProduct);
        if (addProduct) {
            return res.status(200).send({ status: "OK", msg: "Producto agregado con éxito" })
        } else {
            return res.status(400).send({ status: "ERROR", msg: "Producto ya existente o con campos vacíos" })
        }
    } catch (err) {
        console.log(err)
    }
})
productsRouter.put('/api/products/:pid', async (req, res) => {
    try {
        const pId = req.params.pid;
        const newData = req.body;
        if (await productManager.updateThings(pId, newData)) {
            return res.status(200).send(await productManager.getThingsById(pId))
        } else {
            return res.status(400).send({ status: "ERROR", msg: "Hubo un error al momento de modificar el recurso" })
        }

    } catch (err) {
        console.log(err)
    }
})
productsRouter.delete('/api/products/:pid', async (req, res) => {
    try {
        const pId = req.params.pid;
        if (await productManager.deleteThings(pId)) {
            return res.status(200).send({ status: "OK", msg: "Recurso eliminado" })
        } else {
            return res.status(400).send({ status: "ERROR", msg: "Recurso no encontrado" })
        }
    } catch (err) {
        console.log(err)
    }
})

export { productManager };
export default productsRouter;
