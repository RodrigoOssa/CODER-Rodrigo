import { Router } from "express";
import { productos, socketServer } from "../app.js";
const routes = Router();

routes.get('/', (req, res) => {
    res.render('layouts/main')
})

routes.get('/home', async (req, res) => {
    let products = await productos.getThings();
    res.render('templates/home', { productos: products })
})

routes.get('/realtimeproducts', async (req, res) => {
    let products = await productos.getThings();
    res.render('templates/realTimeProducts', { productos: products });
})

routes.post('/realtimeproducts', async (req, res) => {
    let newProduct = req.body;
    productos.addThings(newProduct) ?
        socketServer.emit('nuevoProducto', await productos.getThings()) :
        null

    res.status(200).send({ status: "OK" })
})

routes.delete('/realtimeproducts/:pid', async (req, res) => {
    const pid = req.params.pid;
    console.log(pid)
    productos.deleteThings(pid) ?
        socketServer.emit('deleteProducto', await productos.getThings()) :
        null

    res.status(200).send({ status: "OK" })
})




export default routes;