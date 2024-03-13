import express from 'express';
import { messagesModel } from "../dao/models/messages.model.js";
import { io } from '../index.js';
const viewsRouter = express.Router();

viewsRouter.get("/", (req, res) => {

    res.status(200).render("layouts/index", { info: "Pagina principal" })
})

viewsRouter.post('/db', async (req, res) => {
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
viewsRouter.get('/db', async (req, res) => {
    try {
        let message = await messagesModel.find();
        res.send({ status: "success", payload: message })
    }
    catch (err) {
        console.log(err)
    }
})

export default viewsRouter;