import { Router } from "express";
import { cartModel } from "../dao/models/carts.model.js";
import { productModel } from "../dao/models/products.model.js";
import { getId } from "../utils/idGenerator.js";

const cartRoutes = Router();

cartRoutes.get('/', async (req, res) => {
    const { limit } = req.query || 100;
    try {
        let cart = await cartModel.find().limit(limit);
        res.status(200).send({ result: "Consulta exitosa", cart: cart })
    } catch (error) {
        console.log("Error en la consulta: " + error)
        res.status(500).send({ result: "Error en la consulta", err: error })
    }
})

cartRoutes.get('/:cid', async (req, res) => {
    const cID = req.params.cid;
    try {
        let cart = await cartModel.findById(cID).populate('products.prod')
        res.status(200).send({ result: "Consulta exitosa", cart: cart })
    } catch (error) {
        console.log("No se pudo obtener el cart: " + error);
        res.status(500).send({ result: "Error en la consulta", err: error })
    }
})

cartRoutes.post('/:cid/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const cid = req.params.cid;
    try {
        let cart = await cartModel.findById(cid);
        const index = cart.products.findIndex(item => item.prod == pid)
        if (index === -1) {
            const prod = await productModel.findById(pid);
            cart.products.push({ prod: prod, qty: 1 });
            cart = await cart.save();
        } else {
            cart.products[index].qty += 1;
            cart.save()
        }
        res.status(200).send({ result: "Carga exitosa", cart: cart })
    } catch (error) {
        console.log("No se pudo actualizar los datos: " + error)
        res.status(500).send({ err: error, msg: "No se pudo actualizar el producto" })
    }
})

cartRoutes.put('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const newProducts = req.body;
    console.log(newProducts);
    try {
        let cart = await cartModel.findById(cid);
        if (cart && newProducts.length >= 1) {
            cart.products.push(...newProducts);
            cart.save()
        }
        console.log(cart)
        res.status(200).send({ result: "Carga exitosa", cart: cart })
    } catch (error) {
        console.log("No se pudo actualizar los datos: " + error)
        res.status(500).send({ err: error, msg: "No se pudo actualizar el producto" })
    }
})
cartRoutes.put('/:cid/products/:pid', async (req, res) => {
    const cID = req.params.cid;
    const pID = req.params.pid;
    const qty = req.body.qty;
    console.log({ cID, pID, qty })
    try {
        const cart = await cartModel.findById(cID);
        const index = cart.products.findIndex(product => product.prod == pID);
        if (cart && index !== -1) {
            cart.products[index].qty = qty;
            await cart.save();
        }
        res.status(200).send({ msg: "Cantidad actualizada", cart: cart })
    } catch (err) {
        res.status(500).send({ msg: "No se puedo actualizar la cantidad", err: err })
    }
})
cartRoutes.delete('/:cid/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const cid = req.params.cid;
    try {
        const newCart = await cartModel.findById(cid);
        const index = newCart.products.findIndex(item => item.prod == pid);
        console.log(index)
        if (index !== -1) {
            newCart.products.splice(index, 1);
            await newCart.save();
            res.status(200).send({ result: "Eliminacion de producto exitosa", cart: newCart })
        } else {
            console.log("Nada que eliminar")
            res.status(200).send({ result: "Nada para eliminar", cart: newCart })
        }
    } catch (error) {
        console.log("No se pudo actualizar los datos: " + error)
        res.send({ err: error, msg: "No se pudo actualizar el cart" })
    }
})
cartRoutes.delete('/:cid', async (req, res) => {
    const cid = req.params.cid;
    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            cart.products = [];
            await cart.save();
        }
        console.log("Se eliminaron todos los productos del cart", cart)
        res.status(200).send({ result: "Carrito vaciado", cart: cart })
    } catch (error) {
        console.log("No se pudo eliminar los datos del cart: " + error)
        res.status(500).send({ err: error, msg: "No se pudieron eliminar los productos" })
    }
})



// PARA AGREGAR UN PRODUCTO AL CARRITO
/* cartRoutes.post('/:cid', async (req, res) => {

    try {
        let cart = await cartModel.findById("6602299b09946c13c483eb39");
        const prod = await productModel.findById("65f8e440af05a92236e9944e");
        cart.products.push({ prod: prod, qty: 2 });
        cart = await cart.save();
        const list = await cart.populate("products")
        console.log(JSON.stringify(cart, null, '\t'))
        res.send({ result: cart, msg: "Carga exitosa" })
    } catch (error) {
        console.log("No se pudo crear el carrito: " + error)
        res.send({ error: "ERROR", msg: "No se pudo cargar el carrito" })
    }
}) */


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