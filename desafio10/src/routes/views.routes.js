import { Router } from "express";
import { messagesModel } from "../dao/models/messages.model.js";
import { productModel } from "../dao/models/products.model.js";
import { socketServer } from "../app.js";
import productRoutes from "./products.routes.js";
import { userModel } from "../dao/models/user.model.js";
import passport from "passport";
const viewsRoute = Router();

const auth = async (req, res, next) => {
    if (req.session.user_name === "adminCoder" && req.session.password === "adminCod3r123") {
        return next();
    }
    try {
        const dataUser = await userModel.findOne({ user_name: req.session.user_name });
        if (dataUser && dataUser.user_name === req.session.user_name && dataUser.password === req.session.password) {
            return next();
        } else {
            res.status(401).redirect('/login');
        }
    } catch (err) {
        return res.status(400).send({ status: "Error", msg: "Error al consultar la base de datos" })
    }
}

viewsRoute.get('/', auth, (req, res) => { //Volver a poner el auth, lo saco porque si no con github no entra
    const userData = {
        first_name: req.session.first_name,
        last_name: req.session.last_name,
        user_name: req.session.user_name,
        email: req.session.email,
        age: req.session.age,
        rol: req.session.rol
    }
    res.render('layouts/main', { userData })
})

viewsRoute.get('/home', auth, async (req, res) => {//Volver a poner el auth, lo saco porque si no con github no entra
    let isAdmin = false;
    if (req.session.rol === "admin") isAdmin = true;
    console.log(isAdmin)
    try {
        let products = await productModel.find().lean();
        res.render('templates/home', { productos: products, isAdmin })
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

viewsRoute.get('/register', (req, res) => {
    res.status(200).render('templates/register');
})

viewsRoute.get('/alreadyregister', (req, res) => {
    res.status(200).render('templates/alreadyregister');
})
viewsRoute.get('/accountcreate', (req, res) => {
    res.status(200).render('templates/accountcreate');
})

viewsRoute.get('/accountDoestExist', (req, res) => {
    res.status(200).render('templates/accountDoestExist');
})

viewsRoute.get('/login', (req, res) => {
    res.status(200).render('templates/login')
})

viewsRoute.get('/reset-password', (req, res) => {
    res.status(200).render('templates/resetPassword')
})

viewsRoute.get('/github', passport.authenticate('github', { scope: ['user:user'] }), async (req, res) => { })

export default viewsRoute;