import { Router } from "express";

const routes = Router();

routes.get('/', (req, res) => {
    res.render('layouts/inicio');
})

export default routes;