import { Router } from "express";
import { cartModel } from "../dao/models/carts.model.js";
import { productModel } from "../dao/models/products.model.js";
import { getId } from "../utils/idGenerator.js";
const cartRoutes = Router();

cartRoutes.get('/', async (req, res) => {
    const { limit } = req.query || 100;
    try {
        let products = await cartModel.find().limit(limit);
        res.send({ result: "Success, payload:products", products: products })
    } catch (error) {
        console.log("No se pudo obtener el cart: " + error)
    }
})
cartRoutes.get('/:cid', async (req, res) => {
    const cid = req.params.cid;
    let products = [];
    try {
        let cart = await cartModel.find({ id: cid })
            .then(data => data[0].products.map(item => item.id))
        products = await productModel.find({ id: cart })

        console.log(cart)
        console.log(products)
        res.send({ result: "Completado lista de productos", products: products })
    } catch (error) {
        console.log("No se pudo obtener el cart: " + error);
        res.send({ error: error, msg: "No se pudo traer la lista de productos" })
    }
})

cartRoutes.post('/', async (req, res) => {
    const { products } = req.body;
    console.log(products)
    try {
        let result = await cartModel.create({
            id: getId(),
            products: products
        })
        res.send({ result: result, msg: "Carga exitosa" })
    } catch (error) {
        console.log("No se pudo crear el carrito: " + error)
        res.send({ error: "ERROR", msg: "No se pudo cargar el carrito" })
    }
})
cartRoutes.post('/:cid/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const cid = req.params.cid;
    let newCart = (await cartModel.find({ id: cid })).map(item => item);
    newCart[0].products.some(item => item.id === pid) ?
        newCart[0].products.find(item => item.id === pid).qty += 1 :
        newCart[0].products.push({ id: pid, qty: 1 })
    console.log(newCart);
    try {
        let result = await cartModel.updateOne({ id: cid }, { products: newCart[0].products })
        res.send({ result: result, msg: "Carga exitosa", cart: newCart })
    } catch (error) {
        console.log("No se pudo actualizar los datos: " + error)
        res.send({ err: error, msg: "No se pudo actualizar el producto" })
    }
})
cartRoutes.put('/:cid', async (req, res) => {
    const newCart = req.body;
    const cid = req.params.cid;
    newCart.id = cid;
    try {
        if (newCart.products) {
            let result = await cartModel.updateOne({ id: cid }, newCart)
            res.send({ result: result, msg: "Carga exitosa", prodcts: newCart })
        } else {
            res.send({ err: "Error", msg: "Hubieron campos vacíos." })
        }
    } catch (error) {
        console.log("No se pudo actualizar los datos: " + error)
        res.send({ err: error, msg: "No se pudo actualizar el producto" })
    }
})
cartRoutes.delete('/:pid', async (req, res) => {
    const pid = req.params.pid;
    try {
        let result = await cartModel.deleteOne({ id: pid })
        res.send({ result: result, msg: "Eliminacion de producto exitosa" })
    } catch (error) {
        console.log("No se pudo eliminar el datos: " + error)
        res.send({ err: error, msg: "No se pudo eliminar el producto" })
    }
})

/* cartRoutes.get('/realtimeproducts', async (req, res) => {
    let products = await productos.getThings();
    res.render('templates/realTimeProducts', { productos: products });
})

cartRoutes.post('/realtimeproducts', async (req, res) => {
    let newProduct = req.body;
    productos.addThings(newProduct) ?
        socketServer.emit('nuevoProducto', await productos.getThings()) :
        null

    res.status(200).send({ status: "OK" })
})

cartRoutes.delete('/realtimeproducts/:pid', async (req, res) => {
    const pid = req.params.pid;
    console.log(pid)
    productos.deleteThings(pid) ?
        socketServer.emit('deleteProducto', await productos.getThings()) :
        null

    res.status(200).send({ status: "OK" })
}) */

export default cartRoutes;