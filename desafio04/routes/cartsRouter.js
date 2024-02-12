import { Router } from "express";
import { productManager } from "./productsRouter.js";
import ThingsManager from "../src/ThingsManager.js";

const cartRouter = Router();
const cartManager = new ThingsManager('./data/cart.json');
/* 
Modelo de cart
{
    id:"" => autogenerado o no
    products:[] => array de los productos
}
*/
cartRouter.get('/api/cart', async (req, res) => {
    try {
        const { limit } = req.query;
        const getProducts = await cartManager.getThings();
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
cartRouter.get('/api/cart/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await cartManager.getThingsById(cid)
        if (cart) {
            return res.status(200).send(cart.products)
        } else {
            return res.status(400).send({ err: "ERROR", msg: "Hubo un error en la request" })
        }
    } catch (err) {
        console.log(err)
    }
})
cartRouter.post('/api/cart', async (req, res) => {
    try {
        const newProduct = req.body;
        const addProduct = await cartManager.addThings(newProduct);
        if (addProduct) {
            return res.status(200).send({ status: "OK", msg: "Producto agregado con éxito" })
        } else {
            return res.status(400).send({ status: "ERROR", msg: "Producto ya existente o con campos vacíos" })
        }
    } catch (err) {
        console.log(err)
    }
})
cartRouter.post('/api/cart/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const product = await productManager.getThingsById(pid)
        let newProduct = await cartManager.getThingsById(cid);
        if (product) {
            let repetido = newProduct.products.find(item => item.id === pid);
            if (repetido) {
                let productIndex = newProduct.products.findIndex(item => item.id === pid)
                newProduct.products[productIndex].quantity++;
            } else {
                newProduct.products.push({ id: pid, quantity: product.stock });
            }
            const addProduct = await cartManager.updateThings(cid, newProduct);
            if (addProduct) {
                return res.status(200).send({ status: "OK", msg: "Producto agregado con éxito" })
            } else {
                return res.status(400).send({ status: "ERROR", msg: "No se pudo agregar los productos" })
            }
        } else {
            return res.status(400).send({ status: "ERROR", msg: "El id del producto ingresado no existe" })
        }
    } catch (err) {
        console.log(err)
    }
})

export default cartRouter;