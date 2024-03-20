import { Router } from "express";
import { messagesModel } from "../dao/models/messages.model.js";
import { productModel } from "../dao/models/products.model.js";
import { socketServer } from "../app.js";
const viewsRoute = Router();

viewsRoute.get('/', (req, res) => {
    res.render('layouts/main')
})

/* viewsRoute.get('/home', async (req, res) => {
    let products = await productModel.find();
    console.log(products);
    res.render('templates/home', { productos: products })
}) */


viewsRoute.get('/realtimeproducts', async (req, res) => {
    let products = await productModel.find()
        .then(data => socketServer.emit('listaProductos', data))

    res.render('templates/realTimeProducts', { productos: products });
})

viewsRoute.post('/realtimeproducts', async (req, res) => {
    let newProduct = req.body;
    productos.addThings(newProduct) ?
        socketServer.emit('nuevoProducto', await productModel.find()) :
        null

    res.status(200).send({ status: "OK" })
})

viewsRoute.delete('/realtimeproducts/:pid', async (req, res) => {
    const pid = req.params.pid;
    console.log(pid)
    productos.deleteThings(pid) ?
        socketServer.emit('deleteProducto', await productModel.find()) :
        null

    res.status(200).send({ status: "OK" })
})

viewsRoute.post('/db', async (req, res) => {
    let datos = req.body
    let user = "Martin@algo.com";
    let msg = "Hola"
    console.log(datos)
    console.log(user)
    let result = await messagesModel.create({
        user,
        msg
    })
    res.send({ status: "success", payload: result })
})
viewsRoute.get('/db', async (req, res) => {
    try {
        let message = await messagesModel.find();
        res.send({ status: "success", payload: message })
    }
    catch (err) {
        console.log(err)
    }
})


export default viewsRoute;