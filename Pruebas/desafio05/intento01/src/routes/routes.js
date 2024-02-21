import { Router } from "express";

const routes = Router();

routes.get('/', (req, res) => {

    let usrData = {
        usrName: "Alguien llamado Lautaro",
        info: "Algo mas"
    }
    res.render("index", usrData)

    console.log("Esto se ejecuta")
    /* try {
        res.render('index');
        res.status(200)
    } catch (error) {
        console.log(error)
    } */
})

export default routes;