import { Router } from "express";
import { messagesModel } from "../dao/models/messages.model.js";
import { productModel } from "../dao/models/products.model.js";
import { socketServer } from "../app.js";
import productRoutes from "./products.routes.js";
const viewsRoute = Router();

viewsRoute.get('/', (req, res) => {
    res.render('layouts/main')
})

viewsRoute.get('/home', async (req, res) => {
    try {
        let products = await productModel.find().lean();
        res.render('templates/home', { productos: products })
    } catch (err) {
        res.render('templates/home', { productos: [] })
    }
})


viewsRoute.get('/realtimeproducts', async (req, res) => {
    console.log("Llamada a realtime")
    try {
        res.render('templates/realTimeProducts', []);
    } catch (err) {

    }
})

viewsRoute.post('/realtimeproducts', async (req, res) => {
    console.log("TEST")
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

viewsRoute.get('/root/:name', (req, res) => {
    const user = req.params.name;
    if (!req.session.counter) {
        console.log("me ejecute")
        req.session.counter = [];
    }
    const newUser = req.session.counter.some(item => item.name === user);
    if (!newUser) {
        req.session.counter.push({ name: user, count: 1 })
        return res.send(`Bienvenido ${user}`)
    } else {
        const newList = req.session.counter.map(item => {
            if (item.name === user) {
                item.count++
            }
            return item
        })
        req.session.counter = newList;
        res.send(` ${user} ha visitado ${req.session.counter.find(item => item.name === user).count} veces el sitio`)
    }
})

export default viewsRoute;