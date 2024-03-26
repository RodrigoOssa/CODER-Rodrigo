import { Router } from "express";
import { cartModel } from "../dao/models/carts.model.js";
import { productModel } from "../dao/models/products.model.js";
import { getId } from "../utils/idGenerator.js";
const cartRoutes = Router();

cartRoutes.get('/', async (req, res) => {
    const { limit } = req.query || 100;
    try {
        let cart = await cartModel.find().limit(limit);
        console.log(cart)
        res.send({ result: "Mostrando carritos", cart: cart })
    } catch (error) {
        console.log("No se pudo obtener el cart: " + error)
    }
})
cartRoutes.get('/:cid', async (req, res) => {
    const cID = req.params.cid;
    try {
        let cart = await cartModel.find({ _id: cID }).populate('products')

        console.log(JSON.stringify(cart, null, '\t'))
        res.send({ result: "Completado lista de productos", products: cart })
    } catch (error) {
        console.log("No se pudo obtener el cart: " + error);
        res.send({ error: error, msg: "No se pudo traer la lista de productos" })
    }
})

/* cartRoutes.post('/', async (req, res) => {
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
}) */



/* cartRoutes.post('/', async (req, res) => {

    try {
        let result = await cartModel.create({
            id: getId()
        })
        res.send({ result: result, msg: "Carga exitosa" })
    } catch (error) {
        console.log("No se pudo crear el carrito: " + error)
        res.send({ error: "ERROR", msg: "No se pudo cargar el carrito" })
    }
}) */
cartRoutes.post('/', async (req, res) => {

    try {
        let result = await cartModel.find({ _id: "6602216e43e886004503f186" });
        console.log(result)
        result.products = { products: "65f8e0c96d2fe42dd8b7a30b" };
        let todo = await cartModel.updateOne({ _id: "6602216e43e886004503f186" }, result)
        console.log(todo)
        res.send({ result: todo, msg: "Carga exitosa" })
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
            res.send({ result: result, msg: "Carga exitosa", cart: newCart })
        } else {
            res.send({ err: "Error", msg: "Hubieron campos vacíos." })
        }
    } catch (error) {
        console.log("No se pudo actualizar los datos: " + error)
        res.send({ err: error, msg: "No se pudo actualizar el producto" })
    }
})
cartRoutes.put('/:cid/products/:pid', async (req, res) => {
    const cID = req.params.cid;
    const pID = req.params.pid;
    const qty = req.body.qty;
    console.log({ cID, pID, qty })
    try {
        console.log("Hola")
        const cart = await cartModel.findById(cID);
        const index = cart.products.findIndex(product => product.id === pID);
        cart.products[index].qty = qty;
        await cart.save();
        console.log({ qty, cart, index })
        res.send({ msg: "Cantidad actualizada", cart: cart })
    } catch (err) {
        res.send({ msg: "No se puedo actualizar la cantidad", err: err })
    }
})
cartRoutes.delete('/:cid/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const cid = req.params.cid;
    try {
        const newCart = (await cartModel.findById(cid));
        const index = newCart.products.indexOf(pid);
        newCart.products.splice(index, 1);
        await newCart.save();
        console.log("Eliminación del producto exitosa", newCart)
        res.send({ result: "Eliminacion de producto exitosa", cart: newCart })
    } catch (error) {
        console.log("No se pudo actualizar los datos: " + error)
        res.send({ err: error, msg: "No se pudo actualizar el producto" })
    }
})
cartRoutes.delete('/:cid', async (req, res) => {
    const cid = req.params.cid;
    try {
        const newCart = (await cartModel.findById(cid));
        newCart.products = [];
        await newCart.save();
        console.log("Se eliminaron todos los productos del cart", newCart)
        res.send({ result: "Carrito vaciado", cart: newCart })
    } catch (error) {
        console.log("No se pudo eliminar los datos del cart: " + error)
        res.send({ err: error, msg: "No se pudieron eliminar los productos" })
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